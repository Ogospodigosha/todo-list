
import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";
import {RequestStatusType} from "../../app/app-reducer";

type EditableSpanPropsType = {
    title: string
    onChange: (NewValue:string, editMode: boolean)=> void
    entityStatus?: RequestStatusType
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log("EditableSpan")
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")
    const activateEditMode = ()=>{
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = ()=>{
        setEditMode(false)
        props.onChange(title, editMode);
    }
    const onchangeHandler = (event: ChangeEvent<HTMLInputElement>)=>{
        setTitle(event.currentTarget.value)
    }
    return editMode && props.entityStatus !== "loading"
        ?   <TextField value={title} onChange={onchangeHandler} onBlur={activateViewMode} autoFocus />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
});