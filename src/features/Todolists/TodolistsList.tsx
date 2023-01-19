import React, {useCallback, useEffect} from "react";
import {AppRootState, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {
    addTodolistTC,
    ChangeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    TodolistDomainType
} from "./Todolist/todolists-reducer";
import {addTasksTC, removeTaskTC, updateTaskTC} from "./Todolist/tasks-reducer";
import {TaskStatuses} from "../../api/Todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TaskStateType} from "../../app/AppWithRedux";
import { Navigate } from "react-router-dom";

export const TodolistsList: React.FC = () => {
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)

    const changetodoListsFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodolistFilterAC({id :todoListID, filter :value}))
    }, [dispatch])
    const removeTask = useCallback((taskId: string, todoListID: string) => {
        const thunk = removeTaskTC(taskId, todoListID)
        dispatch(thunk);
    }, [dispatch])

    const addTasks = useCallback((title: string, todoListID: string) => {
        dispatch(addTasksTC({title, todoListID}))
    }, [dispatch])
    const changeIsDone = useCallback((taskId: string, status: TaskStatuses, todoListID: string) => {
        dispatch(updateTaskTC(taskId, {status: status}, todoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newValue: string, todoListID: string) => {
        dispatch(updateTaskTC(taskId, {title: newValue}, todoListID))
    }, [dispatch])

    const deleteTodolist = useCallback((todoListID: string) => {
        dispatch(deleteTodolistTC(todoListID))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todoListID: string, title: string) => {
        dispatch(changeTodolistTitleTC(todoListID, title))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch]);

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])
    if (!isLoggedIn) {
        debugger
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todoLists.map(el => {

                    let tasksForTodolist = tasks[el.id]

                    return <Grid item key={el.id}>
                        <Paper style={{padding: "10px"}}>
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
                                      entityStatus = {el.entityStatus}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>

}