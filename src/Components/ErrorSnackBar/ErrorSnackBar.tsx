import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {useActions} from "../../utils/useAction";
import {appActions} from "../../app";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const  CustomizedSnackbars = () => {
    const {SetAppError} = useActions(appActions)
    let error = useSelector<AppRootState, null| string>(state => state.app.error)
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "ckickaway") {
            return;
        }
            SetAppError({error: null})
    };

    return (<>
            <Snackbar open={ error !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  <span>{error}</span>
                </Alert>
            </Snackbar>
        </>
    );
}