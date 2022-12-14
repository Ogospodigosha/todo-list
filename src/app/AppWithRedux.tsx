import React, { useEffect } from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";
import {TaskType} from "../api/Todolists-api";
import {TodolistsList} from "../features/Todolists/TodolistsList";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch, useAppSelector} from "./store";
import {CustomizedSnackbars} from "../Components/ErrorSnackBar/ErrorSnackBar";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {Navigate, Route, Routes } from 'react-router-dom';
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/authReducer";


export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}


export function AppWithRedux() {
    const dispatch= useAppDispatch()
    let appStatus = useSelector<AppRootState,RequestStatusType >(state => state.app.status)
    let isInitialized = useSelector<AppRootState, boolean>(state => state.auth.isInitialized)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    console.log("AppWithRedux is coled")
    useEffect(()=>{
        dispatch(initializeAppTC())
    },[])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    const logout = () =>{
        dispatch(logoutTC())
    }
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
                    {isLoggedIn && <Button color="inherit" onClick={logout}>logout</Button>}
                </Toolbar>
            </AppBar>
            {appStatus === "loading" && <LinearProgress color={'secondary'}/>}
            <Container>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>

                    <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}



export default AppWithRedux;
