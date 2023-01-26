import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import {useFormik} from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import {AppRootState} from "../../app/store";
import { Navigate } from 'react-router-dom';
import {useActions, useAppDispatch} from "../../utils/useAction";
import {authActions} from "./index";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const {login} = useActions(authActions)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (values.password.length < 4) {
                    errors.password = 'More 3 symbols'
            }
            if (!values.email ) {
                errors.email = 'Email is Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            login(values)
            formik.resetForm()
        },
    });
    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal" onChange={formik.handleChange}
                                   value={formik.values.email} name={'email'} onBlur={formik.handleBlur} />
                        {formik.touched.email && formik.errors.email? <div style={{color: 'red'}}>{formik.errors.email}</div>: null}

                        <TextField type="password" label="Password"
                                   margin="normal" onChange={formik.handleChange} value={formik.values.password}
                                   name={'password'} onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div>: null}
                        <FormControlLabel label={'Remember me'} control={<Checkbox onChange={formik.handleChange}
                                                                                   value={formik.values.rememberMe}
                                                                                   name={'Remember me'}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
};

