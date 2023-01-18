import { v1 } from "uuid"

import {
    AddTodolistAC, ChangeTodolistAC, ChangeTodolistEntityStatusAC,
    ChangeTodolistFilterAC,
    FilterValuesType, RemoveTodolistAC, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {RequestStatusType} from "../../../app/app-reducer";





test('correct todolist should be removed', ()=> {
    const todoListID_1 = v1();
    const todoListID_2 = v1();
    const startState:  Array<TodolistDomainType> = [
        {id: todoListID_1, title: "What to learn", filter: "all", order:0, addedDate: '', entityStatus: "idle"},
        {id: todoListID_2, title: "What to Buy", filter: "all", order: 0, addedDate: '', entityStatus: "idle"}
    ]
     const endState = todolistsReducer(startState, RemoveTodolistAC({todolistId :todoListID_1}))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID_2)
} )

test('correct todolist should be added', ()=>{
    const todoListID_1 = v1();
    const todoListID_2 = v1();
    let newTodolistTitle = "New todolist"
    const startState:  Array<TodolistDomainType> = [
        {id: todoListID_1, title: "What to learn", filter: "all", order:0, addedDate: '', entityStatus: "idle"},
        {id: todoListID_2, title: "What to Buy", filter: "all", order:0, addedDate: '', entityStatus: "idle"}
    ]
    let todolist = {id: v1(), title: "New todolist", addedDate: '', order: 0}
    const endState =todolistsReducer(startState, AddTodolistAC({todolist}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe("all")
})

test('correct todolist should change its name', ()=>{
    const todoListID_1 = v1();
    const todoListID_2 = v1();
    let newTodolistTitle = "New todolist"
    const startState:  Array<TodolistDomainType> = [
        {id: todoListID_1, title: "What to learn", filter: "all", order:0, addedDate: '', entityStatus: "idle"},
        {id: todoListID_2, title: "What to Buy", filter: "all", order:0, addedDate: '', entityStatus: "idle"}
    ]
    const action = ChangeTodolistAC({id :todoListID_2, title :newTodolistTitle})

    const endState = todolistsReducer(startState, action)
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', ()=>{
    const todoListID_1 = v1();
    const todoListID_2 = v1();
    let newFilter: FilterValuesType = "completed";
    const startState:  Array<TodolistDomainType> = [
        {id: todoListID_1, title: "What to learn", filter: "all", order:0, addedDate: '', entityStatus: "idle"},
        {id: todoListID_2, title: "What to Buy", filter: "all", order:0, addedDate: '', entityStatus: "idle"}
    ]
    const action = ChangeTodolistFilterAC({id :todoListID_2, filter :newFilter})
    const endState = todolistsReducer(startState, action)
    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe("completed")
})
test('correct status of todolist should be changed', ()=>{
    const todoListID_1 = v1();
    const todoListID_2 = v1();
    let status: RequestStatusType = "loading"
    const startState:  Array<TodolistDomainType> = [
        {id: todoListID_1, title: "What to learn", filter: "all", order:0, addedDate: '', entityStatus: "idle"},
        {id: todoListID_2, title: "What to Buy", filter: "all", order:0, addedDate: '', entityStatus: "idle"}
    ]
    const action = ChangeTodolistEntityStatusAC({id :todoListID_2, status})
    const endState = todolistsReducer(startState, action)
    expect(endState[0].entityStatus).toBe("idle")
    expect(endState[1].entityStatus).toBe("loading")
})
