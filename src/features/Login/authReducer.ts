import {AnyAction, Dispatch} from "redux";
import {SetAppError, SetAppStatus, SetAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/Todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState = {
    isLoggedIn: false,
    isInitialized: false
}

export const authReducer = (state: initialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'SET- ISINITIALIZED':
            return {...state, isInitialized: action.isInitialized }
        default:
            return state
    }
}

//actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const SetIsInitializedAC = (isInitialized: boolean) => ({type:'SET- ISINITIALIZED', isInitialized } as const)
//types
type initialStateType = typeof initialState
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatus | SetAppError |  ReturnType<typeof SetIsInitializedAC>

//thunk
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(SetAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(SetAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch<AnyAction>) => {
    dispatch(SetAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(SetAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
