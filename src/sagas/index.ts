import { put, takeEvery, all } from 'redux-saga/effects'
import {watchChangeContent,watchRequestUserMsg,watchSaveContent} from './contentEditSaga'

export function* helloSaga():any{
    console.log('hello')
}

export default function* rootSaga():any{
    yield all([
        helloSaga(),
        watchChangeContent(),
        watchRequestUserMsg(),
        watchSaveContent()
    ])
}