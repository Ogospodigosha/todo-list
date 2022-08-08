import React from 'react';
import style from "../todolist.module.css";


type ButtonPropsType = {
    callback: ()=>void
    nickName: string

}

export const Button = (props: ButtonPropsType) => {
    const onClickHandler =()=>{
        props.callback()

    }
    return (
        <button onClick={onClickHandler}>{props.nickName}</button>
    );
};

