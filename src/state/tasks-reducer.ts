import {v1} from "uuid";

import {AddTodolistActionType, GetTodolistType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses, TaskType, TodolistsApi} from "../api/Todolists-api";
import {Dispatch} from "redux";



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
    status: TaskStatuses
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
            return {...state, [action.todoListID]: state[action.todoListID].map(el => el.id === action.taskId ? {...el, status:action.status}: el)}
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
export const ChangeTaskStatusAC =( taskId: string, status:TaskStatuses,todoListID: string ): ChangeTaskStatusActionType =>{
    return {type: "CHANGE-TASK-STATUS", taskId, todoListID, status}
}
export const ChangeTaskTitleAC =( taskId: string, newValue: string, todoListID: string ): ChangeTaskTitleActionType =>{
    return {type: "CHANGE-TASK-TITLE", taskId, newValue, todoListID}
}
export const GetTaskAC =(todoListId: string,tasks: TaskType[]): GetTaskType =>{
    return {type:"GET-TASKS", tasks: tasks, todoListId: todoListId}
}
