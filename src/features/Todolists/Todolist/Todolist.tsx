import React, {useCallback, useEffect} from "react";

import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../Components/EditableSpan/EditableSpan";
import {Task} from "./Task/Task";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {TaskType} from "../../../api/Todolists-api";
import {useActions} from "../../../utils/useAction";
import {todolistsActions, tasksActions} from '../index'
import {ButtonPropsColorOverrides} from "@mui/material/Button/Button";
import {OverridableStringUnion} from "@mui/types";
import {useAppDispatch} from "../../../app/store";

export type TodolistProsType = {
    tasks: Array<TaskType>
    todolist: TodolistDomainType
}

export const Todolist=React.memo( (props: TodolistProsType )=> {
    const dispatch = useAppDispatch()
    const {ChangeTodolistFilterAC, removeTodolist, changeTodolistTitle} = useActions(todolistsActions)
    const { addTask, fetchTask} = useActions(tasksActions)
    const onClickFilterButton = useCallback((buttonFilter: FilterValuesType) => {
        ChangeTodolistFilterAC({filter: buttonFilter, id: props.todolist.id})
    }, [props.todolist.id])

    const deleteTaskHandler =()=>{
        removeTodolist(props.todolist.id)
    }
    const addTaskCallback = useCallback(async (title: string) => {
        const thunk =  tasksActions.addTask({title, todoListID: props.todolist.id})
        const resultAction = await dispatch(thunk)
        if (tasksActions.addTask.rejected.match(resultAction)) {
            const errorMessage = resultAction.payload
            if (errorMessage) {
                throw new Error(errorMessage)
            }
        }

    }, [props.todolist.id])
    const changeTitle = useCallback((title: string) => {
        changeTodolistTitle({todoListID: props.todolist.id, title})
    }, [props.todolist.id]);
    let tasksForTodolist = props.tasks;
    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(el => !el.status)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(el => el.status)
    }
    useEffect(()=>{
        fetchTask(props.todolist.id)
    },[props.todolist.id])

    const renderFilterButton = (color: OverridableStringUnion<'inherit'
                                    | 'primary' | 'secondary'
                                    | 'success' | 'error' | 'info' | 'warning', ButtonPropsColorOverrides>,
                                buttonFilter: FilterValuesType, text: string ) =>{
        return <Button color={color}
                       onClick={()=>onClickFilterButton(buttonFilter)}
                       variant={props.todolist.filter === buttonFilter ? "contained" : "text"}>{text}</Button>
    }
    return (
    <div>
        <h3 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <EditableSpan title={props.todolist.title} onChange={changeTitle} entityStatus={props.todolist.entityStatus}/>
            <IconButton  onClick={deleteTaskHandler} disabled={props.todolist.entityStatus === "loading"}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallback}  entityStatus={props.todolist.entityStatus}/>
        <div>
            {tasksForTodolist.length >0 ? tasksForTodolist.map((el)=><Task key ={el.id} todolistId={props.todolist.id}   el={el} />)
                :<div style={{padding: '10px', color:'grey'}}>No tasks</div>}
        </div>
        <div>
            {renderFilterButton('inherit',  "all", "All")}
            {renderFilterButton('primary',  "active", "Active")}
            {renderFilterButton('secondary',  "completed", "Completed")}
        </div>
    </div>
    )
})
