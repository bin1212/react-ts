import React from 'react';
import {Switch, Route ,Redirect} from 'react-router'
import loadable from 'react-loadable';
import {Loading} from '../components/common/loading'
import AuthRoute from './authRoute/AuthRoute'


//按照路由进行代码分割
const AsyncIndex = loadable({
    loader:  () => import('../pages/index/index'),
    loading: Loading
})
const AsyncHome = loadable({
    loader:  () => import('../pages/home/index'),
    loading: Loading
})
const AsyncLogin = loadable({
    loader:  () => import('../pages/login/login'),
    loading: Loading
})
const AsyncTest = loadable({
    loader:  () => import('../pages/test/test'),
    loading: Loading
})
const AsyncNotFound = loadable({
    loader:  () => import('../pages/notFound/index'),
    loading: Loading
})
export const authPath = [
    {path:'/content',component:AsyncHome,auth:''}
]
const CommonRouter = ()=>(
    <Switch>
        {/* <Route path='/' exact component={AsyncHome}/> */}
        {/* <Route path='/home' exact component={AsyncHome}/> */}
        {/* <Route path='/index' exact component={AsyncIndex}/> */}
        <AuthRoute/>
    </Switch>
)
const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb:any) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb:any) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};


export default CommonRouter