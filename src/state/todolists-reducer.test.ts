import { v1 } from "uuid"

import {
    AddTodolistAC, ChangeTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistFilterActionType, FilterValuesType, RemoveTodolistAC, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";




test('correct todolist should be removed', ()=> {
    const todoListID_1 = v1();
    const todoListID_2 = v1();
    const startState:  Array<TodolistDomainType> = [
        {id: todoListID_1, title: "What to learn", filter: "all", order:0, addedDate: ''},
        {id: todoListID_2, title: "What to Buy", filter: "all", order: 0, addedDate: ''}
    ]
     const endState = todolistsReducer(startState, RemoveTodolistAC(todoListID_1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID_2)
} )

test('correct todolist should be added', ()=>{
    const todoListID_1 = v1();
    const todoListID_2 = v1();
    let newTodolistTitle = "New todolist"
    const startState:  Array<TodolistDomainType> = [
        {id: todoListID_1, title: "What to learn", filter: "all", order:0, addedDate: ''},
        {id: todoListID_2, title: "What to Buy", filter: "all", order:0, addedDate: ''}
    ]
    const endState =todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe("all")
})

test('correct todolist should change its name', ()=>{
    const todoListID_1 = v1();
    const todoListID_2 = v1();
    let newTodolistTitle = "New todolist"
    const startState:  Array<TodolistDomainType> = [
        {id: todoListID_1, title: "What to learn", filter: "all", order:0, addedDate: ''},
        {id: todoListID_2, title: "What to Buy", filter: "all", order:0, addedDate: ''}
    ]
    const action = ChangeTodolistAC(todoListID_2,newTodolistTitle)

    const endState = todolistsReducer(startState, action)
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', ()=>{
    const todoListID_1 = v1();
    const todoListID_2 = v1();
    let newFilter: FilterValuesType = "completed";
    const startState:  Array<TodolistDomainType> = [
        {id: todoListID_1, title: "What to learn", filter: "all", order:0, addedDate: ''},
        {id: todoListID_2, title: "What to Buy", filter: "all", order:0, addedDate: ''}
    ]
    const action:  ChangeTodolistFilterActionType= ChangeTodolistFilterAC(todoListID_2,newFilter )
    const endState = todolistsReducer(startState, action)
    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe("completed")
})
