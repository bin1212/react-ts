import React from 'react';
import ReactDom from 'react-dom'
import {Switch, Route ,Redirect} from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
// import {createBrowserHistory} from 'history';
import Login from './pages/login/login'
import Hello from './hello'


// let history = createBrowserHistory()
ReactDom.render(
    <BrowserRouter basename=''>
        <Switch>
            <Route path='/' exact component={Hello}/>
            <Route path='/login' component={Login}/>
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
    )
