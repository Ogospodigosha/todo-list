import * as authSelectors from './selectors'
import {Login} from "./Login";
import {slice as authSlice} from "./authReducer"

const authReducer = authSlice.reducer
export {
    authSelectors,
    Login,
    authReducer
}