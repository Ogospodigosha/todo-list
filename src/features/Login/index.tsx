import * as authSelectors from './selectors'
import {Login} from "./Login";
import {slice as authSlice} from "./authReducer"
import {asyncAuthActions} from './authReducer'

const authActions = {
    ...asyncAuthActions
}

const authReducer = authSlice.reducer
export {
    authSelectors,
    Login,
    authReducer,
    authActions
}