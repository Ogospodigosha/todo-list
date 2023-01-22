import style from "../../../../todolist.module.css";
import {EditableSpan} from "../../../../Components/EditableSpan/EditableSpan";


import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/Todolists-api";


type TaskPropsType ={
    todolistId: string
    changeIsDone: (taskId: string, status: TaskStatuses, todoListID: string)=>void
    changeTaskTitle: (taskId: string, newValue: string, todoListID: string)=>void
    removeTask: (param: {taskId: string, todoListID: string})=>void
    el: TaskType
}
export const Task = React.memo((props: TaskPropsType)=> {

    console.log("Task")
    const changeIsDoneHendler=(event: ChangeEvent<HTMLInputElement>)=>{
        let NewIsDoneValue =event.currentTarget.checked
        props.changeIsDone(props.el.id, NewIsDoneValue ? TaskStatuses.Completed:TaskStatuses.New, props.todolistId)
    }
    const changeTitleHendler=useCallback((newValue: string, editMode: boolean)=>{

        props.changeTaskTitle(props.el.id, newValue, props.todolistId )
    }, [props.changeTaskTitle, props.todolistId, props.el.id ])
    const remomeTaskHandler =(id: string)=>{
        return props.removeTask({taskId: id, todoListID: props.todolistId})
    }
    return(
        <div key={props.el.id} className={props.el.status === TaskStatuses.Completed ? style.isDone : ""}>
            <Checkbox  onChange={changeIsDoneHendler} checked={props.el.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.el.title} onChange={changeTitleHendler} entityStatus={props.el.entityStatus} />
            <IconButton  onClick={()=>remomeTaskHandler(props.el.id)} disabled={props.el.entityStatus === "loading"}>
                <Delete />
            </IconButton>
        </div>)
})