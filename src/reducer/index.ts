import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import history from '../commonFnc/history'
import initUser from './test'
import editData from './editMsg'
import userInfo from './userMsg'

const rootReducer = combineReducers({
    editData,initUser,userInfo,router:connectRouter(history)
})
export default rootReducer