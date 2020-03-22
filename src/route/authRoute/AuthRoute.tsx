import React, {Component} from 'react'
import {Switch, Route ,Redirect} from 'react-router'
import loadable from 'react-loadable';
import {Loading} from '../../components/common/loading'

const AsyncIndex = loadable({
    loader:  () => import('../../pages/index/index'),
    loading: Loading
})
const AsyncHome = loadable({
    loader:  () => import('../../pages/home/index'),
    loading: Loading
})
const AsyncLogin = loadable({
    loader:  () => import('../../pages/login/login'),
    loading: Loading
})
const AsyncTest = loadable({
    loader:  () => import('../../pages/test/test'),
    loading: Loading
})
const AsyncNotFound = loadable({
    loader:  () => import('../../pages/notFound/index'),
    loading: Loading
})
const authPath = [
    {path:'/content',component:AsyncHome,auth:true},
    {path:'/login',component:AsyncLogin,auth:false},
    {path:'/index',component:AsyncIndex,auth:false},
]

class AuthRoute extends Component{
    render(){
       return (
           <Switch>
               {authPath.map((item,index)=>{
                   if(!item.auth){
                       return  <Route key={index} path={item.path} exact component={item.component}/>
                   }
                   else{
                       return (
                        <Route key={index} path={item.path} exact component={item.component}/>
                    )
                   }
               })}
               {/* <Route path='/login' component={AsyncLogin}/> */}
                <Route path='/test' component={AsyncTest}/>
                <Route path='/404' component={AsyncNotFound}/>
                <Redirect to='/404'/>
           </Switch>
       )
    }
}
export default AuthRoute