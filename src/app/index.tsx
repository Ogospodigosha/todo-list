import * as appSelectors from './selectors'
import {slice} from './app-reducer'
const appActions = {
    ...slice.actions
}
export {
    appSelectors,
    appActions

}