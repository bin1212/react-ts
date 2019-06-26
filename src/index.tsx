import React from 'react';
import ReactDom from 'react-dom'
import {Switch, Route ,Redirect} from 'react-router'
import { BrowserRouter,HashRouter,MemoryRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
// import {createBrowserHistory} from 'history';
import Login from './pages/login/login'
import Hello from './hello'
const HelloHelloC = function(){
    return <Hello name={'/12'} gender={'male'}/>
}

// let history = createBrowserHistory()
ReactDom.render(
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={HelloHelloC}/>
            <Route path='/login' component={Login}/>
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
    )
