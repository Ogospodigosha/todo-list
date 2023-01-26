import {combineReducers} from "redux"
import {tasksReducer} from "../features/Todolists";
import {todolistsReducer} from "../features/Todolists";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})
export type RootReducerType = typeof rootReducer
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),

})
export type AppRootState = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store


