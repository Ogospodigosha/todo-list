import {asyncActions as tasksActionsAsync}  from './tasks-reducer'
import {asyncActions as todolistsActionsAsync} from './todolists-reducer'
import {slice as todolistsSlice} from './todolists-reducer'
import {slice as tasksSlice} from './tasks-reducer'
import {TodolistsList} from "./TodolistsList";
import * as TasksTodolistsSelector from './selectors'

const todolistsReducer = todolistsSlice.reducer
const tasksReducer = tasksSlice.reducer
const todolistsActions = {
    ...todolistsActionsAsync,
    ...todolistsSlice.actions
}
const tasksActions = {
    ...tasksActionsAsync
}
export {
    todolistsActions,
    tasksActions,
    TodolistsList,
    todolistsReducer,
    tasksReducer,
    TasksTodolistsSelector
}