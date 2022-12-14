import React, {ChangeEvent} from "react";
import  {useState, KeyboardEvent} from 'react';
import {ControlPoint} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";
import {RequestStatusType} from "../../app/app-reducer";


type addItemFormPropsType = {
    addItem: (title: string) => void
    entityStatus?: RequestStatusType

}
export const AddItemForm = React.memo((props: addItemFormPropsType) => {
    console.log("AddItemForm is called")
    const [title, setTitle] = useState("")
    const [error, setError] = useState<null | string>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
       if (error !== null) {
           setError(null)
       }
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if (error !== null) {
            setError(null)
        }
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }

    }
    return <div>
        {/*<input value={title}*/}
        {/*       onChange={onChangeHandler}*/}
        {/*       onKeyPress={onKeyPressHandler}*/}
        {/*       className={error ? style.error : ""}*/}
        {/*/>*/}
        <TextField value={title}
                   variant={"outlined"}
                   onChange={onChangeHandler}
                   label={"type value"}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   helperText={error}
                   disabled={props.entityStatus === "loading"}
        />

        <IconButton  color={"primary"} onClick={addTaskHandler} disabled={props.entityStatus === "loading"}>
            <ControlPoint/>
        </IconButton>
        {/*{error && <div className={style.errorMessage}>{error}</div>}*/}
    </div>
})