import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators,Dispatch} from 'redux'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import { Icon,message } from 'antd';
import './css/home.less'
import {store} from '../../index'
import * as TodoAction from '../../actions'
import {storeType,initUser,deepData,contentTyps} from '../../reducer/types'
import {goto} from '../../commonFnc/history'
import ContentEdit from '../../components/common/contentEdit'
import ContentEvent from '../../commonFnc/contentEvent'
import PageHead from '../../components/common/editHead'
import EditTitle from '../../components/common/editTitle'
import AccountOperation from '../../components/common/accountOperation'
import request from '../../commonFnc/request'

interface Iprops{
    history:any,
    actions:{
        goto:Function,
        initFnc:Function,
        editContent:Function,
        editContentAsync:Function,
        requestUserMsg:Function,
        saveUserMsg:Function
    },
    initUser:initUser,
    editData:contentTyps
}
const initState = {
    isShiftDown:false
}
type State = Readonly<typeof initState>
type thisProps = Iprops & RouteComponentProps;
interface IState{
    isShiftDown:boolean
}
interface content{
    id:string,
    content:string,
    children:deepData[]
}

class Home extends PureComponent<thisProps,State>{
    readonly state:State=initState
    constructor(props:thisProps,state:State){
        super(props)
        this.dispatchFnu = this.dispatchFnu.bind(this)
        this.editFnc = this.editFnc.bind(this)
        this.getUserMsg = this.getUserMsg.bind(this)
    }
    componentDidMount(){
        // this.dispatchFnu()
        // request({url:'/users',method:'GET'})
        this.getUserMsg()
    }
    dispatchFnu():void{
        this.props.actions.initFnc({
            id:'123',
            name:'123'
        })
        goto('/login')
    }
    getUserMsg(){
        this.props.actions.requestUserMsg({callBack:()=>{
            
        }})
    }
    editFnc(e:React.KeyboardEvent<HTMLDivElement>,id:string){
        const {editData,actions} = this.props
        const {contentDetail} =editData
        const {isShiftDown} = this.state
        const value:string = e.currentTarget.innerHTML
        const key:string = e.key
        if(e.shiftKey){
            this.setState({
                isShiftDown:true
            })
        }
        
        //非文本输入事件
        if(key === 'Enter'){
            e.preventDefault()
            if(e.type === 'keyup'){
                ContentEvent.reduceData(contentDetail,function(findArr:any){
                    const findIndex = findArr.findIndex((item:content)=>item.id === id)
                    const insertChildren:deepData = {
                        id:Math.random().toString(),
                        content:'',
                        children:[]
                    }
                    //向当前后面插入一个
                    findArr.splice(findIndex+1,0,insertChildren)
                    // console.log(findArr,editData)
                    actions.editContentAsync({data:editData,callBack:()=>{
                        ContentEvent.getFocus(insertChildren.id)
                    }})
                    
                },id)
            }
            return false
        }
        if(key == 'Tab'){
            //前进
            e.preventDefault()
            if(e.type === 'keyup' && !isShiftDown){
                // console.log(e.shiftKey)
                // console.log('Tab')
                ContentEvent.reduceData(contentDetail,function(findArr:any){
                    const sliceIndex = findArr.findIndex((item:content)=>item.id === id)
                    if(sliceIndex){
                        const selectData = findArr.find((item:content)=>item.id === id);
                        findArr.splice(sliceIndex,1)
                        findArr[sliceIndex - 1].children.push(selectData)
                        actions.editContentAsync({data:editData,callBack:()=>{
                            ContentEvent.getFocus(id)
                        }})
                    }
                },id)
            }else if(e.type === 'keyup' && isShiftDown){
                //缩进
                // console.log('upupup')
                ContentEvent.tabShift(contentDetail,function(current:content,findArr:any){
                    // console.log(current,findArr)
                    const childrenIndex = current.children.findIndex((item:content)=>item.id === id)
                    const fatherIndex = findArr.findIndex((item:content)=>item.id == current.id)
                    if(childrenIndex >= 0 && fatherIndex >= 0){
                        let temp = current.children[childrenIndex]
                        findArr.splice(fatherIndex+1,0,temp)
                        current.children.splice(childrenIndex,1)
                        actions.editContentAsync({data:editData,callBack:()=>{
                            ContentEvent.getFocus(id)
                        }})
                    }
                },id)
                this.setState({
                    isShiftDown:false
                })
            }
           
            return false
        }
        if(e.type === 'keyup' && key === 'ArrowUp'){
            e.preventDefault()
            return false
        }
        if(e.type === 'keyup' && key === 'ArrowDown'){
            console.log('start-move-down')
            ContentEvent.findFatherId(contentDetail,function(id:string){
                ContentEvent.getFocus(id)
            },id)
            e.preventDefault()
            return false
        }
 
        //键盘抬起事件
        if(e.type === 'keyup' && key!='Shift'){
            // console.log('keyup',key)
            //找到对应的content，由于浅拷贝原因，store实际值已经改变，这时候不需要去重新渲染，在失去焦点的时候，避免光标问题
            if(key === 'Backspace'){
                console.log('delete')
                ContentEvent.reduceData(contentDetail,function(findArr:any){
                    if(findArr.find((item:content)=>item.id === id).content){
                        findArr.find((item:content)=>item.id === id).content = value
                    }else{
                        if(contentDetail[0].id == id){
                            return false
                        }
                        const findIndex = findArr.findIndex((item:content)=>item.id === id)
                        findArr.splice(findIndex,1)
                        // console.log(findArr,editData)
                        actions.editContentAsync({data:editData,callBack:()=>{
                            if(findIndex){
                                ContentEvent.getFocus(findArr[findIndex - 1].id)
                            }
                            
                        }})
                    }
                    
                },id)
            }else{
                 ContentEvent.reduceData(contentDetail,function(findArr:any){
                    findArr.find((item:content)=>item.id === id).content = value
                },id)
            }
           
        }
    }
    refreshRender = ()=>{
        const {editData,actions} = this.props
        actions.editContentAsync({data:editData,callBack:()=>{
        }})
    }
    titleChange = (value:string)=>{
        const {editData,actions} = this.props
        editData.title = value
        actions.editContentAsync({data:editData})
    }
    saveContent = ()=>{
        const {actions} = this.props
        actions.saveUserMsg({callBack:(res:any)=>{
            if(res.resultCode == 200){
                message.success('This is a success message');
            }else{
                message.success(res.detailDescription);
            }
           
        }})
    }
    render(){
        const {editData:{contentDetail,title},actions:{editContent}} = this.props
        return(
            <div className='contentContainer'>
                <PageHead>
                    <div className='title_component'>
                        <div className='icon_save' onClick={this.saveContent}>
                            <Icon type="save"/>
                            <span>保存</span> 
                        </div>
                        <div className='user_com'>
                           <AccountOperation/> 
                        </div>
                    </div>
                </PageHead>
                <div className='scrollContent'>
                    <div className='contentBody'>
                        <EditTitle onChange = {this.titleChange} title = {title}/>
                        <ContentEdit 
                            initData = {contentDetail} 
                            editFnc={this.editFnc}
                            refreshRender={this.refreshRender}
                        />
                    </div>
                </div>
            </div>
           
        )
    }
}
function mapStateToProps (state:storeType) {
    const {initUser,editData} = state
    return {initUser,editData}
}
function mapDispatchProps (dispatch:Dispatch):object {
    return{
        actions:bindActionCreators(TodoAction,dispatch)
    }
}

const WrapHome = withRouter<thisProps>(Home as any)
export default connect(
    mapStateToProps,
    mapDispatchProps
)(WrapHome)