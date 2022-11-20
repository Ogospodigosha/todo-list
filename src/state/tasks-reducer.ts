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
    task: TaskType
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


export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType):TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskID)}
        case "ADD-TASK":
            return {...state, [action.todolistID]: [action.task,
                    ...state[action.todolistID]]}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.todoListID]: state[action.todoListID].map(el => el.id === action.taskId ? {...el, ...action.domainModel}: el)}
        case "CHANGE-TASK-TITLE":
            return {...state, [action.todoListID]: state[action.todoListID].map(el => el.id === action.taskId ? {...el, title:action.newValue}: el)}
        case "ADD-TODOLIST":

            state[action.todolist.id] = []
            return {...state}
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete  stateCopy[action.id]
            return stateCopy
        }
        case 'GET-TODOLISTS':
            const stateCopy = {...state}
            action.todolists.forEach(el => {stateCopy[el.id] = []})
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
export const addTaskAC =(title: string, todolistID: string, task: TaskType): AddTaskActionType =>{
    return {type: "ADD-TASK", title, todolistID, task}
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
export const removeTaskTC = (taskId: string, todoListID: string) =>{
    return (dispatch: Dispatch) =>{
        TodolistsApi.deleteTask(todoListID, taskId )
            .then((res)=>{
                dispatch(removeTaskAC(todoListID , taskId))
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

export const updateTaskTC= (taskId: string, domainModel: UpdateModeltype, todoListID: string) =>{
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

export const addTasksTC = (title: string, todoListID: string) =>{
    return (dispatch: Dispatch, getState: ()=> AppRootState ) =>{
       let tasks =  getState().tasks[todoListID] ;


        TodolistsApi.createTask(todoListID, title )

            .then((res)=>{

             let task =    res.data.data.item
                console.log(task)

                // const apiModel: UpdateModeltype = {
                //     title: title,
                //     deadline: task.deadline,
                //     description: task.description,
                //     priority: task.priority,
                //     startDate: task.startDate,
                //     status:task.status,
                //     ...domainModel
                // }
                dispatch(addTaskAC(title, todoListID,task))
            })
    }
}
export const fetchTaskTC = (todolistId: string)=>{
    return (dispatch: Dispatch) =>{
        TodolistsApi.getTasks(todolistId)
            .then((res)=>{
                let tasks = res.data.items

                dispatch(GetTaskAC(todolistId, tasks))
            })
    }
}