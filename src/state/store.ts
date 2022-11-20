import {AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore} from "redux"
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

type ThunkAppDispatchType = ThunkDispatch<AppRootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector:TypedUseSelectorHook<AppRootState> = useSelector
 const rootReducer = combineReducers({
     todolists: todolistsReducer,
     tasks: tasksReducer
 })
export const store =legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootState = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store