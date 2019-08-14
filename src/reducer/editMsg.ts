import {CONTENT_MSG} from '../constants/actionType'
import {IAction} from './types'
// interface I
const initData:any = [
    {
        id:'1',
        content:'111',
        children:[
            {
                id:'11',
                content:'aaa',
                children: []
            }
        ]
    },
    {
        id:'2',
        content:'222',
        children:[
            {
                id:'21',
                content:'bbb',
                children: []
            },
            {
                id:'22',
                content:'bbb',
                children: []
            }
        ]
    }
]
export default function editData(state = initData,action:IAction){
    const {type, payload} = action
    switch (type) {
        case CONTENT_MSG:
            return payload;
        default:
            return [...state]
    }
}