import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./Components/Button";
import style from "./todolist.module.css";


export type TodolistProsType ={
    title: string
    tasks: Array<InArrayProps>
    removeTask: (taskId: string, todoListID: string)=>void
    addTasks: (title:string, todoListID: string)=>void
    changetodoListsFilter: (value: FilterValuesType, todoListID: string) =>void
    changeIsDone: (taskId: string, isDoneValue: boolean, todoListID: string)=>void
    filter: FilterValuesType
    id: string
}


 export type InArrayProps ={
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist=(props: TodolistProsType )=> {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<null | string>(null)
    const [filterValue, setFilterValue] = useState('all')
    const addTaskHandler = () => {
        if(title.trim() !=="") {
            props.addTasks(title.trim(), props.id)
            setTitle("")
        } else {
            setError("Title is required")
        }

    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)

    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError("")
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }
    // const tsarFooHandler =(filterValue: FilterValuesType)=>{
    //     props.changeFilter(filterValue)
    // }
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
    return (
    <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} className={error ? style.error : ""}/>
            <Button callback={addTaskHandler} nickName={"+"}/>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
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
