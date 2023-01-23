import React, {useCallback, useEffect} from "react";

import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../Components/EditableSpan/EditableSpan";
import {Task} from "./Task/Task";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/Todolists-api";
import {useActions} from "../../../utils/useAction";
import {todolistsActions, tasksActions} from '../index'
import {ButtonPropsColorOverrides} from "@mui/material/Button/Button";
import {OverridableStringUnion} from "@mui/types";

export type TodolistProsType = {
    tasks: Array<TaskType>
    todolist: TodolistDomainType
}

export const Todolist=React.memo( (props: TodolistProsType )=> {

    const {ChangeTodolistFilterAC, removeTodolist, changeTodolistTitle} = useActions(todolistsActions)
   const  { updateTask, addTask, fetchTask, removeTask} = useActions(tasksActions)
    console.log("todolist is called")

    const changeIsDone = useCallback((taskId: string, status: TaskStatuses, todoListID: string) => {
        updateTask({taskId, domainModel: {status}, todoListID})
    }, [])
    const changeTaskTitle = useCallback((taskId: string, newValue: string, todoListID: string) => {
        updateTask({taskId :taskId, domainModel: {title: newValue} , todoListID :todoListID})
    }, [])

    const onClickFilterButton = useCallback((buttonFilter: FilterValuesType) => {
        ChangeTodolistFilterAC({filter: buttonFilter, id: props.todolist.id})
    }, [props.todolist.id])


    const deleteTaskHandler =()=>{
        removeTodolist(props.todolist.id)
    }
    const addTaskCallback = useCallback( (title: string)=>{
        addTask({title, todoListID: props.todolist.id})
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
        debugger
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
        <h3>
            <EditableSpan title={props.todolist.title} onChange={changeTitle} entityStatus={props.todolist.entityStatus}/>
            <IconButton  onClick={deleteTaskHandler} disabled={props.todolist.entityStatus === "loading"}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallback}  entityStatus={props.todolist.entityStatus}/>
        <div>
            {tasksForTodolist.map((el)=><Task key ={el.id} todolistId={props.todolist.id} changeIsDone={changeIsDone} changeTaskTitle={changeTaskTitle}  removeTask={removeTask} el={el} />)}
        </div>
        <div>
            {renderFilterButton('inherit',  "all", "All")}
            {renderFilterButton('primary',  "active", "Active")}
            {renderFilterButton('secondary',  "completed", "Completed")}
        </div>
    </div>
    )
})
