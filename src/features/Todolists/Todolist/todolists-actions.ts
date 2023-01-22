import {createAsyncThunk} from "@reduxjs/toolkit";
import {SetAppErrorAC, SetAppStatusAC} from "../../../app/app-reducer";
import {TodolistsApi} from "../../../api/Todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {ChangeTodolistEntityStatusAC} from "./todolists-reducer";

export const fetchTodolists = createAsyncThunk('todolists/fetchTodolists', async (param, {
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
export const removeTodolist = createAsyncThunk('todolists/deleteTodolist', async (todoListID: string, {
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
export const addTodolist = createAsyncThunk('todolists/addTodolist', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(SetAppStatusAC({status: 'loading'}))
    const res = await TodolistsApi.createTodolist(title)
    try {
        if (res.data.resultCode === 0) {
            let todolist = res.data.data.item
            dispatch(SetAppStatusAC({status: 'succeeded'}))
            dispatch(SetAppErrorAC({error: null}))
            return {todolist: todolist}
        } else {
            debugger
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const changeTodolistTitle = createAsyncThunk('todolists/changeTodolistTitle', async (param: { todoListID: string, title: string }, {
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