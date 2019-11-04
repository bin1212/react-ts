import * as types from '../constants/actionType'
import {push} from 'connected-react-router'
import {deepData} from '../reducer/types'

export const goto = (name:string) => (push(name))
export const initFnc = (data:deepData) =>({type:types.TEST.TEST,payload:data})
export const editContentAsync = (data:deepData) =>({type:types.CHANGE_CONTENT_ASYNC,payload:data})
export const editContent = (data:deepData) =>({type:types.CONTENT_MSG,data:data})