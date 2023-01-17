import {
    AddTodolistAC,
    GetTodolistsAC,
    RemoveTodolistAC,

} from "./todolists-reducer";
import {TaskStateType} from "../../../app/AppWithRedux";
import {TaskStatuses, TaskType, TodolistsApi, TodolistType} from "../../../api/Todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../../app/store";
import { SetAppStatusAC} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TaskStateType = {}
const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC: (state, action: PayloadAction<{ todolistID: string, taskID: string }>) => {
            const index = state[action.payload.todolistID].findIndex(el => el.id === action.payload.taskID)
            if (index > -1) {
                state[action.payload.todolistID].splice(index, 1)
            }
        },
        addTaskAC: (state, action: PayloadAction<{ title: string, todolistID: string, task: TaskType }>) => {
            state[action.payload.todolistID].unshift(action.payload.task)
        },
        changeTaskStatusAC: (state, action: PayloadAction<{ taskId: string, domainModel: UpdateModeltype, todoListID: string }>) => {
            const index = state[action.payload.todoListID].findIndex(el => el.id === action.payload.taskId) // это индекс таски у которой изменили статус
            if (index > -1) {
                state[action.payload.todoListID][index] = {...state[action.payload.todoListID][index], ...action.payload.domainModel}
            }
        },
        getTaskAC: (state, action: PayloadAction<{ todoListId: string, tasks: TaskType[] }>) => {
           state[action.payload.todoListId] = action.payload.tasks
        },

    },
    extraReducers: (builder)=>{
        builder.addCase(AddTodolistAC, (state, action)=>{
            state[action.payload.todolist.id] = []
        });
        builder.addCase(GetTodolistsAC, (state, action)=>{
            action.payload.todolists.forEach(el => {
                            state[el.id] = []
                        })
        });
        builder.addCase(RemoveTodolistAC, (state, action)=>{
            delete state[action.payload.todolistId]
        });
    }

})
export const {removeTaskAC, addTaskAC, changeTaskStatusAC, getTaskAC} = slice.actions
export const tasksReducer = slice.reducer

//thunks
export const updateTaskTC = (taskId: string, domainModel: UpdateModeltype, todoListID: string) =>
    (dispatch: Dispatch, getState: () => AppRootState) => {
        const tasks = getState().tasks
        const currentTasks = tasks[todoListID]
        let task = currentTasks.find(el => el.id === taskId)
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
            ...domainModel
        }
        dispatch(SetAppStatusAC({status: "loading"}))
        TodolistsApi.updateTask(todoListID, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskStatusAC({taskId: taskId, domainModel: apiModel, todoListID}))
                    dispatch(SetAppStatusAC({status: "succeeded"}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch(error => {
            handleServerNetworkError(error, dispatch)
        })
    }
export const addTasksTC = (title: string, todoListID: string) => (dispatch: Dispatch, getState: () => AppRootState) => {
    dispatch(SetAppStatusAC({status: "loading"}))
    TodolistsApi.createTask(todoListID, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                let task = res.data.data.item
                dispatch(addTaskAC({title, todolistID: todoListID, task}))
                dispatch(SetAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}
export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC({status: 'loading'}))
    TodolistsApi.getTasks(todolistId)
        .then((res) => {
            let tasks = res.data.items
            dispatch(getTaskAC({todoListId: todolistId, tasks}))
            dispatch(SetAppStatusAC({status: 'succeeded'}))
        }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
export const removeTaskTC = (taskId: string, todoListID: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC({status: 'loading'}))
    TodolistsApi.deleteTask(todoListID, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC({todolistID: todoListID, taskID: taskId}))
                dispatch(SetAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
//types

export type UpdateModeltype = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: number
    startDate?: string
    deadline?: string
}

