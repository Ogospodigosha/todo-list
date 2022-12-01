import { Dispatch } from "redux";
import {authAPI} from "../api/Todolists-api";
import {SetIsInitializedAC, setIsLoggedInAC} from "../features/Login/authReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as RequestErrorType,

}
export const appReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET-APP-STATUS':
            return {...state, status: action.status}
        case "SET-APP-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }

}

//actions
export const SetAppStatusAC = (status: RequestStatusType) => ({type:'SET-APP-STATUS', status } as const)
export const SetAppErrorAC = (error: null | string) => ({type:'SET-APP-ERROR', error } as const)


//types
type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = null | string
export type SetAppStatus ={
    type: 'SET-APP-STATUS'
    status: RequestStatusType
}
export type SetAppError ={
    type: 'SET-APP-ERROR'
    error: RequestErrorType
}
export type ActionType =
    | SetAppStatus
    | SetAppError



//thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(res.data, dispatch)
        }
        dispatch(SetIsInitializedAC(true))
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}