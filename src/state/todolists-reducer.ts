import { v1 } from "uuid";
import {FilterValuesType, TodolistType} from "../AppWithRedux";

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
type ActionsType =RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistActionType |  ChangeTodolistFilterActionType
export let todoListID_1 = v1()
export let todoListID_2 = v1()
const initialState:Array<TodolistType> = [
    
]
export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType):TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
           return state.filter(el => el.id !== action.id);
        case "ADD-TODOLIST":
            let todolist: TodolistType = {id: action.todolistID, title: action.title, filter: "all"};
            return [...state, todolist];
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.id ? {...el, title: action.title}: el);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter}: el);
        default:
            return state;
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