import { v1 } from "uuid";
import { TaskStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType, todoListID_1, todoListID_2} from "./todolists-reducer";
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
    isDoneValue: boolean,
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
            return {...state, [action.todolistID]: [{id:v1(),title: action.title, isDone: false}, ...state[action.todolistID]]}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.todoListID]: state[action.todoListID].map(el => el.id === action.taskId ? {...el, isDone:action.isDoneValue}: el)}
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
export const ChangeTaskStatusAC =( taskId: string, isDoneValue: boolean,todoListID: string ): ChangeTaskStatusActionType =>{
    return {type: "CHANGE-TASK-STATUS", taskId, todoListID, isDoneValue}
}
export const ChangeTaskTitleAC =( taskId: string, newValue: string, todoListID: string ): ChangeTaskTitleActionType =>{
    return {type: "CHANGE-TASK-TITLE", taskId, newValue, todoListID}
}
