
import {addTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {AddTodolistAC, RemoveTodolistAC} from "./todolists-reducer";
import {TaskStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses} from "../api/Todolists-api";

test('correct task should be removed', () => {
    const startState: TaskStateType = {
        "todoListID_1": [
            {id: "1", title: "HTML",  todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "2", title: "CSS", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "3", title: "JS/TS", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.New}
        ],
        "todoListID_2": [
            {id: "1", title: "Book", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "2", title: "Tea", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "3", title: "Beer", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.New}
        ]
    }
    const action = removeTaskAC("todoListID_1", "2")
    const endState = tasksReducer(startState, action)
    expect(endState["todoListID_2"][1].id).toBe("2")
    expect(endState["todoListID_1"].length).toBe(2)
})

test('correct task should be add', () => {
    const startState: TaskStateType = {
        "todoListID_1": [
            {id: "1", title: "HTML", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "2", title: "CSS", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "3", title: "JS/TS", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.New}
        ],
        "todoListID_2": [
            {id: "1", title: "Book", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "2", title: "Tea", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "3", title: "Beer", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.New}
        ]
    }
    const action = addTaskAC("Gosha", "todoListID_2")
    const endState = tasksReducer(startState, action)
    expect(endState["todoListID_2"][0].title).toBe("Gosha")
    expect(endState["todoListID_2"].length).toBe(4)
    expect(endState["todoListID_1"][0].title).toBe("HTML")
})

test('status of specified task should be changed', () => {
    const startState: TaskStateType = {
        "todoListID_1": [
            {id: "1", title: "HTML", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "2", title: "CSS", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "3", title: "JS/TS", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.New}
        ],
        "todoListID_2": [
            {id: "1", title: "Book", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "2", title: "Tea", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "3", title: "Beer", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.New}
        ]
    }
    const action = ChangeTaskStatusAC("3", TaskStatuses.Completed, "todoListID_2")
    const endState = tasksReducer(startState, action)
    expect(endState["todoListID_2"][2].status).toBe(action.status)
    expect(endState["todoListID_2"].every(el=> el.status)).toBeTruthy()
})

test('title of specified task should be changed', () => {
    const startState: TaskStateType = {
        "todoListID_1": [
            {id: "1", title: "HTML", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "2", title: "CSS", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "3", title: "JS/TS", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.New}
        ],
        "todoListID_2": [
            {id: "1", title: "Book", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "2", title: "Tea", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "3", title: "Beer", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.New}
        ]
    }
    const action = ChangeTaskTitleAC( "2", "What i want", "todoListID_1")
    const endState = tasksReducer(startState, action)
    expect(endState["todoListID_1"][1].title).toBe(action.newValue)
    expect(endState["todoListID_2"][1].title).toBe("Tea")
})

test('new property with new array should be added when new todolist is added', () => {
    const startState: TaskStateType = {
        "todoListID_1": [
            {id: "1", title: "HTML", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "2", title: "CSS", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "3", title: "JS/TS", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.New}
        ],
        "todoListID_2": [
            {id: "1", title: "Book", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "2", title: "Tea", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "3", title: "Beer", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.New}
        ]
    }
    const action = AddTodolistAC( "new todolist")
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    const newKey = keys.find(el => el !== "todoListID_1" &&  el !== "todoListID_2" )
    if (!newKey) {
        throw Error ('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistID should be deleted', () => {
    const startState: TaskStateType = {
        "todoListID_1": [
            {id: "1", title: "HTML", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "2", title: "CSS", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "3", title: "JS/TS", todoListId: "todoListID_1", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.New}
        ],
        "todoListID_2": [
            {id: "1", title: "Book", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "2", title: "Tea", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.Completed},
            {id: "3", title: "Beer", todoListId: "todoListID_2", addedDate:'', startDate: "",
                completed:true, deadline:'', description:'', order:0, priority:TaskPriorities.Low, status:TaskStatuses.New}
        ]
    }
    const action = RemoveTodolistAC( 'todoListID_2')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1)
    expect(endState['todoListID_2']).toBeUndefined()
})
