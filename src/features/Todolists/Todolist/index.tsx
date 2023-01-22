import * as tasksActions from './tasks-actions'
import * as todolistsActionsAsync from './todolists-actions'
import {slice} from './todolists-reducer'

const todolistsActions = {
    ...todolistsActionsAsync,
    ...slice.actions
}
export {
    tasksActions, todolistsActions
}