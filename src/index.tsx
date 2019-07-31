import React from 'react';
import ReactDom from 'react-dom'
import {Switch, Route ,Redirect} from 'react-router'
import { BrowserRouter,HashRouter,MemoryRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
// import {ConnectedRouter,routerMiddleware} from 'react-router-redux'
import {createStore,applyMiddleware} from 'redux'
import loadable from 'react-loadable';
import {createBrowserHistory} from 'history'

import reducer from './reducer/index'
import {Loading} from './components/common/loading'

//按照路由进行代码分割
const AsyncHome = loadable({
    loader:  () => import('./pages/home/index'),
    loading: Loading
})
const AsyncLogin = loadable({
    loader:  () => import('./pages/login/login'),
    loading: Loading
})

const bHistory = createBrowserHistory()
// const middleware = routerMiddleware(bHistory)
export const store = createStore(
    reducer,
)

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={AsyncHome}/>
                <Route path='/login' component={AsyncLogin}/>
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
    )
