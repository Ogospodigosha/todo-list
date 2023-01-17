import React, {useCallback, useEffect} from "react";

import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../Components/EditableSpan/EditableSpan";

import {Task} from "./Task/Task";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {FilterValuesType} from "./todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/Todolists-api";

import {fetchTaskTC} from "./tasks-reducer";
import {useAppDispatch} from "../../../app/store";
import {RequestStatusType} from "../../../app/app-reducer";



export type TodolistProsType ={
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string)=>void
    addTasks: (title:string, todoListID: string)=>void
    changetodoListsFilter: (value: FilterValuesType, todoListID: string) =>void
    changeIsDone: (taskId: string, status: TaskStatuses, todoListID: string)=>void
    changeTaskTitle: (taskId: string, newValue: string, todoListID: string)=>void
    filter: FilterValuesType
    id: string
    deleteTodolist: (todoListID: string)=> void
    changeTodolistTitle: (todoListID: string, title: string)=> void
    entityStatus: RequestStatusType

}




export const Todolist=React.memo( (props: TodolistProsType )=> {
    const dispatch = useAppDispatch()
    console.log("todolist is called")
      const onAllClickHandler = useCallback((todoListID: string)=>{
        props.changetodoListsFilter('all', props.id)
    }, [props.changetodoListsFilter, props.id])
    const onActiveClickHandler = useCallback((todoListID: string)=>{
        props.changetodoListsFilter('active', props.id)
    }, [props.changetodoListsFilter, props.id])
    const onCompletedClickHandler = useCallback((todoListID: string)=>{
        props.changetodoListsFilter('completed', props.id)
    }, [props.changetodoListsFilter, props.id])
    const deleteTaskHendler =()=>{
        props.deleteTodolist(props.id)
    }
    const addTask = useCallback( (title: string)=>{
        props.addTasks(title, props.id)
    }, [props.addTasks, props.id])
    const changeTodolistTitle = useCallback((title: string) => {
          props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id]);
    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(el => !el.status)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(el => el.status)
    }
    useEffect(()=>{
        debugger
        dispatch(fetchTaskTC(props.id))
    },[])
    return (
    <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodolistTitle} entityStatus={props.entityStatus}/>
            <IconButton  onClick={deleteTaskHendler} disabled={props.entityStatus === "loading"}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}  entityStatus={props.entityStatus}/>
        <div>
            {tasksForTodolist.map((el)=><Task key ={el.id} todolistId={props.id} changeIsDone={props.changeIsDone} changeTaskTitle={props.changeTaskTitle}  removeTask={props.removeTask} el={el} />)}
        </div>
        <div>
            <Button variant={props.filter==="all" ? "contained" : "text"}  onClick={()=>onAllClickHandler(props.id)}>All</Button>
            <Button color={"primary"} variant={props.filter==="active" ? "contained" : "text"} onClick={()=>onActiveClickHandler(props.id)}>Active</Button>
            <Button color={"secondary"} variant={props.filter==="completed" ? "contained" : "text"} onClick={()=>onCompletedClickHandler(props.id)}>Completed</Button>
        </div>
    </div>
    )
})
