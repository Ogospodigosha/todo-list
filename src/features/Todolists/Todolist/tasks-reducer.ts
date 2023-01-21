import {
    addTodolistTC,
    deleteTodolistTC, fetchTodolistsTC,

} from "./todolists-reducer";
import {TaskStateType} from "../../../app/AppWithRedux";
import {TaskStatuses, TodolistsApi} from "../../../api/Todolists-api";
import {AppRootState} from "../../../app/store";
import { SetAppStatusAC} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const fetchTaskTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, {
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
export const addTasksTC = createAsyncThunk('tasks/addTasks', async (param: { title: string, todoListID: string }, {
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

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todoListID: string }, {
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
export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, domainModel: UpdateModeltype, todoListID: string }, {
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
const initialState: TaskStateType = {}
const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(addTodolistTC.fulfilled, (state, action)=>{
            state[action.payload.todolist.id] = []
        });
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action)=>{
            action.payload.todolists.forEach(el => {
                            state[el.id] = []
                        })
        });
        builder.addCase(deleteTodolistTC.fulfilled, (state, action)=>{
            delete state[action.payload.todolistId]
        });
        builder.addCase(fetchTaskTC.fulfilled, (state, action)=>{
           state[action.payload.todoListId] = action.payload.tasks
        });
        builder.addCase(addTasksTC.fulfilled, (state, action)=>{
            if (action.payload) {
                state[action.payload.todolistID].unshift(action.payload.task)
            }
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action)=>{
            const index = state[action.payload.todolistID].findIndex(el => el.id === action.payload.taskID)
            if (index > -1) {
                state[action.payload.todolistID].splice(index, 1)
            }
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action)=>{
            if (action.payload) {
                const index = state[action.payload.todoListID].findIndex(el => el.id === action.payload?.taskId)
                if (index > -1) {
                    state[action.payload.todoListID][index] = {...state[action.payload.todoListID][index], ...action.payload.domainModel}
                }
            }
        });
    }

})

export const tasksReducer = slice.reducer

export type UpdateModeltype = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: number
    startDate?: string
    deadline?: string
}

