
import {TodolistsApi, TodolistType} from "../../../api/Todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, SetAppErrorAC, SetAppStatusAC} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";


const initialState:Array<TodolistDomainType> = [

]
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType):TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
           return state.filter(el => el.id !== action.id);
        case "ADD-TODOLIST":
            return [...state, {...action.todolist, filter: 'all', entityStatus: "idle"}];
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.id ? {...el, title: action.title}: el);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter}: el);
        case 'GET-TODOLISTS':
            return action.todolists.map(el => ({...el, filter: 'all', entityStatus: "idle"}))
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(el => el.id === action.id ? {...el, entityStatus: action.status}: el)
        default :
            return state
    }
}
//actions
export const RemoveTodolistAC =(todolistId: string) =>({type: "REMOVE-TODOLIST", id: todolistId}) as const
export const AddTodolistAC =(todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist }) as const
export const ChangeTodolistAC =(id: string, title: string) => ({type: "CHANGE-TODOLIST-TITLE", id, title}) as const
export const ChangeTodolistFilterAC =(id: string, filter: FilterValuesType) =>({type:"CHANGE-TODOLIST-FILTER", id, filter}) as const
export const GetTodolistsAC =(todolists:TodolistType[])  => ({type:"GET-TODOLISTS", todolists}) as const
export const ChangeTodolistEntityStatusAC = (id: string, status:RequestStatusType) => ({type:'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const)
//thunks
export const deleteTodolistTC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    dispatch(ChangeTodolistEntityStatusAC(todoListID,'loading'))
    TodolistsApi.deleteTodolist(todoListID)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(RemoveTodolistAC(todoListID))
                dispatch(SetAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error)=>{
        handleServerNetworkError(error, dispatch)
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    TodolistsApi.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                let todolist = res.data.data.item
                dispatch(AddTodolistAC(todolist))
                dispatch(SetAppStatusAC('succeeded'))
                dispatch(SetAppErrorAC(null))
            } else {
                debugger
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error)=>{
        handleServerNetworkError(error, dispatch)
    })

}
export const changeTodolistTitleTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    TodolistsApi.updateTodolistTitle(todoListID, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(ChangeTodolistAC(todoListID, title))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error)=>{
        handleServerNetworkError(error, dispatch)
    })
}
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    TodolistsApi.getTodolists()
        .then((res) => {
            dispatch(GetTodolistsAC(res.data))
            dispatch(SetAppStatusAC('succeeded'))
        }).catch((error)=>{
        handleServerNetworkError(error, dispatch)
    })
}
//types
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type GetTodolistType =  ReturnType<typeof GetTodolistsAC>
export type RemoveTodolistActionType =ReturnType<typeof RemoveTodolistAC>
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof ChangeTodolistAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | GetTodolistType
    | ReturnType<typeof ChangeTodolistEntityStatusAC>
