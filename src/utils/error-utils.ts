
import {Dispatch} from "redux";
import {ResponseType} from "../api/Todolists-api";
import { SetAppErrorAC, SetAppStatusAC} from "../app/app-reducer";
import {AxiosError} from "axios";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType, showError = true) => {
    debugger
    showError && dispatch(SetAppErrorAC({error:data.messages[0]}))
    dispatch(SetAppStatusAC({status: 'failed'}))
}
export const handleServerNetworkError = (e: any, dispatch: ErrorUtilsDispatchType) => {
    const error = e as Error | AxiosError<{ error: string }>
    dispatch(SetAppErrorAC(error.message ? {error: error.message} : {error: 'Some error occurred'}))
    dispatch(SetAppStatusAC({status: 'failed'}))
}

type ErrorUtilsDispatchType = Dispatch
