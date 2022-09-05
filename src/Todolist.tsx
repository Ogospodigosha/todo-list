import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";

import style from "./todolist.module.css";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import {Button} from "@material-ui/core";


export type TodolistProsType ={
    title: string
    tasks: Array<InArrayProps>
    removeTask: (taskId: string, todoListID: string)=>void
    addTasks: (title:string, todoListID: string)=>void
    changetodoListsFilter: (value: FilterValuesType, todoListID: string) =>void
    changeIsDone: (taskId: string, isDoneValue: boolean, todoListID: string)=>void
    changeTaskTitle: (taskId: string, newValue: string, todoListID: string)=>void
    filter: FilterValuesType
    id: string
    deleteTodolist: (todoListID: string)=> void
    changeTodolistTitle: (todoListID: string, title: string)=> void

}


 export type InArrayProps ={
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist=(props: TodolistProsType )=> {
      const onAllClickHandler =(todoListID: string)=>{
        props.changetodoListsFilter('all', props.id)
    }
    const onActiveClickHandler =(todoListID: string)=>{
        props.changetodoListsFilter('active', props.id)
    }
    const onCompletedClickHandler =(todoListID: string)=>{
        props.changetodoListsFilter('completed', props.id)
    }
    const remomeTaskHandler =(id: string)=>{
       return props.removeTask(id, props.id)
    }
    const deleteTaskHendler =()=>{
        props.deleteTodolist(props.id)
    }
    const addTask = (title: string)=>{
        props.addTasks(title, props.id)
    }
    const changeTodolistTitle = (title: string) => {
          props.changeTodolistTitle(props.id, title)
    }
    return (
    <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            {/*<button onClick={deleteTaskHendler}>x</button>*/}
            <IconButton  onClick={deleteTaskHendler}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <div>
            {props.tasks.map((el)=>{
                const changeIsDoneHendler=(event: ChangeEvent<HTMLInputElement>)=>{
                    props.changeIsDone(el.id, event.currentTarget.checked, props.id)
                }
                const changeTitleHendler=(newValue: string)=>{
                    props.changeTaskTitle(el.id, newValue, props.id )
                }
                return(
                <div key={el.id} className={el.isDone ? style.isDone : ""}>
                    <Checkbox  onChange={changeIsDoneHendler} checked={el.isDone}/>
                    <EditableSpan title={el.title} onChange={changeTitleHendler}/>
                    {/*<Button callback={()=>remomeTaskHandler(el.id)} nickName={"x"}/>*/}
                    <IconButton  onClick={()=>remomeTaskHandler(el.id)}>
                        <Delete />
                    </IconButton>
                </div>)
            })}

        </div>
        <div>
            <Button variant={props.filter==="all" ? "contained" : "text"}  onClick={()=>onAllClickHandler(props.id)}>All</Button>
            <Button color={"primary"} variant={props.filter==="active" ? "contained" : "text"} onClick={()=>onActiveClickHandler(props.id)}>Active</Button>
            <Button color={"secondary"} variant={props.filter==="completed" ? "contained" : "text"} onClick={()=>onCompletedClickHandler(props.id)}>Completed</Button>
        </div>
    </div>
    )
}
