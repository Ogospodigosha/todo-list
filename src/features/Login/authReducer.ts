
import { SetAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/Todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";



const initialState = {
    isLoggedIn: false,
    isInitialized: false
}
export const loginTC = createAsyncThunk('auth/login', async (param:LoginParamsType, thunkAPI)=>{
   thunkAPI.dispatch(SetAppStatusAC({status:'loading'}))
   const res = await authAPI.login(param)
    debugger
     try{
            if (res.data.resultCode === 0) {
              thunkAPI.dispatch(SetAppStatusAC({status:'succeeded'}))
               return  {isLoggedIn: true}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue(null)

            }
     }
     catch (error: any ) {
        debugger
         handleServerNetworkError(error, thunkAPI.dispatch)
         return thunkAPI.rejectWithValue(null)
     }
})
export const logoutTC = createAsyncThunk('auth/logout', async (param, {dispatch, rejectWithValue}) => {
    dispatch(SetAppStatusAC({status: 'loading'}))
    const res = await authAPI.logout()
    debugger
    try {
        if (res.data.resultCode === 0) {
            dispatch(SetAppStatusAC({status: 'succeeded'}))
            dispatch(setIsLoggedInAC({isLoggedIn: false}))
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        debugger
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const initializeAppTC = createAsyncThunk('auth/initializeApp', async (param, {dispatch, rejectWithValue}) => {
    dispatch(SetAppStatusAC({status: "loading"}));
    const res = await authAPI.me()
    debugger
    try {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}));
            dispatch(SetAppStatusAC({status: "succeeded"}));
            return {isInitialized: true}
        } else {
            handleServerAppError(res.data, dispatch)
            return {isInitialized: true}
        }

    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{isLoggedIn: boolean}>) {
            debugger
                state.isLoggedIn = action.payload.isLoggedIn
        },
        initializeAppAC(state, action: PayloadAction<{isInitialized: boolean}>) {
            debugger
            state.isInitialized = action.payload.isInitialized
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(loginTC.fulfilled, (state, action)=>{
            debugger
                state.isLoggedIn = action.payload.isLoggedIn
        });
        builder.addCase(initializeAppTC.fulfilled, (state, action)=>{
            state.isInitialized = action.payload.isInitialized
        });
    }
})
export const authReducer = slice.reducer
export const {setIsLoggedInAC, initializeAppAC} = slice.actions




