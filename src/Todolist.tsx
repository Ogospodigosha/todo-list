import React, {ChangeEvent, KeyboardEvent, useState} from "react";


export type TodolistProsType ={
    shapka: string
    tasks: Array<InArrayProps>
    removeTask: (taskId: string)=>void
    addTasks: (title:string)=>void
}

 type InArrayProps ={
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist=(props: TodolistProsType )=> {
    const [title, setTitle] = useState("")
    const [filter, setfilter] = useState("all")
    let colander = props.tasks
    if (filter === "active") {
        colander = props.tasks.filter(el => !el.isDone)
    }
    if (filter === "completed") {
        colander = props.tasks.filter(el => el.isDone)
    }

  const filterTask = (filtredValue: string,) => {
      setfilter(filtredValue)
    }
    const addTaskHandler =()=>{
        props.addTasks(title)
        setTitle("")
    }

    const onChangeHandler =(event: ChangeEvent<HTMLInputElement>)=>{
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler =(event: KeyboardEvent<HTMLInputElement>)=>{
        if(event.key === "Enter") {
         return   addTaskHandler()
        }
    }
    return (
    <div>
        <h3>{props.shapka}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {colander.map((el)=>{
                const remomeTaskHandler =()=>{
                    props.removeTask(el.id)
                }
                return(
                <li key={el.id}>
                    <button onClick={remomeTaskHandler}>x</button>
                    <input type="checkbox" checked={el.isDone}/>
                    <span>{el.title}</span>
                </li>)
            })}

        </ul>
        <div>
            <button onClick={()=>{filterTask("all")}}>All</button>
            <button onClick={()=>{filterTask("active")}}>Active</button>
            <button onClick={()=>{filterTask("completed")}}>Completed</button>
        </div>
    </div>
    )
}
