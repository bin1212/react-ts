import {TEST} from '../constants/actionType'
import {initUser,IAction} from './types'

const initData: initUser ={
    id:'1',
    name:''
}
export default function initFunc(state = initData,action:IAction):initUser{
    const {type, payload} = action
    switch (type){
        case TEST.TEST:
            return Object.assign({},state,payload);
        default:
            return {...state}
    }
}