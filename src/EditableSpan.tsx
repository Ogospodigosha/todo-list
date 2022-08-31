import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (NewValue:string)=> void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")
    const activateEditMode = ()=>{
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = ()=>{
        setEditMode(false)
        props.onChange(title);
    }
    const onchangeHandler = (event: ChangeEvent<HTMLInputElement>)=>{
        setTitle(event.currentTarget.value)
    }
    return editMode
        ? <input value={title} onChange={onchangeHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}