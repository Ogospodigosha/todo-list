import {SetAppError, SetAppErrorAC, SetAppStatus, SetAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/Todolists-api";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(SetAppErrorAC(data.messages[0]))
    } else {
        dispatch(SetAppErrorAC('Some error occurred'))
    }
    dispatch(SetAppStatusAC('failed'))
}
export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(SetAppErrorAC(error.message ? error.message:'Some error occurred' ))
    dispatch(SetAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetAppError | SetAppStatus>
