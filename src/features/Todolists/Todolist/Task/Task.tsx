import style from "../../../../todolist.module.css";
import {EditableSpan} from "../../../../Components/EditableSpan/EditableSpan";


import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/Todolists-api";
import {useActions} from "../../../../utils/useAction";
import {tasksActions} from "../../index";


type TaskPropsType = {
    todolistId: string
    el: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {
    const {updateTask, removeTask} = useActions(tasksActions)
    const changeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let NewIsDoneValue = event.currentTarget.checked
        updateTask({
            taskId: props.el.id,
            domainModel: {status: NewIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New},
            todoListID: props.todolistId
        })
    }
    const changeTitleHandler = useCallback((newValue: string) => {
        updateTask({taskId: props.el.id, domainModel: {title: newValue}, todoListID: props.todolistId})
    }, [ props.todolistId, props.el.id])
    const removeTaskHandler = useCallback((id: string) => {
        removeTask({taskId: id, todoListID: props.todolistId})
    }, [props.todolistId, props.el.id])
    return (
        <div key={props.el.id} className={props.el.status === TaskStatuses.Completed ? style.isDone : ""}>
            <Checkbox onChange={changeIsDoneHandler} checked={props.el.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.el.title} onChange={changeTitleHandler} entityStatus={props.el.entityStatus}/>
            <IconButton onClick={() => removeTaskHandler(props.el.id)} disabled={props.el.entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </div>)
})