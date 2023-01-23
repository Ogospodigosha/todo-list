
import {tasksReducer} from "./tasks-reducer";
import {TaskStateType} from "../../app/AppWithRedux";
import {TaskPriorities, TaskStatuses} from "../../api/Todolists-api";
import {v1} from "uuid";
import {asyncActions as TodolistsActions} from './todolists-reducer'
import {asyncActions as TasksActions} from './tasks-reducer'
let startState: TaskStateType = {}
beforeEach(()=>{
    startState = {
        "todoListID_1": [
            {id: "1", title: "HTML",  todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed, entityStatus:"idle"},
            {id: "2", title: "CSS", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed, entityStatus:"idle"},
            {id: "3", title: "JS/TS", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.New, entityStatus:"idle"}
        ],
        "todoListID_2": [
            {id: "1", title: "Book", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed, entityStatus:"idle"},
            {id: "2", title: "Tea", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed, entityStatus:"idle"},
            {id: "3", title: "Beer", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.New, entityStatus:"idle"}
        ]
    }
})

test('correct task should be removed', () => {
    const action = TasksActions.removeTask.fulfilled({todolistID :"todoListID_1",taskID: "2"}, '', {todoListID :"todoListID_1",taskId: "2"})
    const endState = tasksReducer(startState, action)
    expect(endState["todoListID_2"][1].id).toBe("2")
    expect(endState["todoListID_1"].length).toBe(2)
})

test('correct task should be add', () => {

    let task  = {description: "", title: 'Gosha', completed: true, status: TaskStatuses.New,
            priority: 0, startDate: "", deadline: "", id: v1(), todoListId: v1(), order: 0, addedDate: "", entityStatus:"idle"}as const
    const action =TasksActions.addTask.fulfilled({title: 'Gosha', todolistID: "todoListID_2", task: task}, '', {title:'Gosha', todoListID:"todoListID_1" })
    const endState = tasksReducer(startState, action)
    expect(endState["todoListID_2"][0].title).toBe("Gosha")
    expect(endState["todoListID_2"].length).toBe(4)
    expect(endState["todoListID_1"][0].title).toBe("HTML")
})

test('status of specified task should be changed', () => {
    const action = TasksActions.updateTask.fulfilled({taskId :"3", domainModel: {status:TaskStatuses.Completed}, todoListID :"todoListID_2"}, '',{taskId :"3", domainModel: {status:TaskStatuses.Completed }, todoListID :"todoListID_2"} )
    const endState = tasksReducer(startState, action)
    expect(endState["todoListID_2"][2].status).toBe(2)
    expect(endState["todoListID_2"].every(el=> el.status)).toBeTruthy()
})

test('title of specified task should be changed', () => {
    const action = TasksActions.updateTask.fulfilled({ taskId:"2", domainModel: {title:"What i want"}, todoListID: "todoListID_1"}, '', { taskId:"2", domainModel: {title:"What i want"}, todoListID: "todoListID_1"})
    const endState = tasksReducer(startState, action)
    expect(endState["todoListID_1"][1].title).toBe("What i want")
    expect(endState["todoListID_2"][1].title).toBe("Tea")
})

test('new property with new array should be added when new todolist is added', () => {
    let todolist = {id: "todoListID_3", title: "new todolist", addedDate: "", order: 0}
    const action = TodolistsActions.addTodolist.fulfilled({todolist :todolist}, '', todolist.title)
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    const newKey = keys.find(el => el !== "todoListID_1" &&  el !== "todoListID_2" )
    if (!newKey) {
        throw Error ('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
    expect(newKey).toBe("todoListID_3")
})

test('property with todolistID should be deleted', () => {
    const action = TodolistsActions.removeTodolist.fulfilled({todolistId :'todoListID_2'}, '','todoListID_2' )
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1)
    expect(endState['todoListID_2']).toBeUndefined()
})

test('tasks should be added for todolist', () => {
    const action = TasksActions.fetchTask.fulfilled({todoListId: "todoListID_1", tasks: startState["todoListID_1"]}, '',  "todoListID_1")
    const endState = tasksReducer({
        "todoListID_1": [],
        "todoListID_2": []
    }, action)
    expect(endState["todoListID_2"].length).toBe(0)
    expect(endState["todoListID_1"].length).toBe(3)
})