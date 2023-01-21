import {TodolistType} from "../../../api/Todolists-api";
import {RequestStatusType} from "../../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistTC, changeTodolistTitleTC, deleteTodolistTC, fetchTodolistsTC} from "./todolists-actions";


const initialState:Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
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
    },
    extraReducers: builder=>{
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action)=>{
            return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: "idle"}))
        });
        builder.addCase(deleteTodolistTC.fulfilled, (state, action)=>{
            const index = state.findIndex(el=>el.id === action.payload.todolistId)
            if (index > -1){
                state.splice(index, 1)
            }
        });
        builder.addCase(addTodolistTC.fulfilled, (state, action)=>{
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: "idle"})
        });
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action)=>{
            const index = state.findIndex(el=>el.id === action.payload.id)
            if(index > -1) {
                state[index].title = action.payload.title
            }
        });
    }
})
export const { ChangeTodolistFilterAC,  ChangeTodolistEntityStatusAC } = slice.actions
export const todolistsReducer = slice.reducer
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
