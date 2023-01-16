import { Dispatch } from "redux";
import {authAPI} from "../api/Todolists-api";
import {SetIsInitializedAC, setIsLoggedInAC} from "../features/Login/authReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as RequestErrorType,

}
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        SetAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>){
            state.status = action.payload.status
        },
        SetAppErrorAC(state, action: PayloadAction<{error: RequestErrorType}>) {
            state.error = action.payload.error
        }
    }
})
export const {SetAppStatusAC, SetAppErrorAC} = slice.actions
export const appReducer = slice.reducer
// export const appReducer = (state: InitialStateType = initialState, action: ActionType) => {
//     switch (action.type) {
//         case 'SET-APP-STATUS':
//             return {...state, status: action.status}
//         case "SET-APP-ERROR":
//             return {...state, error: action.error}
//         default:
//             return state
//     }
//
// }

//actions
// export const SetAppStatusAC = (status: RequestStatusType) => ({type:'SET-APP-STATUS', status } as const)
// export const SetAppErrorAC = (error: null | string) => ({type:'SET-APP-ERROR', error } as const)


//types

// type InitialStateType = typeof initialState
// export enum requestStatusType {
//     IDLE = 'idle',
//     LOADING = 'loading',
//     SUCCEEDED = 'succeeded',
//     FAILED = 'failed',
// }
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = null | string
// export type SetAppStatus ={
//     type: 'SET-APP-STATUS'
//     status: RequestStatusType
// }
// export type SetAppError ={
//     type: 'SET-APP-ERROR'
//     error: RequestErrorType
// }
// export type ActionType =
//     | SetAppStatus
//     | SetAppError


