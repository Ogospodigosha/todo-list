import React from "react";
import {Provider} from "react-redux";
import {AppRootState, store} from "./store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/Todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: "", order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: "", order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', description:'', addedDate: "", todoListId: 'todolistId1', completed: true, order: 0, startDate:"", priority:TaskPriorities.Low, deadline:"", status: TaskStatuses.Completed},
            {id: v1(), title: 'JS', description:'', addedDate: "", todoListId: 'todolistId1', completed: true, order: 0, startDate:"", priority:TaskPriorities.Low, deadline:"", status: TaskStatuses.Completed}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', description:'', addedDate: "", todoListId: 'todolistId2', completed: true, order: 0, startDate:"", priority:TaskPriorities.Low, deadline:"", status: TaskStatuses.Completed},
            {id: v1(), title: 'React Book', description:'', addedDate: "", todoListId: 'todolistId2', completed: true, order: 0, startDate:"", priority:TaskPriorities.Low, deadline:"", status: TaskStatuses.Completed}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (storyFn: ()=> JSX.Element) => {
 return   <Provider store={storyBookStore}>{storyFn()}</Provider>
}