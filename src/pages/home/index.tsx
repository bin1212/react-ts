import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators,Dispatch} from 'redux'
import './css/home.less'
import {store} from '../../index'
import * as TodoAction from '../../actions'
import {storeType,initTestUser} from '../../reducer/types'
interface Iprops{
    goto?:any,
    history:any,
    test:any,
    actions:{
        goto:any,
        test:any
    },
    id:string,
    name:string
}

class Home extends PureComponent<Iprops>{
    constructor(props:Iprops){
        super(props)
    }
    componentDidMount(){
        // store.dispatch({
        //     type:'goto',
        //     name
        // })
        // console.log(this.props)
        // const {goto} = this.props
        this.props.actions.test({
            id:'123',
            name:'123'
        })
        // goto()
        // this.props.history.push('/login')
    }
    render(){
        console.log(this.props)
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
function mapStateToProps (state:storeType):any {
    // const {initTestUser} = state
    console.log(state.initTestUser)
    return state.initTestUser
    // return 
}
// ({
//     initTestUser:state.initTestState,
// })
function mapDispatchProps (dispatch:Dispatch):any {
    return{
        actions:bindActionCreators(TodoAction,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchProps
)(Home)