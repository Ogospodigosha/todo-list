import {tasksActions, todolistsActions} from "../features/Todolists/Todolist";
import {useMemo} from "react";
import {bindActionCreators} from "redux";
import {useAppDispatch} from "../app/store";

const allActions = {
    ...tasksActions,
    ...todolistsActions
}

export function useActions() {
    const dispatch = useAppDispatch()
    debugger
    const boundActions = useMemo(()=>{
        debugger
        return bindActionCreators(allActions, dispatch)
    },[])
    return boundActions
}