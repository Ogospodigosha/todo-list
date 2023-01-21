import {AppRootState} from "../../app/store";

export const selectIsInitialized = (state: AppRootState) => state.auth.isInitialized
export const selectIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn