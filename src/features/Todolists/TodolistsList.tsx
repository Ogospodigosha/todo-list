import React, {useCallback, useEffect} from "react";
import {AppRootState, useActions, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {
    ChangeTodolistFilterAC,
    FilterValuesType,
    TodolistDomainType
} from "./Todolist/todolists-reducer";
import {TaskStatuses} from "../../api/Todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TaskStateType} from "../../app/AppWithRedux";
import { Navigate } from "react-router-dom";
import {selectIsLoggedIn} from "../Login/selectors";
import {tasksActions, todolistsActions} from "./Todolist";



export const TodolistsList: React.FC = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)
    const {updateTaskTC, removeTaskTC, addTasksTC} = useActions(tasksActions)
    const {addTodolistTC, deleteTodolistTC, fetchTodolistsTC, changeTodolistTitleTC} = useActions(todolistsActions)
    const changetodoListsFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodolistFilterAC({id :todoListID, filter :value}))
    }, [dispatch])
    const removeTask = useCallback((taskId: string, todoListID: string) => {
        removeTaskTC({taskId, todoListID})
    }, [dispatch])

    const addTasks = useCallback((title: string, todoListID: string) => {
        addTasksTC({title, todoListID})
    }, [dispatch])
    const changeIsDone = useCallback((taskId: string, status: TaskStatuses, todoListID: string) => {
        updateTaskTC({taskId, domainModel: {status}, todoListID})
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newValue: string, todoListID: string) => {
        updateTaskTC({taskId :taskId, domainModel: {title: newValue} , todoListID :todoListID})
    }, [dispatch])

    const deleteTodolist = useCallback((todoListID: string) => {
        deleteTodolistTC(todoListID)
    }, [dispatch])

    const changeTodolistTitle = useCallback((todoListID: string, title: string) => {
        changeTodolistTitleTC({todoListID, title})
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        addTodolistTC(title)
    }, [dispatch]);

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        fetchTodolistsTC()
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