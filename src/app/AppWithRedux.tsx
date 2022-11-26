import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";
import {TaskType} from "../api/Todolists-api";
import {TodolistsList} from "../features/Todolists/TodolistsList";
import {useSelector} from "react-redux";
import {AppRootState, useAppSelector} from "./store";
import {CustomizedSnackbars} from "../Components/ErrorSnackBar/ErrorSnackBar";
import {RequestStatusType} from "./app-reducer";


export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}


export function AppWithRedux() {
    let appStatus = useSelector<AppRootState,RequestStatusType >(state => state.app.status)
    console.log("AppWithRedux is coled")
    return (
        <div className="App">
            <CustomizedSnackbars/>
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
            {appStatus === "loading" && <LinearProgress color={'secondary'}/>}
            <Container>
                <TodolistsList/>
            </Container>
        </div>
    );
}



export default AppWithRedux;
