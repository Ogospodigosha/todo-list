
import {TodolistsApi, TodolistType} from "../../../api/Todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, SetAppErrorAC, SetAppStatusAC} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState:Array<TodolistDomainType> = [

]
const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        RemoveTodolistAC: (state,action: PayloadAction<{todolistId: string}>)=>{
            const index = state.findIndex(el=>el.id === action.payload.todolistId)
            if (index > -1){
                state.splice(index, 1)
            }
        },
        AddTodolistAC: (state,action: PayloadAction<{todolist: TodolistType}>)=>{
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: "idle"})
        },
        ChangeTodolistAC: (state,action: PayloadAction<{id: string, title: string}>)=>{
            const index = state.findIndex(el=>el.id === action.payload.id)
            if(index > -1) {
                state[index].title = action.payload.title
            }
        },
        ChangeTodolistFilterAC: (state,action: PayloadAction<{id: string, filter: FilterValuesType}>)=>{
            const index = state.findIndex(el=>el.id === action.payload.id)
            if(index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        ChangeTodolistEntityStatusAC: (state,action: PayloadAction<{id: string, status:RequestStatusType}>)=>{
            const index = state.findIndex(el=>el.id === action.payload.id)
            if(index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },
        GetTodolistsAC: (state,action: PayloadAction<{todolists:TodolistType[]}>)=>{
            return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: "idle"}))
        }
    }
})
export const {RemoveTodolistAC, AddTodolistAC, ChangeTodolistAC, ChangeTodolistFilterAC, GetTodolistsAC, ChangeTodolistEntityStatusAC } = slice.actions
export const todolistsReducer = slice.reducer
// export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType):TodolistDomainType[] => {
//     switch (action.type) {
//         case "REMOVE-TODOLIST":
//            return state.filter(el => el.id !== action.id);
//         case "ADD-TODOLIST":
//             return [...state, {...action.todolist, filter: 'all', entityStatus: "idle"}];
//         case "CHANGE-TODOLIST-TITLE":
//             return state.map(el => el.id === action.id ? {...el, title: action.title}: el);
//         case 'CHANGE-TODOLIST-FILTER':
//             return state.map(el => el.id === action.id ? {...el, filter: action.filter}: el);
//         case 'GET-TODOLISTS':
//             return action.todolists.map(el => ({...el, filter: 'all', entityStatus: "idle"}))
//         case "CHANGE-TODOLIST-ENTITY-STATUS":
//             return state.map(el => el.id === action.id ? {...el, entityStatus: action.status}: el)
//         default :
//             return state
//     }
// }
//actions
// export const RemoveTodolistAC =(todolistId: string) =>({type: "REMOVE-TODOLIST", id: todolistId}) as const
// export const AddTodolistAC =(todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist }) as const
// export const ChangeTodolistAC =(id: string, title: string) => ({type: "CHANGE-TODOLIST-TITLE", id, title}) as const
// export const ChangeTodolistFilterAC =(id: string, filter: FilterValuesType) =>({type:"CHANGE-TODOLIST-FILTER", id, filter}) as const
// export const GetTodolistsAC =(todolists:TodolistType[])  => ({type:"GET-TODOLISTS", todolists}) as const
// export const ChangeTodolistEntityStatusAC = (id: string, status:RequestStatusType) => ({type:'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const)
//thunks
export const deleteTodolistTC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC({status:'loading'}))
    dispatch(ChangeTodolistEntityStatusAC({id: todoListID, status :'loading'}))
    TodolistsApi.deleteTodolist(todoListID)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(RemoveTodolistAC({todolistId: todoListID}))
                dispatch(SetAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error)=>{
        handleServerNetworkError(error, dispatch)
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC({status:'loading'}))
    TodolistsApi.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                let todolist = res.data.data.item
                dispatch(AddTodolistAC({todolist :todolist}))
                dispatch(SetAppStatusAC({status:'succeeded'}))
                dispatch(SetAppErrorAC({error: null}))
            } else {
                debugger
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error)=>{
        handleServerNetworkError(error, dispatch)
    })

}
export const changeTodolistTitleTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC({status:'loading'}))
    TodolistsApi.updateTodolistTitle(todoListID, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(ChangeTodolistAC({id :todoListID, title}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(SetAppStatusAC({status:'succeeded'}))
        }).catch((error)=>{
        handleServerNetworkError(error, dispatch)
    })
}
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC({status:'loading'}))
    TodolistsApi.getTodolists()
        .then((res) => {
            dispatch(GetTodolistsAC({todolists :res.data}))
            dispatch(SetAppStatusAC({status:'succeeded'}))
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
// type ActionsType = RemoveTodolistActionType
//     | AddTodolistActionType
//     | ReturnType<typeof ChangeTodolistAC>
//     | ReturnType<typeof ChangeTodolistFilterAC>
//     | GetTodolistType
//     | ReturnType<typeof ChangeTodolistEntityStatusAC>
