import {v1} from "uuid";

import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses} from "../api/Todolists-api";

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
type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType |  ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType
 const initialState: TaskStateType ={

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
