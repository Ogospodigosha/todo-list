import React, {useReducer, useState} from 'react';
import './App.css';
import {InArrayProps, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {Button} from "@material-ui/core";
import {
    AddTodolistAC,
    ChangeTodolistAC,
    ChangeTodolistFilterAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    removeTaskAC,
    RemoveTaskActionType,
    tasksReducer
} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [todoListID: string]: Array<InArrayProps>
}

export function AppWithReducers() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,[
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to Buy", filter: "all"}
    ])
    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Tea", isDone: true},
            {id: v1(), title: "Beer", isDone: false}
        ],
    })

    function changetodoListsFilter(value: FilterValuesType, todoListID: string) {
       dispatchToTodolistsReducer(ChangeTodolistFilterAC(todoListID, value))
    }

    const removeTask = (taskId: string, todoListID: string) => {
        const action= removeTaskAC(taskId, todoListID);
        dispatchToTasksReducer(action)
    }

    const addTasks = (title: string, todoListID: string) => {
        dispatchToTasksReducer(addTaskAC(title,todoListID))
    }
    const changeIsDone = (taskId: string, isDoneValue: boolean, todoListID: string) => {
        dispatchToTasksReducer(ChangeTaskStatusAC(taskId, isDoneValue, todoListID))
    }
    //
    const deleteTodolist = (todoListID: string) => {
        dispatchToTodolistsReducer(RemoveTodolistAC(todoListID))
        dispatchToTasksReducer(RemoveTodolistAC(todoListID))
    }
    const changeTaskTitle = (taskId: string, newValue: string, todoListID: string) => {
       dispatchToTasksReducer(ChangeTaskTitleAC(taskId, newValue, todoListID))
    }
    const changeTodolistTitle = (todoListID: string, title: string) => {
       dispatchToTodolistsReducer(ChangeTodolistAC(todoListID, title))
    }
    const todolistRender = todoLists.map(el => {
        let colander = tasks[el.id]
        let tasksForTodolist = colander
        if (el.filter === "active") {
            tasksForTodolist = tasks[el.id].filter(el => !el.isDone)
        }
        if (el.filter === "completed") {
            tasksForTodolist = tasks[el.id].filter(el => el.isDone)
        }
        return <Grid item>
            <Paper style ={{padding: "10px"}}>
                <Todolist title={el.title}
                          id={el.id}
                          tasks={tasksForTodolist}
                          removeTask={removeTask}
                          addTasks={addTasks}
                          changetodoListsFilter={changetodoListsFilter}
                          changeIsDone={changeIsDone}
                          filter={el.filter}
                          deleteTodolist={deleteTodolist}
                          changeTaskTitle={changeTaskTitle}
                          changeTodolistTitle={changeTodolistTitle}
                />
            </Paper>
        </Grid>
    })

    const addTodolist = (title: string) => {
        dispatchToTodolistsReducer(AddTodolistAC(title))
    }
    return (
        <div className="App">
            <AppBar position="static" color={"transparent"}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolistRender}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
