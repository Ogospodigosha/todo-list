import {AddTodolistActionType, GetTodolistType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskStateType} from "../../../app/AppWithRedux";
import { TaskStatuses, TaskType, TodolistsApi} from "../../../api/Todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../../app/store";

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
        default:
            return state;
    }
}
//actions
export const removeTaskAC =(todolistID: string, taskID: string) => ({type: "REMOVE-TASK", todolistID, taskID}) as const
export const addTaskAC =(title: string, todolistID: string, task: TaskType) => ({type: "ADD-TASK", title, todolistID, task}) as const
export const changeTaskStatusAC =( taskId: string, domainModel: UpdateModeltype,todoListID: string ) => ({type: "CHANGE-TASK-STATUS", taskId, todoListID, domainModel}) as const
export const getTaskAC =(todoListId: string,tasks: TaskType[]) => ({type:"GET-TASKS", tasks: tasks, todoListId: todoListId}) as const
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
    TodolistsApi.updateTask(todoListID, taskId, apiModel)
        .then((res) => {
            dispatch(changeTaskStatusAC(taskId, apiModel, todoListID))
        })
}
export const addTasksTC = (title: string, todoListID: string) => (dispatch: Dispatch, getState: ()=> AppRootState ) =>{
        TodolistsApi.createTask(todoListID, title )
            .then((res)=>{
             let task =    res.data.data.item
                console.log(task)
                dispatch(addTaskAC(title, todoListID,task))
            })
    }
export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    TodolistsApi.getTasks(todolistId)
        .then((res) => {
            let tasks = res.data.items
            dispatch(getTaskAC(todolistId, tasks))
        })
}
export const removeTaskTC = (taskId: string, todoListID: string) => (dispatch: Dispatch) => {
    TodolistsApi.deleteTask(todoListID, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todoListID, taskId))
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
type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | GetTodolistType
    | ReturnType<typeof getTaskAC>
