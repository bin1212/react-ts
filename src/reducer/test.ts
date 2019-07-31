import {TEST} from '../constants/actionType'
import {initTestUser,IAction} from './types'

const initData: initTestUser ={
    id:'1',
    name:''
}
export default function initTestUser(state = initData,action:IAction):initTestUser{
    const {type, payload} = action
    console.log(type, payload,TEST)
    switch (type){
        case TEST.TEST:
            console.log(11,Object.assign(state,payload))
            return Object.assign(state,payload);
        default:
            return {...state}
    }
}