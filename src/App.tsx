import React, {useState} from 'react';
import './App.css';
import {InArrayProps, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType ={
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType ={
    [todoListID_1: string] : Array<InArrayProps>
}
export function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoiLists] = useState<Array<TodolistType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to Buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Tea", isDone: true},
            {id: v1(), title: "Beer", isDone: false}
        ],
    })

    function changetodoListsFilter(value: FilterValuesType, todoListID: string) {
        let todolist = todoLists.find(tl => tl.id === todoListID);
        if (todolist) {
            todolist.filter = value
            setTodoiLists([...todoLists])
        }
    }
    const removeTask = (taskId: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskId)})
    }

    const addTasks = (title: string, todoListID: string) => {
        debugger
        setTasks({...tasks, [todoListID]: [{id: v1(), title: title, isDone: false}, ...tasks[todoListID]]})
    }
    const changeIsDone = (taskId: string, isDoneValue: boolean, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskId ? {...el, isDone: isDoneValue} : el)
        })
    }
    const deleteTodolist= (todoListID: string)=>{
        setTodoiLists(todoLists.filter(el=>el.id !== todoListID))
    }

    const todolistRender = todoLists.map(el => {
        let colander = tasks[el.id]
        let tasksForTodolist = colander
        if (el.filter === "active") {
            tasksForTodolist = tasks[el.id].filter(el => !el.isDone)
        }
        if (el.filter === "completed") {
            tasksForTodolist = tasks[el.id].filter(el => el.isDone)
        }
            return <Todolist title={el.title}
                             id={el.id}
                             tasks={tasksForTodolist}
                             removeTask={removeTask}
                             addTasks={addTasks}
                             changetodoListsFilter={changetodoListsFilter}
                             changeIsDone={changeIsDone}
                             filter={el.filter}
                             deleteTodolist={deleteTodolist}
            />

    })

        return (
            <div className="App">
                <AddItemForm addItem={(title:string)=>{alert(title)}} />
                {todolistRender}
            </div>
        );
    }

export default App;
