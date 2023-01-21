import {ActionCreatorsMapObject, AnyAction, bindActionCreators, combineReducers} from "redux"
import {tasksReducer} from "../features/Todolists/Todolist/tasks-reducer";
import {todolistsReducer} from "../features/Todolists/Todolist/todolists-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import { useDispatch} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/authReducer";
import {configureStore} from "@reduxjs/toolkit";
import {useMemo} from "react";

type ThunkAppDispatchType = ThunkDispatch<AppRootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
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

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch()
    debugger
    const boundActions = useMemo(()=>{
        debugger
        return bindActionCreators(actions, dispatch)
    },[])
    return boundActions
}