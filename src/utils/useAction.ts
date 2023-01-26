
import {useMemo} from "react";
import {ActionCreatorsMapObject, AnyAction, bindActionCreators} from "redux";
import {AppRootState} from "../app/store";
import {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
type ThunkAppDispatchType = ThunkDispatch<AppRootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()



export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch()
    const boundActions = useMemo(()=>{
        return bindActionCreators(actions, dispatch)
    },[])
    return boundActions
}