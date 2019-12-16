// import { delay } from 'redux-saga'
import { put, takeEvery, call,delay ,select} from 'redux-saga/effects'
import {CONTENT_MSG,CHANGE_CONTENT_ASYNC,REQUEST_USER_MSG_ASYNC,SAVE_MSG_ASYNC} from '../constants/actionType'
import {deepData,contentTyps} from '../reducer/types'
import {getUserMsg,saveUserMsg} from '../commonFnc/api/api'
interface editContent{
    type:string,
    payload:{
        data:contentTyps,
        callBack:any
    }
}
interface userMsg{
    type:string,
    payload:{
        callBack:any
    }
}
function* changeContent(data:editContent) {
    const {payload} = data
    yield put({type: CONTENT_MSG, data:payload.data});
    yield delay(1) //emm 第一次用，不清楚怎么解决，暂时用这个
    const cb = payload.callBack;
    if(cb){
        yield call(cb)
    }
    // yield payload.callBack()
 }

 function* requestUserMsg(data:userMsg) {
    const response = yield call(getUserMsg)
    let resultContent = response.resultContent
    yield put({type: CONTENT_MSG, data:JSON.parse(resultContent)});
    // yield payload.callBack()
 }

 function* saveMsg(data:userMsg) {
    // const response = yield call(getUserMsg)
    const {payload} = data
    const msg = yield select(state => state.editData);
    const response = yield call(()=>{return saveUserMsg(JSON.stringify(msg))})
    const cb = payload.callBack;
    if(cb){
        yield call(()=>{cb(response)})
    }
 }

 export function* watchRequestUserMsg():any {
    yield takeEvery(REQUEST_USER_MSG_ASYNC, requestUserMsg)
 }
 export function* watchChangeContent():any {
    yield takeEvery(CHANGE_CONTENT_ASYNC, changeContent)
  }
  export function* watchSaveContent():any {
    yield takeEvery(SAVE_MSG_ASYNC, saveMsg)
  }
