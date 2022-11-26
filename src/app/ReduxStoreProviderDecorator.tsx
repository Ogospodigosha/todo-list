import React from "react";
import {Provider} from "react-redux";
import {AppRootState, store} from "./store";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../features/Todolists/Todolist/tasks-reducer";
import {todolistsReducer} from "../features/Todolists/Todolist/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/Todolists-api";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: "", order: 0, entityStatus: "idle"},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: "", order: 0, entityStatus: "idle"}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', description:'', addedDate: "", todoListId: 'todolistId1', completed: true, order: 0, startDate:"", priority:TaskPriorities.Low, deadline:"", status: TaskStatuses.Completed, entityStatus:"idle"},
            {id: v1(), title: 'JS', description:'', addedDate: "", todoListId: 'todolistId1', completed: true, order: 0, startDate:"", priority:TaskPriorities.Low, deadline:"", status: TaskStatuses.Completed, entityStatus:"idle"}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', description:'', addedDate: "", todoListId: 'todolistId2', completed: true, order: 0, startDate:"", priority:TaskPriorities.Low, deadline:"", status: TaskStatuses.Completed, entityStatus:"idle"},
            {id: v1(), title: 'React Book', description:'', addedDate: "", todoListId: 'todolistId2', completed: true, order: 0, startDate:"", priority:TaskPriorities.Low, deadline:"", status: TaskStatuses.Completed, entityStatus:"idle"}
        ]
    },
    app: {status: "idle", error: null}
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: ()=> JSX.Element) => {
 return   <Provider store={storyBookStore}>{storyFn()}</Provider>
}