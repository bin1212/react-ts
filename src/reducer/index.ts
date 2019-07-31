import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import history from '../commonFnc/history'
import initTestUser from './test'

const rootReducer = combineReducers({
    initTestUser,routing:connectRouter(history)
})
export default rootReducer