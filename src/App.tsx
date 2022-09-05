import React, {useState} from 'react';
import './App.css';
import {InArrayProps, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {Button} from "@material-ui/core";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [todoListID_1: string]: Array<InArrayProps>
}

export function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
 const [todoLists, setTodoiLists] = useState<Array<TodolistType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to Buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
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
        let todolist = todoLists.find(tl => tl.id === todoListID);
        if (todolist) {
            todolist.filter = value
            setTodoiLists([...todoLists])
        }
    }

    const removeTask = (taskId: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskId)})
    }

    const addTasks = (title: string, todoListID: string) => {
        debugger
        setTasks({...tasks, [todoListID]: [{id: v1(), title: title, isDone: false}, ...tasks[todoListID]]})
    }
    const changeIsDone = (taskId: string, isDoneValue: boolean, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskId ? {...el, isDone: isDoneValue} : el)
        })
    }
    //
    const deleteTodolist = (todoListID: string) => {
        setTodoiLists(todoLists.filter(el => el.id !== todoListID))
    }
    const changeTaskTitle = (taskId: string, newValue: string, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskId ? {...el, title: newValue} : el)
        })
    }
    const changeTodolistTitle = (todoListID: string, title: string) => {
        setTodoiLists([...todoLists.map(el => el.id === todoListID ? {...el, title: title} : el)])
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
        let todolist: TodolistType = {id: v1(), title: title, filter: "all"}
        setTodoiLists([...todoLists, todolist])
        setTasks({...tasks, [todolist.id]: []})

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

export default App;
