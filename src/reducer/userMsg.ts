import {USER_INFO} from '../constants/actionType'
import {userInfo,userAction} from './types'

const initData:userInfo = {
    count:'',
    isRequest:false
}
export default function userInfo(state = initData,action:userAction){
    const {type, data} = action
    switch (type) {
        case USER_INFO:
            return data
        default:
            return {...state}
    }
}