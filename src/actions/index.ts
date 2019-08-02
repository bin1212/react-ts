import * as types from '../constants/actionType'
import {push} from 'connected-react-router'
export const goto = (name:string) => (push(name))
export const initFnc = (data:any) =>({type:types.TEST.TEST,payload:data})