
import {Dispatch} from "redux";
import {ResponseType} from "../api/Todolists-api";
import { SetAppErrorAC, SetAppStatusAC} from "../app/app-reducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(SetAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(SetAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(SetAppStatusAC({status:'failed'}))
}
export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    if (error.message) {
        dispatch(SetAppErrorAC(error.message ? {error: error.message} : {error: 'Some error occurred'} ))
    }
    // dispatch(SetAppErrorAC(error.message ? error.message:'Some error occurred' ))
    dispatch(SetAppStatusAC({status:'failed'}))
}

type ErrorUtilsDispatchType = Dispatch
