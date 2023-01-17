
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

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = null | string



