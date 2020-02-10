import * as types from '../constants/actionType'
import {push} from 'connected-react-router'
import {deepData,userInfo} from '../reducer/types'

export const goto = (name:string) => (push(name))
export const initFnc = (data:deepData) =>({type:types.TEST.TEST,payload:data})
export const editContentAsync = (data:deepData) =>({type:types.CHANGE_CONTENT_ASYNC,payload:data})
export const editContent = (data:deepData) =>({type:types.CONTENT_MSG,data:data})
export const requestUserMsg = (data:Function) =>({type:types.REQUEST_USER_MSG_ASYNC,payload:data})
export const saveUserMsg = (data:Function) =>({type:types.SAVE_MSG_ASYNC,payload:data})
export const saveUserinfo = (data:userInfo) =>({type:types.USER_INFO_ASYNC,payload:data})


