import React from 'react';
import ReactDom from 'react-dom'
import {Switch, Route ,Redirect} from 'react-router'
import { BrowserRouter,HashRouter,MemoryRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter,routerMiddleware} from 'connected-react-router'
import {createStore,applyMiddleware} from 'redux'
import loadable from 'react-loadable';
import createSagaMiddleware from 'redux-saga'
import history from './commonFnc/history'

import reducer from './reducer/index'
import {Loading} from './components/common/loading'
import rootSaga from './sagas/index'

//按照路由进行代码分割
const AsyncHome = loadable({
    loader:  () => import('./pages/home/index'),
    loading: Loading
})
const AsyncLogin = loadable({
    loader:  () => import('./pages/login/login'),
    loading: Loading
})
const AsyncTest = loadable({
    loader:  () => import('./pages/test/test'),
    loading: Loading
})


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
            <Switch>
                <Route path='/' exact component={AsyncHome}/>
                <Route path='/login' component={AsyncLogin}/>
                <Route path='/edit' component={AsyncTest}/>
                <Redirect to="/" />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
    )
