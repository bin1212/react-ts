import {CONTENT_MSG} from '../constants/actionType'
import {IAction,deepData} from './types'
// interface I
const initData:deepData[] = [
    {
        id:'1',
        content:'',
        children:[]
    },
    {
        id:'2',
        content:'',
        children:[]
    }
]
export default function editData(state = initData,action:IAction){
    const {type, data} = action
    switch (type) {
        case CONTENT_MSG:
            return data;
        default:
            return [...state]
    }
}