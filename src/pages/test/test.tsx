import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators,Dispatch} from 'redux'
import '../home/css/home.less'
import * as TodoAction from '../../actions'
import {storeType,initUser} from '../../reducer/types'

interface Iprops{
    history:any,
    actions:{
        editContent:any
    },
    initUser:initUser,
    editData:any
}
interface IState{
    // a:string
}
interface content{
    id:string,
    content:string,
    children:any
}

class Home extends PureComponent<Iprops,IState>{
    constructor(props:Iprops){
        super(props)
    }
    componentDidMount(){
    }

    render(){
        const {editData,actions:{editContent}} = this.props
        return(
            <div className='contentBody'>
               
            </div>
        )
    }
}
function mapStateToProps (state:storeType) {
    const {initUser,editData} = state
    return {initUser,editData}
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