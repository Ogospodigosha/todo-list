import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./Components/Button";
import style from "./todolist.module.css";
import {AddItemForm} from "./AddItemForm";


export type TodolistProsType ={
    title: string
    tasks: Array<InArrayProps>
    removeTask: (taskId: string, todoListID: string)=>void
    addTasks: (title:string, todoListID: string)=>void
    changetodoListsFilter: (value: FilterValuesType, todoListID: string) =>void
    changeIsDone: (taskId: string, isDoneValue: boolean, todoListID: string)=>void
    filter: FilterValuesType
    id: string
    deleteTodolist: (todoListID: string)=> void
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
    return (
    <div>
        <h3>{props.title}<button onClick={deleteTaskHendler}>x</button></h3>
        <AddItemForm addItem={addTask} />
        <ul>
            {props.tasks.map((el)=>{
                const changeIsDoneHendler=(event: ChangeEvent<HTMLInputElement>)=>{
                    props.changeIsDone(el.id, event.currentTarget.checked, props.id)
                }
                return(
                <li key={el.id} className={el.isDone ? style.isDone : ""}>
                    <Button callback={()=>remomeTaskHandler(el.id)} nickName={"x"}/>
                    <input type="checkbox" onChange={changeIsDoneHendler} checked={el.isDone}/>
                    <span>{el.title}</span>
                </li>)
            })}

        </ul>
        <div>
            <button className={props.filter==="all" ? style.activeFilter: ""} onClick={()=>onAllClickHandler(props.id)}>All</button>
            <button className={props.filter==="active" ? style.activeFilter: ""} onClick={()=>onActiveClickHandler(props.id)}>Active</button>
            <button className={props.filter==="completed" ? style.activeFilter: ""} onClick={()=>onCompletedClickHandler(props.id)}>Completed</button>
        </div>
    </div>
    )
}
