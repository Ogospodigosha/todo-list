import { v1 } from "uuid";
import {TodolistsApi, TodolistType} from "../api/Todolists-api";
import {AnyAction, Dispatch} from "redux";
import {useDispatch} from "react-redux";



export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type RemoveTodolistActionType ={
    type:"REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionType ={
    type:"ADD-TODOLIST"
    title:  string
    todolistID: string

}
export type ChangeTodolistActionType ={
    type:"CHANGE-TODOLIST-TITLE"
    id: string
    title:  string
}
export type ChangeTodolistFilterActionType ={
    type:'CHANGE-TODOLIST-FILTER'
    id: string
    filter:  FilterValuesType
}
export type GetTodolistType = {
    type: 'GET-TODOLISTS'
    todolists: TodolistType[]
}
type ActionsType =RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistActionType |  ChangeTodolistFilterActionType | GetTodolistType
export let todoListID_1 = v1()
export let todoListID_2 = v1()
const initialState:Array<TodolistDomainType> = [

]


export const  fetchTodolistsTC: any = () =>{
    return (dispatch: Dispatch) => {
        TodolistsApi.getTodolists()
            .then((res)=>{
                dispatch(GetTodolistsAC(res.data))
            })
}
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType):TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
           return state.filter(el => el.id !== action.id);
        case "ADD-TODOLIST":
            let todolist: TodolistDomainType = {id: action.todolistID, title: action.title, filter: "all", addedDate: '', order: 0};
            return [...state, todolist];
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.id ? {...el, title: action.title}: el);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter}: el);
        case 'GET-TODOLISTS':
            return action.todolists.map(el => {
                return {...el, filter: 'all'}
            })
        default :
            return state
    }
}
export const RemoveTodolistAC =(todolistId: string): RemoveTodolistActionType =>{
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const AddTodolistAC =(title: string): AddTodolistActionType =>{
    return {type: "ADD-TODOLIST", title, todolistID: v1() }
}
export const ChangeTodolistAC =(id: string, title: string): ChangeTodolistActionType =>{
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const ChangeTodolistFilterAC =(id: string, filter: FilterValuesType): ChangeTodolistFilterActionType =>{
    return {type:"CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}
export const GetTodolistsAC =(todolists:TodolistType[]): GetTodolistType =>{
    return {type:"GET-TODOLISTS", todolists} as const
}