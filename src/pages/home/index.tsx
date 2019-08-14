import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators,Dispatch} from 'redux'
import './css/home.less'
import {store} from '../../index'
import * as TodoAction from '../../actions'
import {storeType,initUser} from '../../reducer/types'
import {goto} from '../../commonFnc/history'
import ContentEdit from '../../components/common/contentEdit'

interface Iprops{
    history:any,
    actions:{
        goto:any,
        initFnc:any,
        editContent:any
    },
    initUser:initUser,
    name:string,
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
        this.state={
        }
        this.dispatchFnu = this.dispatchFnu.bind(this)
        this.editFnc = this.editFnc.bind(this)
    }
    componentDidMount(){
        // this.recursiveEle()
    }
    dispatchFnu():void{
        this.props.actions.initFnc({
            id:'123',
            name:'123'
        })
        goto('/login')
    }

    editFnc(e:React.KeyboardEvent<HTMLDivElement>,id:string){
        const {editData,actions} = this.props
        const value:string = e.currentTarget.innerHTML
        const key:string = e.key
        //非文本输入事件
        if(key === 'Enter'){
            // e.stopPropagation()
            e.preventDefault()
        }

        //键盘抬起事件
        if(e.type === 'keyup'){
                    //找到对应的content
            const reduceMsg = (mapData:any)=>{
                mapData.some(function (mapArr:any, index:any, _ary:any) {
                    if(_ary.find((item:content)=>item.id === id)){
                        _ary.find((item:content)=>item.id === id).content = value
                        return true
                    }else if(mapArr.children && mapArr.children.length){
                        reduceMsg(mapArr.children)
                    }
                })
            }
            reduceMsg(editData)
            actions.editContent(editData)
        }

    }
    render(){
        console.log('render')
        const {editData,actions:{editContent}} = this.props
        return(
            <div className='contentBody'>
                <ContentEdit initData = {editData} editFnc={this.editFnc}/>
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