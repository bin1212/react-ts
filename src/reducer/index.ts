import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import history from '../commonFnc/history'
import initUser from './test'

const rootReducer = combineReducers({
    initUser,router:connectRouter(history)
})
export default rootReducer