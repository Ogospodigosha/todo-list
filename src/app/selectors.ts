import {AppRootState} from "./store";

export const selectAppStatus = (state: AppRootState) => state.app.status