import { put, takeEvery, all } from 'redux-saga/effects'
import {watchChangeContent,watchRequestUserMsg,watchSaveContent} from './contentEditSaga'
import {watchSaveUserinfo} from './userinfoSaga'

export function* helloSaga():any{
    console.log('hello')
}

export default function* rootSaga():any{
    yield all([
        helloSaga(),
        watchChangeContent(),
        watchRequestUserMsg(),
        watchSaveContent(),
        watchSaveUserinfo()
    ])
}