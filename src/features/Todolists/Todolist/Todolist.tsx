import React, {useCallback, useEffect} from "react";

import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../Components/EditableSpan/EditableSpan";

import {Task} from "./Task/Task";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import { FilterValuesType} from "./todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/Todolists-api";

import {useActions, useAppDispatch} from "../../../app/store";
import {RequestStatusType} from "../../../app/app-reducer";
import {fetchTask} from "./tasks-actions";
import {tasksActions, todolistsActions} from "./index";

export type TodolistProsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    id: string
    entityStatus: RequestStatusType
}
export const Todolist=React.memo( (props: TodolistProsType )=> {
    const dispatch = useAppDispatch()
    const {ChangeTodolistFilterAC, removeTodolist, changeTodolistTitle} = useActions(todolistsActions)
    const {addTask, updateTask,removeTask } = useActions(tasksActions)
    console.log("todolist is called")

    const changeIsDone = useCallback((taskId: string, status: TaskStatuses, todoListID: string) => {
        updateTask({taskId, domainModel: {status}, todoListID})
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, newValue: string, todoListID: string) => {
        updateTask({taskId :taskId, domainModel: {title: newValue} , todoListID :todoListID})
    }, [dispatch])
    const onAllClickHandler = useCallback((todoListID: string) => {
        ChangeTodolistFilterAC({filter: 'all', id: todoListID})
    }, [props.id])
    const onActiveClickHandler = useCallback((todoListID: string) => {
        ChangeTodolistFilterAC({filter: 'active', id: todoListID})
    }, [props.id])
    const onCompletedClickHandler = useCallback((todoListID: string)=>{
        ChangeTodolistFilterAC({filter: 'completed',id: todoListID})
    }, [props.id])
    const deleteTaskHendler =()=>{
        removeTodolist(props.id)
    }
    const addTaskCallback = useCallback( (title: string)=>{
        addTask({title, todoListID: props.id})
    }, [props.id])
    const changeTitle = useCallback((title: string) => {
        changeTodolistTitle({todoListID: props.id, title})
    }, [props.id]);
    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(el => !el.status)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(el => el.status)
    }
    useEffect(()=>{
        debugger
        dispatch(fetchTask(props.id))
    },[props.id])
    return (
    <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTitle} entityStatus={props.entityStatus}/>
            <IconButton  onClick={deleteTaskHendler} disabled={props.entityStatus === "loading"}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallback}  entityStatus={props.entityStatus}/>
        <div>
            {tasksForTodolist.map((el)=><Task key ={el.id} todolistId={props.id} changeIsDone={changeIsDone} changeTaskTitle={changeTaskTitle}  removeTask={removeTask} el={el} />)}
        </div>
        <div>
            <Button variant={props.filter==="all" ? "contained" : "text"}  onClick={()=>onAllClickHandler(props.id)}>All</Button>
            <Button color={"primary"} variant={props.filter==="active" ? "contained" : "text"} onClick={()=>onActiveClickHandler(props.id)}>Active</Button>
            <Button color={"secondary"} variant={props.filter==="completed" ? "contained" : "text"} onClick={()=>onCompletedClickHandler(props.id)}>Completed</Button>
        </div>
    </div>
    )
})
