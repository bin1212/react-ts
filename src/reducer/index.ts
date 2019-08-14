import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import history from '../commonFnc/history'
import initUser from './test'
import editData from './editMsg'

const rootReducer = combineReducers({
    editData,initUser,router:connectRouter(history)
})
export default rootReducer