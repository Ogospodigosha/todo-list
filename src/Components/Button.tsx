import React from 'react';


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

