import { put, takeEvery, all } from 'redux-saga/effects'
import watchChangeContent from './contentEditSaga'

export function* helloSaga():any{
    console.log('hello')
}

export default function* rootSaga():any{
    yield all([
        helloSaga(),
        watchChangeContent()
    ])
}