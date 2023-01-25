import React, {useEffect} from "react";
import {AppRootState, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {
    TodolistDomainType
} from "./todolists-reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TaskStateType} from "../../app/AppWithRedux";
import { Navigate } from "react-router-dom";
import {selectIsLoggedIn} from "../Login/selectors";
import {useActions} from "../../utils/useAction";
import {todolistsActions} from "./index";



export const TodolistsList: React.FC = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)
    const {fetchTodolists} = useActions(todolistsActions)
    const dispatch = useAppDispatch()

    const addTodolistCallback = async (title: string) => {
        const thunk = todolistsActions.addTodolist(title)
        const resultAction = await dispatch(thunk)
        if (todolistsActions.addTodolist.rejected.match(resultAction)) {
            const errorMessage = resultAction.payload
            console.log(resultAction)
            if (errorMessage) {
                throw new Error(errorMessage)
            }
        }

    }

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
       fetchTodolists()
    }, [])
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }


    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolistCallback}/>
        </Grid>
        <Grid container spacing={3} style={{flexWrap:'nowrap', overflowX: 'scroll'}}>
            {
                todoLists.map(el => {

                    let tasksForTodolist = tasks[el.id]

                    return <Grid item key={el.id}>
                        <Paper style={{padding: "10px", width: '280px'}}>
                            <Todolist key={el.id}
                                      tasks={tasksForTodolist}
                                      todolist={el}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>

}