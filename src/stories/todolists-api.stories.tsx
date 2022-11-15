import React, {ChangeEvent, useEffect, useState} from "react";
import {TodolistsApi} from "../api/Todolists-api";



export default {
    title: 'API'
}
const settings = {
    withCredentials: true

}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistsApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const onClickHandler = () => {
        TodolistsApi.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'input title'} value={title} onChange={onChangeHandler}/>
        <button onClick={onClickHandler}>create todolist</button>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setTodolistId(e.currentTarget.value)
    }
    const onClickHandler = ()=>{
        TodolistsApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
    <input placeholder={'input todolistId'} onChange={onchangeHandler} value={todolistId}/>
        <button onClick={onClickHandler}>delete todolist</button>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [title, setTitle] = useState('')
    const changeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        TodolistsApi.updateTodolistTitle(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={'input todolistId'} value={todolistId} onChange={changeTodolistId}/>
        <input placeholder={'input title'} value={title} onChange={changeTitle}/>
        <button onClick={onClickHandler}>update todolist title</button>
    </div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onClickHandler = () => {
        TodolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={'input todolistId'} value={todolistId} onChange={onchangeHandler}/>
        <button onClick={onClickHandler}>get tasks</button>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [title, setTitle] = useState('')
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)
    }
    const ChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onClickHandler = ()=> {
        TodolistsApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={'input todolistId'} value={todolistId} onChange={ChangeTodolistId}/>
        <input placeholder={'input title'} value={title} onChange={changeTitle}/>
        <button onClick={onClickHandler}>create task</button>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('1')
    const [description, setDescription] = useState('1')
    const [status, setStatus] = useState(0)
    const [priority, setPriority] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [deadline, setDeadline] = useState('')
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const onClickHandler = () => {
        TodolistsApi.updateTask(todolistId, taskId, {title, description,  status, priority, startDate, deadline})
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'input TaskTitle'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <input placeholder={'input taskDescription'} value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
        <input placeholder={'input status'} type={"number"} value={status} onChange={(e) => setStatus(+e.currentTarget.value)}/>
        <input placeholder={'input priority'} type={"number"} value={priority} onChange={(e) => setPriority(+e.currentTarget.value)}/>
        <input placeholder={'input startDate'}  value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)}/>
        <input placeholder={'input deadline'}  value={deadline} onChange={(e) => setDeadline(e.currentTarget.value)}/>
        <input placeholder={'input todolistId'}  value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'input taskId'}  value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <button onClick={onClickHandler}>update task</button>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const ChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const changeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const onClickHandler = () => {
        TodolistsApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={'input todolistId'} value={todolistId} onChange={ChangeTodolistId}/>
        <input placeholder={'input taskId'} value={taskId} onChange={changeTaskId}/>
        <button onClick={onClickHandler}>delete task</button>
    </div>
}
