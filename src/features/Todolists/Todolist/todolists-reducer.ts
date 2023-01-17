
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
