import {asyncActions as tasksActionsAsync}  from './tasks-reducer'
import {asyncActions as todolistsActionsAsync} from './todolists-reducer'
import {slice} from './todolists-reducer'
import {TodolistsList} from "./TodolistsList";

const todolistsActions = {
    ...todolistsActionsAsync,
    ...slice.actions
}
const tasksActions = {
    ...tasksActionsAsync
}
export {
    todolistsActions,
    tasksActions,
    TodolistsList
}