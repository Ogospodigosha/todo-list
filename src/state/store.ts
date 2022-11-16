import {applyMiddleware, combineReducers, createStore, legacy_createStore} from "redux"
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import thunk from "redux-thunk";



 const rootReducer = combineReducers({
     todolists: todolistsReducer,
     tasks: tasksReducer
 })
export const store =createStore(rootReducer, applyMiddleware(thunk))
export type AppRootState = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store