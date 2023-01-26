import {TodolistsApi, TodolistType} from "../../api/Todolists-api";
import {RequestStatusType, SetAppError, SetAppStatus} from "../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";



const initialState:Array<TodolistDomainType> = []

 const fetchTodolists = createAsyncThunk('todolists/fetchTodolists', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(SetAppStatus({status: 'loading'}))
    try {
        const res = await TodolistsApi.getTodolists()
        dispatch(SetAppStatus({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})
 const removeTodolist = createAsyncThunk('todolists/deleteTodolist', async (todoListID: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(SetAppStatus({status: 'loading'}))
    dispatch(ChangeTodolistEntityStatus({id: todoListID, status: 'loading'}))
    try {
        const res = await TodolistsApi.deleteTodolist(todoListID)
        if (res.data.resultCode === 0) {
            dispatch(SetAppStatus({status: 'succeeded'}))
            return {todolistId: todoListID}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})
 const addTodolist = createAsyncThunk<{
     todolist: TodolistType
 }, string, {rejectValue: string | null}  >('todolists/addTodolist', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(SetAppStatus({status: 'loading'}))
    try {
        const res = await TodolistsApi.createTodolist(title)
        if (res.data.resultCode === 0) {
            let todolist = res.data.data.item
            console.log(res)
            dispatch(SetAppStatus({status: 'succeeded'}))
            dispatch(SetAppError({error: null}))
            return {todolist: todolist}
        } else {
            handleServerAppError(res.data, dispatch, false)
            return rejectWithValue(res.data.messages[0])
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})
 const changeTodolistTitle = createAsyncThunk('todolists/changeTodolistTitle', async (param: { todoListID: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(SetAppStatus({status: 'loading'}))
    try {
        const res = await TodolistsApi.updateTodolistTitle(param.todoListID, param.title)
        console.log(res)
        if (res.data.resultCode === 0) {
            dispatch(SetAppStatus({status: 'succeeded'}))
            return {id: param.todoListID, title: param.title}
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(SetAppStatus({status: 'succeeded'}))
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
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
        ChangeTodolistFilter: (state, action: PayloadAction<{id: string, filter: FilterValuesType}>)=>{
            const index = state.findIndex(el=>el.id === action.payload.id)
            if(index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        ChangeTodolistEntityStatus: (state, action: PayloadAction<{id: string, status:RequestStatusType}>)=>{
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
export const { ChangeTodolistFilter,  ChangeTodolistEntityStatus } = slice.actions
export const todolistsReducer = slice.reducer
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
