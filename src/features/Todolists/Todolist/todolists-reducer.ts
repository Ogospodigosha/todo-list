
import {TodolistsApi, TodolistType} from "../../../api/Todolists-api";
import {Dispatch} from "redux";


const initialState:Array<TodolistDomainType> = [

]
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType):TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
           return state.filter(el => el.id !== action.id);
        case "ADD-TODOLIST":
            return [...state, {...action.todolist, filter: 'all'}];
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.id ? {...el, title: action.title}: el);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter}: el);
        case 'GET-TODOLISTS':
            return action.todolists.map(el => ({...el, filter: 'all'}))
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
//thunks
export const deleteTodolistTC = (todoListID: string) => (dispatch: Dispatch) => {
    TodolistsApi.deleteTodolist(todoListID)
        .then((res) => {
            dispatch(RemoveTodolistAC(todoListID))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    TodolistsApi.createTodolist(title)
        .then((res) => {
            let todolist = res.data.data.item
            dispatch(AddTodolistAC(todolist))
        })
}
export const changeTodolistTitleTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    TodolistsApi.updateTodolistTitle(todoListID, title)
        .then((res) => {
            dispatch(ChangeTodolistAC(todoListID, title))
        })
}
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    TodolistsApi.getTodolists()
        .then((res) => {
            dispatch(GetTodolistsAC(res.data))
        })
}
//types
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type GetTodolistType =  ReturnType<typeof GetTodolistsAC>
export type RemoveTodolistActionType =ReturnType<typeof RemoveTodolistAC>
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof ChangeTodolistAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | GetTodolistType
