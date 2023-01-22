import React, {useEffect} from "react";
import {AppRootState, useActions} from "../../app/store";
import {useSelector} from "react-redux";
import {
    TodolistDomainType
} from "./Todolist/todolists-reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TaskStateType} from "../../app/AppWithRedux";
import { Navigate } from "react-router-dom";
import {selectIsLoggedIn} from "../Login/selectors";
import {todolistsActions} from "./Todolist";


export const TodolistsList: React.FC = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)
    const {addTodolist, fetchTodolists} = useActions(todolistsActions)



    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        fetchTodolists()
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
                                      filter={el.filter}
                                      entityStatus = {el.entityStatus}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>

}