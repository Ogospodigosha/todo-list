import {AddTodolistActionType, GetTodolistType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskStateType} from "../../../app/AppWithRedux";
import { TaskStatuses, TaskType, TodolistsApi} from "../../../api/Todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../../app/store";
import {RequestStatusType, SetAppErrorAC, SetAppStatusAC} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";

 const initialState: TaskStateType ={

 }
export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType):TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskID)}
        case "ADD-TASK":
            return {...state, [action.todolistID]: [action.task, ...state[action.todolistID]]}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.todoListID]: state[action.todoListID].map(el => el.id === action.taskId ? {...el, ...action.domainModel}: el)}
        case "ADD-TODOLIST":
            return {...state,[action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            const copy = {...state}
            delete  copy[action.id]
            return copy
        case 'GET-TODOLISTS':
            const stateCopy = {...state}
            action.todolists.forEach(el => {stateCopy[el.id] = []})
            return stateCopy
        case "GET-TASKS":
            return {...state, [action.todoListId]: action.tasks}
        case "CHANGE-TASK-ENTITY-STATUS":
            return {...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {...el,entityStatus: action.status }: el)}
        default:
            return state;
    }
}
//actions
export const removeTaskAC =(todolistID: string, taskID: string) => ({type: "REMOVE-TASK", todolistID, taskID}) as const
export const addTaskAC =(title: string, todolistID: string, task: TaskType) => ({type: "ADD-TASK", title, todolistID, task}) as const
export const changeTaskStatusAC =( taskId: string, domainModel: UpdateModeltype,todoListID: string ) => ({type: "CHANGE-TASK-STATUS", taskId, todoListID, domainModel}) as const
export const getTaskAC =(todoListId: string,tasks: TaskType[]) => ({type:"GET-TASKS", tasks: tasks, todoListId: todoListId}) as const
export const changeTaskEnityStatusAC = (todolistId: string, status:RequestStatusType, taskId: string):ChangeTaskEnityStatusType =>({type:"CHANGE-TASK-ENTITY-STATUS", todolistId, taskId, status})as const
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
        dispatch(SetAppStatusAC("loading"))
        // dispatch(changeTaskEnityStatusAC(todoListID, "loading", taskId))
        TodolistsApi.updateTask(todoListID, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskStatusAC(taskId, apiModel, todoListID))
                    dispatch(SetAppStatusAC("succeeded"))
                    dispatch(changeTaskEnityStatusAC(todoListID, "succeeded", taskId))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch(error => {
            handleServerNetworkError(error, dispatch)
        })
    }
export const addTasksTC = (title: string, todoListID: string) => (dispatch: Dispatch, getState: ()=> AppRootState ) =>{
    dispatch(SetAppStatusAC("loading"))
    TodolistsApi.createTask(todoListID, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                let task = res.data.data.item
                dispatch(addTaskAC(title, todoListID, task))
                dispatch(SetAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error =>{
        handleServerNetworkError(error, dispatch)
    })
}
export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    TodolistsApi.getTasks(todolistId)
        .then((res) => {
            let tasks = res.data.items
            dispatch(getTaskAC(todolistId, tasks))
            dispatch(SetAppStatusAC('succeeded'))
        }).catch((error)=>{
        handleServerNetworkError(error, dispatch)
    })
}
export const removeTaskTC = (taskId: string, todoListID: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    dispatch(changeTaskEnityStatusAC(todoListID, "loading", taskId))
    TodolistsApi.deleteTask(todoListID, taskId)
        .then((res) => {
            if (res.data.resultCode === 0){
                dispatch(removeTaskAC(todoListID, taskId))
                dispatch(SetAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error)=>{
        handleServerNetworkError(error, dispatch)
    })
}
//types
export type ChangeTaskEnityStatusType = {
    type:"CHANGE-TASK-ENTITY-STATUS"
    todolistId: string
    status:RequestStatusType
    taskId: string
}
export type UpdateModeltype = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: number
    startDate?: string
    deadline?: string
}
type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | GetTodolistType
    | ReturnType<typeof getTaskAC>
    | ChangeTaskEnityStatusType
