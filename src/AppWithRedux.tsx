import React, {useCallback, useEffect} from 'react';
import './App.css';
import { Todolist} from "./Todolist";
import {AddItemForm} from "./Components/AddItemForm";



import {
    AddTodolistAC,
    ChangeTodolistAC,
    ChangeTodolistFilterAC, fetchTodolistsTC,  FilterValuesType, GetTodolistsAC,
    RemoveTodolistAC, TodolistDomainType,

} from "./state/todolists-reducer";
import {
    addTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    removeTaskAC,
    RemoveTaskActionType,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";
import {TaskStatuses, TaskType, TodolistsApi} from "./api/Todolists-api";
//


export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}


export function AppWithRedux() {


    console.log("AppWithRedux is coled")
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)

    const changetodoListsFilter= useCallback((value: FilterValuesType, todoListID: string) =>{
        dispatch(ChangeTodolistFilterAC(todoListID, value))
    },[dispatch])

    const removeTask = useCallback( (taskId: string, todoListID: string) => {
        dispatch(removeTaskAC(todoListID, taskId));

    }, [dispatch])

    const addTasks = useCallback( (title: string, todoListID: string) => {
        dispatch(addTaskAC(title,todoListID))
    }, [dispatch])
    const changeIsDone = useCallback( (taskId: string, status: TaskStatuses, todoListID: string) => {
        dispatch(ChangeTaskStatusAC(taskId, status, todoListID))
    }, [dispatch])

    const deleteTodolist = useCallback( (todoListID: string) => {
        dispatch(RemoveTodolistAC(todoListID))
    }, [dispatch])
    const changeTaskTitle = useCallback( (taskId: string, newValue: string, todoListID: string) => {
        dispatch(ChangeTaskTitleAC(taskId, newValue, todoListID))
    }, [dispatch])
    const changeTodolistTitle =  useCallback( (todoListID: string, title: string) => {
        dispatch(ChangeTodolistAC(todoListID, title))
    }, [ dispatch])

    const addTodolist = useCallback( (title: string) => {
        dispatch(AddTodolistAC(title))
    }, [dispatch ]);

   useEffect(()=>{
       dispatch(fetchTodolistsTC())
   },[])

    const todolistRender = todoLists.map(el => {

        let tasksForTodolist = tasks[el.id]

        return <Grid item key={el.id}>
            <Paper style ={{padding: "10px"}}>
                <Todolist key={el.id}
                    title={el.title}
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

export default AppWithRedux;
