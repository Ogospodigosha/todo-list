import {TodolistsApi, TodolistType} from "../../api/Todolists-api";
import {RequestStatusType, SetAppErrorAC, SetAppStatusAC} from "../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState:Array<TodolistDomainType> = []

 const fetchTodolists = createAsyncThunk('todolists/fetchTodolists', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(SetAppStatusAC({status: 'loading'}))
    const res = await TodolistsApi.getTodolists()
    try {
        dispatch(SetAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
 const removeTodolist = createAsyncThunk('todolists/deleteTodolist', async (todoListID: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(SetAppStatusAC({status: 'loading'}))
    dispatch(ChangeTodolistEntityStatusAC({id: todoListID, status: 'loading'}))
    const res = await TodolistsApi.deleteTodolist(todoListID)
    try {
        if (res.data.resultCode === 0) {
            dispatch(SetAppStatusAC({status: 'succeeded'}))
            return {todolistId: todoListID}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
 const addTodolist = createAsyncThunk('todolists/addTodolist', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(SetAppStatusAC({status: 'loading'}))
    const res = await TodolistsApi.createTodolist(title)
     debugger
    try {
        if (res.data.resultCode === 0) {
            let todolist = res.data.data.item
            dispatch(SetAppStatusAC({status: 'succeeded'}))
            dispatch(SetAppErrorAC({error: null}))
            return {todolist: todolist}
        } else {
            debugger
            handleServerAppError(res.data, dispatch, false)
            return rejectWithValue(res.data.messages[0])
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
 const changeTodolistTitle = createAsyncThunk('todolists/changeTodolistTitle', async (param: { todoListID: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(SetAppStatusAC({status: 'loading'}))
    const res = await TodolistsApi.updateTodolistTitle(param.todoListID, param.title)
    try {
        if (res.data.resultCode === 0) {
            dispatch(SetAppStatusAC({status: 'succeeded'}))
            return {id: param.todoListID, title: param.title}
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(SetAppStatusAC({status: 'succeeded'}))
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const asyncActions = {
    fetchTodolists,
    removeTodolist,
    addTodolist,
    changeTodolistTitle
}

export const slice = createSlice({
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
        builder.addCase(fetchTodolists.fulfilled, (state, action)=>{
            return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: "idle"}))
        });
        builder.addCase(removeTodolist.fulfilled, (state, action)=>{
            const index = state.findIndex(el=>el.id === action.payload.todolistId)
            if (index > -1){
                state.splice(index, 1)
            }
        });
        builder.addCase(addTodolist.fulfilled, (state, action)=>{
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: "idle"})
        });
        builder.addCase(changeTodolistTitle.fulfilled, (state, action)=>{
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
