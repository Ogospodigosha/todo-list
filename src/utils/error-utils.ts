
import {Dispatch} from "redux";
import {ResponseType} from "../api/Todolists-api";
import { SetAppError, SetAppStatus} from "../app/app-reducer";
import {AxiosError} from "axios";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType, showError = true) => {
    debugger
    showError && dispatch(SetAppError({error:data.messages[0]}))
    dispatch(SetAppStatus({status: 'failed'}))
}
export const handleServerNetworkError = (e: any, dispatch: ErrorUtilsDispatchType) => {
    const error = e as Error | AxiosError<{ error: string }>
    dispatch(SetAppError(error.message ? {error: error.message} : {error: 'Some error occurred'}))
    dispatch(SetAppStatus({status: 'failed'}))
}

type ErrorUtilsDispatchType = Dispatch
