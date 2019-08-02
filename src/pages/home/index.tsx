import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators,Dispatch} from 'redux'
import './css/home.less'
import {store} from '../../index'
import * as TodoAction from '../../actions'
import {storeType,initUser} from '../../reducer/types'
import {goto} from '../../commonFnc/history'

interface Iprops{
    history:any,
    actions:{
        goto:any,
        initFnc:any
    },
    initUser:initUser,
    initFnc:any,
    name:string
}
interface IState{
    // a:string
}

class Home extends PureComponent<Iprops,IState>{
    constructor(props:Iprops){
        super(props)
        this.state={
        }
        this.dispatchFnu = this.dispatchFnu.bind(this)
    }
    componentDidMount(){

    }
    dispatchFnu():void{
        this.props.actions.initFnc({
            id:'123',
            name:'123'
        })
        goto('/login')
    }
    render(){
        return(
            <div className='contentBody'>
                <div className='content_wrapper'>
                    <div className='bullet_wrapper'>
                        <div className='dot'></div>
                    </div>
                    <div className='edit_content' contentEditable={true}>
                    </div>
                </div>
               
            </div>
        )
    }
}
function mapStateToProps (state:storeType) {
    const {initUser} = state
    return {initUser}
    // return 
}
function mapDispatchProps (dispatch:Dispatch):any {
    return{
        actions:bindActionCreators(TodoAction,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchProps
)(Home)