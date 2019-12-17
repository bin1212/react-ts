import {CONTENT_MSG,CHANGE_TITLE} from '../constants/actionType'
import {IAction,deepData,contentTyps} from './types'

const initData:contentTyps = {
    title:'',
    contentDetail:[
        {
            id:'1',
            content:'',
            children:[]
        },
    ]
}
export default function editData(state = initData,action:IAction){
    const {type, data} = action
    switch (type) {
        case CONTENT_MSG:
            return data
        // case CHANGE_TITLE:
        //     return {
        //         title:data,
        //         contentDetail:[...initData.contentDetail]
        //     };
        default:
            return {...state}
    }
}