import {v1} from "uuid";

import {AddTodolistActionType, GetTodolistType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses, TaskType, TodolistsApi} from "../api/Todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";



export type RemoveTaskActionType ={
    type:"REMOVE-TASK"
    todolistID: string
    taskID: string
}
export type AddTaskActionType ={
    type:"ADD-TASK"
    title:  string
    todolistID: string
}
export type ChangeTaskStatusActionType ={
    type:"CHANGE-TASK-STATUS"
    taskId: string,
    domainModel: UpdateModeltype
    todoListID: string
}
export type ChangeTaskTitleActionType ={
    type:'CHANGE-TASK-TITLE'
    taskId: string
    newValue: string
    todoListID: string
}
export type GetTaskType = {
    type: "GET-TASKS"
    todoListId: string
    tasks: TaskType[]
}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType | AddTodolistActionType
    | RemoveTodolistActionType | GetTodolistType | GetTaskType
 const initialState: TaskStateType ={

 }

 export const fetchTaskTC: any = (todolistId: string)=>{
    return (dispatch: Dispatch) =>{
        TodolistsApi.getTasks(todolistId)
            .then((res)=>{
                const tasks = res.data.items
                dispatch(GetTaskAC(todolistId, tasks))
            })
    }
 }
export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType):TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskID)}
        case "ADD-TASK":
            return {...state, [action.todolistID]: [{id:v1(),title: action.title, description:'', addedDate: "", todoListId: action.todolistID, completed: true, order: 0, startDate:"", priority:TaskPriorities.Low, deadline:"", status: TaskStatuses.New }, ...state[action.todolistID]]}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.todoListID]: state[action.todoListID].map(el => el.id === action.taskId ? {...el, ...action.domainModel}: el)}
        case "CHANGE-TASK-TITLE":
            return {...state, [action.todoListID]: state[action.todoListID].map(el => el.id === action.taskId ? {...el, title:action.newValue}: el)}
        case "ADD-TODOLIST":
            state[action.todolistID] = []
            return {...state}
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete  stateCopy[action.id]
            return stateCopy
        }
        case 'GET-TODOLISTS':
            const stateCopy = {...state}
            action.todolists.map(el => {stateCopy[el.id] = []})
            return stateCopy
        case "GET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = action.tasks
            return stateCopy
        }
        default:
            return state;
    }
}
export const removeTaskAC =(todolistID: string, taskID: string): RemoveTaskActionType =>{
    return {type: "REMOVE-TASK", todolistID, taskID}
}
export const addTaskAC =(title: string, todolistID: string): AddTaskActionType =>{
    return {type: "ADD-TASK", title, todolistID}
}
export const ChangeTaskStatusAC =( taskId: string, domainModel: UpdateModeltype,todoListID: string ): ChangeTaskStatusActionType =>{
    return {type: "CHANGE-TASK-STATUS", taskId, todoListID, domainModel}
}
export const ChangeTaskTitleAC =( taskId: string, newValue: string, todoListID: string ): ChangeTaskTitleActionType =>{
    return {type: "CHANGE-TASK-TITLE", taskId, newValue, todoListID}
}
export const GetTaskAC =(todoListId: string,tasks: TaskType[]): GetTaskType =>{
    return {type:"GET-TASKS", tasks: tasks, todoListId: todoListId}
}
export const removeTaskTC: any = (taskId: string, todoListID: string) =>{
    return (dispatch: Dispatch) =>{
        TodolistsApi.deleteTask(todoListID, taskId )
            .then((res)=>{
                dispatch(removeTaskAC(todoListID , taskId))
            })
    }
}
export const addTasksTC: any = (title: string, todoListID: string) =>{
    return (dispatch: Dispatch) =>{
        TodolistsApi.createTask(todoListID, title )
            .then((res)=>{
                dispatch(addTaskAC(title, todoListID))
            })
    }
}


export type UpdateModeltype = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTaskTC: any = (taskId: string, domainModel: UpdateModeltype, todoListID: string) =>{
    return (dispatch: Dispatch, getState: ()=> AppRootState) =>{
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
            status:task.status,
            ...domainModel
        }
        TodolistsApi.updateTask(todoListID, taskId, apiModel )
            .then((res)=>{
                dispatch(ChangeTaskStatusAC(taskId, apiModel, todoListID))
            })
    }
}