import { put, takeEvery, call,delay ,select} from 'redux-saga/effects'
import {USER_INFO_ASYNC,USER_INFO} from '../constants/actionType'
import {userInfo,userAction} from '../reducer/types'
import {getUserinfo} from '../commonFnc/api/api'

interface getUserMsgTypes{
    type:string,
    payload:{
        callBack:any
    }
}

function* saveMsg(data:getUserMsgTypes) {
    const response = yield call(getUserinfo)
    const username = response.resultContent.username
    yield put({type: USER_INFO, data:{count:username,isRequest:true}});
 }

 export function* watchSaveUserinfo():any {
    yield takeEvery(USER_INFO_ASYNC, saveMsg)
  }