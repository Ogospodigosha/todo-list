import {TaskStateType} from "../../../app/AppWithRedux";
import {TaskStatuses} from "../../../api/Todolists-api";
import {createSlice} from "@reduxjs/toolkit";
import {addTasksTC, fetchTaskTC, removeTaskTC, updateTaskTC} from "./tasks-actions";
import {addTodolistTC, deleteTodolistTC, fetchTodolistsTC} from "./todolists-actions";


const initialState: TaskStateType = {}
const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(addTodolistTC.fulfilled, (state, action)=>{
            state[action.payload.todolist.id] = []
        });
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action)=>{
            action.payload.todolists.forEach(el => {
                            state[el.id] = []
                        })
        });
        builder.addCase(deleteTodolistTC.fulfilled, (state, action)=>{
            delete state[action.payload.todolistId]
        });
        builder.addCase(fetchTaskTC.fulfilled, (state, action)=>{
           state[action.payload.todoListId] = action.payload.tasks
        });
        builder.addCase(addTasksTC.fulfilled, (state, action)=>{
            if (action.payload) {
                state[action.payload.todolistID].unshift(action.payload.task)
            }
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action)=>{
            const index = state[action.payload.todolistID].findIndex(el => el.id === action.payload.taskID)
            if (index > -1) {
                state[action.payload.todolistID].splice(index, 1)
            }
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action)=>{
            if (action.payload) {
                const index = state[action.payload.todoListID].findIndex(el => el.id === action.payload?.taskId)
                if (index > -1) {
                    state[action.payload.todoListID][index] = {...state[action.payload.todoListID][index], ...action.payload.domainModel}
                }
            }
        });
    }

})

export const tasksReducer = slice.reducer

export type UpdateModeltype = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: number
    startDate?: string
    deadline?: string
}

