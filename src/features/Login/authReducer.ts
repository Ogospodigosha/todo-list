import {AnyAction, Dispatch} from "redux";
import { SetAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/Todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false,
    isInitialized: false
}
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
    }
})
export const authReducer = slice.reducer
export const {setIsLoggedInAC, SetIsInitializedAC} = slice.actions
// (state: initialStateType = initialState, action: ActionsType) => {
//     switch (action.type) {
//         case 'login/SET-IS-LOGGED-IN':
//             return {...state, isLoggedIn: action.value}
//         case 'SET- ISINITIALIZED':
//             return {...state, isInitialized: action.isInitialized }
//         default:
//             return state
//     }
// }

//actions
// export const setIsLoggedInAC = (value: boolean) =>
//     ({type: 'login/SET-IS-LOGGED-IN', value} as const)
// export const SetIsInitializedAC = (isInitialized: boolean) => ({type:'SET- ISINITIALIZED', isInitialized } as const)

//types
// type initialStateType = typeof initialState
// type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatus | SetAppError |  ReturnType<typeof SetIsInitializedAC>

//thunk
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(SetAppStatusAC({status:'loading'}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(SetAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
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