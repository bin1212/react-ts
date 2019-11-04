import {TEST} from '../constants/actionType'
import {initUser,IAction} from './types'

const initData: initUser ={
    id:'1',
    name:''
}
export default function initFunc(state = initData,action:IAction):initUser{
    const {type, data} = action
    switch (type){
        case TEST.TEST:
            return Object.assign({},state,data);
        default:
            return {...state}
    }
}