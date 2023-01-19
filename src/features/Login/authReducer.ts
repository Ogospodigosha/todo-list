import {AnyAction, Dispatch} from "redux";
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
                return  {isLoggedIn: false}

            }
     }
     catch (error: any ) {
        debugger
         handleServerNetworkError(error, thunkAPI.dispatch)
         return {isLoggedIn: false}
     }
})
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
                state.isLoggedIn = action.payload.value
        },
        SetIsInitializedAC(state, action:PayloadAction<{isInitialized: boolean}>){
            state.isInitialized = action.payload.isInitialized
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(loginTC.fulfilled, (state, action)=>{
                state.isLoggedIn = action.payload.isLoggedIn
        });
    }
})
export const authReducer = slice.reducer
export const {setIsLoggedInAC, SetIsInitializedAC} = slice.actions

//thunk

export const logoutTC = () => (dispatch: Dispatch<AnyAction>) => {
    dispatch(SetAppStatusAC({status:'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(SetAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC({status: "loading"}));
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(SetAppStatusAC({status: "succeeded"}));
        } else {
            handleServerAppError(res.data, dispatch)
        }
        dispatch(SetIsInitializedAC({isInitialized: true}))
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}