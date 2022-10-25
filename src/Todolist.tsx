import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


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

export const Todolist=React.memo( (props: TodolistProsType )=> {
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
        tasksForTodolist = props.tasks.filter(el => !el.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(el => el.isDone)
    }

    return (
    <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton  onClick={deleteTaskHendler}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <div>
            {props.tasks.map((el)=><Task key ={el.id} todolistId={props.id} changeIsDone={props.changeIsDone} changeTaskTitle={props.changeTaskTitle}  removeTask={props.removeTask} el={el}/>)}

        </div>
        <div>
            <Button variant={props.filter==="all" ? "contained" : "text"}  onClick={()=>onAllClickHandler(props.id)}>All</Button>
            <Button color={"primary"} variant={props.filter==="active" ? "contained" : "text"} onClick={()=>onActiveClickHandler(props.id)}>Active</Button>
            <Button color={"secondary"} variant={props.filter==="completed" ? "contained" : "text"} onClick={()=>onCompletedClickHandler(props.id)}>Completed</Button>
        </div>
    </div>
    )
})
