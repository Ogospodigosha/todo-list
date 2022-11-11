import React, {useEffect, useState} from "react";
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
    useEffect(() => {
        TodolistsApi.createTodolist('NEWWW TODOLIST')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistsApi.deleteTodolist("bdb7144e-b7df-455d-8bd9-35b39a404d22")
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistsApi.updateTodolistTitle("8b245cc3-fd6e-48be-8cba-67381ebcfd0d", 'Goshaaaaa')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const getTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       TodolistsApi.getTasks('8b245cc3-fd6e-48be-8cba-67381ebcfd0d')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       TodolistsApi.createTask('8b245cc3-fd6e-48be-8cba-67381ebcfd0d', 'GOSHA TASK')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       TodolistsApi.updateTask('8b245cc3-fd6e-48be-8cba-67381ebcfd0d', '3309e4bb-f9c5-4789-8efe-6780335eebd2', {title: 'NEW GOSHA TASKK',
           description: "",
           completed: true,
           status: 0,
           priority: 1,
           startDate: "",
           deadline: ""})
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       TodolistsApi.deleteTask('8b245cc3-fd6e-48be-8cba-67381ebcfd0d', '3309e4bb-f9c5-4789-8efe-6780335eebd2' )
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
