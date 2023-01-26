import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {SetAppError} from "../../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
});

export const  CustomizedSnackbars = () => {
    let error = useSelector<AppRootState, null| string>(state => state.app.error)
    let dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "ckickaway") {
            return;
        }
            dispatch(SetAppError({error: null}))
    };

    return (<>
            <Snackbar open={ error !== null} autoHideDuration={8000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  <span>{error}</span>
                </Alert>
            </Snackbar>
        </>
    );
}