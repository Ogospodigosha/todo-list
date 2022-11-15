
import {AddTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskStateType} from "../AppWithRedux";

test('ids should be equals', ()=> {
    const startTaskState: TaskStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []
    const action = AddTodolistAC("new Todolist")
    const endTasksState = tasksReducer(startTaskState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)
    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id
    expect(idFromTasks).toBe(action.todolistID);
    expect(idFromTodolists).toBe(action.todolistID);
})
