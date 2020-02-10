import React from 'react';
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter,routerMiddleware} from 'connected-react-router'
import {createStore,applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import history from './commonFnc/history'

import reducer from './reducer/index'
import rootSaga from './sagas/index'
import './assets/css/base.less'
import RouterConfig from './route/index'
import AuthRoute from './route/authRoute/AuthRoute'
import LayoutMenu from './components/layout'


const middleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
    reducer,
    applyMiddleware(middleware,sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <LayoutMenu history={history}>
                <AuthRoute/>
            </LayoutMenu>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
    )
