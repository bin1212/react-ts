// import { delay } from 'redux-saga'
import { put, takeEvery, call,delay } from 'redux-saga/effects'
import {CONTENT_MSG,CHANGE_CONTENT_ASYNC} from '../constants/actionType'
import {deepData} from '../reducer/types'
interface editContent{
    type:string,
    payload:{
        data:deepData[],
        callBack:any
    }
}
function* changeContent(data:editContent) {
    const {payload} = data
    yield put({type: CONTENT_MSG, data:payload.data});
    yield delay(10) //emm 第一次用，不清楚怎么解决，暂时用这个
    const cb = payload.callBack;
    if(cb){
        yield call(cb)
    }
    
   
    
    // yield payload.callBack()
 }
export default function* watchChangeContent():any {
    yield takeEvery(CHANGE_CONTENT_ASYNC, changeContent)
  }