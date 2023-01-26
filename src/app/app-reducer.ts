
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as RequestErrorType,

}
export const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        SetAppStatus(state, action: PayloadAction<{status: RequestStatusType}>){
            state.status = action.payload.status
        },
        SetAppError(state, action: PayloadAction<{error: RequestErrorType}>) {
            state.error = action.payload.error
        }
    }
})
export const {SetAppStatus, SetAppError} = slice.actions
export const appReducer = slice.reducer

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = null | string



