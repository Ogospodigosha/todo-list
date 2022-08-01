import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";



export function App() {
    let [tasks1,setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: true },
        { id: v1(), title: "GraphQL", isDone: false },

    ])
 const removeTask =(taskId: string)=>{
        let remove = tasks1.filter((t)=>t.id !== taskId)
       return  setTasks(remove)
    }

const addTasks =(title: string)=>{
       const newTask =  { id: v1(), title: title, isDone: false };
        setTasks([newTask,...tasks1])
       

}

    return (
        <div className="App">
            <Todolist shapka={"What to learn"}  tasks ={tasks1} removeTask={removeTask} addTasks={addTasks} /> //
        </div>
    );
}

export default App;
