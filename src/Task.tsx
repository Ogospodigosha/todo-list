import style from "./todolist.module.css";
import {EditableSpan} from "./Components/EditableSpan";
import {InArrayProps} from "./Todolist";
import {Checkbox, IconButton} from "@material-ui/core";
import { ChangeEvent } from "react";
import React, {useCallback} from "react";
import { Delete } from "@material-ui/icons";
type TaskPropsType ={
    todolistId: string
    changeIsDone: (taskId: string, isDoneValue: boolean, todoListID: string)=>void
    changeTaskTitle: (taskId: string, newValue: string, todoListID: string)=>void
    removeTask: (taskId: string, todoListID: string)=>void
    el: InArrayProps
}
export const Task = React.memo((props: TaskPropsType)=> {
    console.log("Task")
    const changeIsDoneHendler=(event: ChangeEvent<HTMLInputElement>)=>{
        props.changeIsDone(props.el.id, event.currentTarget.checked, props.todolistId)
    }
    const changeTitleHendler=useCallback((newValue: string)=>{
        props.changeTaskTitle(props.el.id, newValue, props.todolistId )
    }, [props.changeTaskTitle, props.todolistId, props.el.id ])
    const remomeTaskHandler =(id: string)=>{
        return props.removeTask(id, props.todolistId)
    }
    return(
        <div key={props.el.id} className={props.el.isDone ? style.isDone : ""}>
            <Checkbox  onChange={changeIsDoneHendler} checked={props.el.isDone}/>
            <EditableSpan title={props.el.title} onChange={changeTitleHendler}/>
            <IconButton  onClick={()=>remomeTaskHandler(props.el.id)}>
                <Delete />
            </IconButton>
        </div>)
})