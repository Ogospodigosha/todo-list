
import {AddTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskStateType} from "../../../app/AppWithRedux";

test('ids should be equals', ()=> {
    const todolist =
        {id: "123", title: "new Todolist", addedDate: "", order: 0}
    const startTaskState: TaskStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []
    const action = AddTodolistAC({todolist})
    const endTasksState = tasksReducer(startTaskState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)
    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id
    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
})


