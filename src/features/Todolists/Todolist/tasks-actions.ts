import {createAsyncThunk} from "@reduxjs/toolkit";
import {SetAppStatusAC} from "../../../app/app-reducer";
import {TodolistsApi} from "../../../api/Todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {AppRootState} from "../../../app/store";
import {UpdateModeltype} from "./tasks-reducer";

export const fetchTask = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(SetAppStatusAC({status: 'loading'}))
    const res = await TodolistsApi.getTasks(todolistId)
    debugger
    try {
        let tasks = res.data.items
        dispatch(SetAppStatusAC({status: 'succeeded'}))
        return {todoListId: todolistId, tasks}
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const addTask = createAsyncThunk('tasks/addTasks', async (param: { title: string, todoListID: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(SetAppStatusAC({status: 'loading'}))
    const res = await TodolistsApi.createTask(param.todoListID, param.title)
    try {
        if (res.data.resultCode === 0) {
            let task = res.data.data.item
            dispatch(SetAppStatusAC({status: "succeeded"}))
            return {title: param.title, todolistID: param.todoListID, task}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const removeTask = createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todoListID: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(SetAppStatusAC({status: 'loading'}))
    const res = await TodolistsApi.deleteTask(param.todoListID, param.taskId)
    try {
        if (res.data.resultCode === 0) {
            dispatch(SetAppStatusAC({status: 'succeeded'}))
            return {todolistID: param.todoListID, taskID: param.taskId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const updateTask = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, domainModel: UpdateModeltype, todoListID: string }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const state = getState() as AppRootState
    const tasks = state.tasks
    const currentTasks = tasks[param.todoListID]
    let task = currentTasks.find(el => el.id === param.taskId)
    if (!task) {
        return
    }
    const apiModel: UpdateModeltype = {
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        ...param.domainModel
    }
    dispatch(SetAppStatusAC({status: "loading"}))
    const res = await TodolistsApi.updateTask(param.todoListID, param.taskId, apiModel)
    try {
        if (res.data.resultCode === 0) {
            dispatch(SetAppStatusAC({status: "succeeded"}))
            return {taskId: param.taskId, domainModel: apiModel, todoListID: param.todoListID}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})