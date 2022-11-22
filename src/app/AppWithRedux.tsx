import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";
import {TaskType} from "../api/Todolists-api";
import {TodolistsList} from "../features/Todolists/TodolistsList";


export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}


export function AppWithRedux() {
    console.log("AppWithRedux is coled")
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
                <TodolistsList/>
            </Container>
        </div>
    );
}



export default AppWithRedux;
