import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./Components/Button";


export type TodolistProsType ={
    title: string
    tasks: Array<InArrayProps>
    removeTask: (taskId: string)=>void
    addTasks: (title:string)=>void
    changeFilter: (value: FilterValuesType) =>void
}

 type InArrayProps ={
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist=(props: TodolistProsType )=> {
    const [title, setTitle] = useState("")

    const addTaskHandler = () => {
        props.addTasks(title)
        setTitle("")
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }
    const tsarFooHandler =(filterValue: FilterValuesType)=>{
        props.changeFilter(filterValue)
    }
    const remomeTaskHandler =(id: string)=>{
       return props.removeTask(id)
    }
    return (
    <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            {/*<button onClick={addTaskHandler}>+</button>*/}
            <Button callback={addTaskHandler} nickName={"+"}/>
        </div>
        <ul>
            {props.tasks.map((el)=>{
                // const remomeTaskHandler =()=>{
                //     props.removeTask(el.id)
                // }
                return(
                <li key={el.id}>
                    {/*<button onClick={()=>remomeTaskHandler(el.id)}>x</button>*/}
                    <Button callback={()=>remomeTaskHandler(el.id)} nickName={"x"}/>
                    <input type="checkbox" checked={el.isDone}/>
                    <span>{el.title}</span>
                </li>)
            })}

        </ul>
        <div>
            <Button callback={()=>tsarFooHandler("all")} nickName={"All"}/>
            <Button callback={()=>tsarFooHandler("active")} nickName={"Active"}/>
            <Button callback={()=>tsarFooHandler("completed")} nickName={"Completed"}/>
            {/*<button onClick={()=>tsarFooHandler("all")}>All</button>*/}
            {/*<button onClick={()=>tsarFooHandler("active")}>Active</button>*/}
            {/*<button onClick={()=>tsarFooHandler("completed")}>Completed</button>*/}
        </div>
    </div>
    )
}
