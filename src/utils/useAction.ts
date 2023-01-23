
import {useMemo} from "react";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useAppDispatch} from "../app/store";




export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch()
    debugger
    const boundActions = useMemo(()=>{
        debugger
        return bindActionCreators(actions, dispatch)
    },[])
    return boundActions
}