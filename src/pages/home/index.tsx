import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators,Dispatch} from 'redux'
import './css/home.less'
import {store} from '../../index'
import * as TodoAction from '../../actions'
import {storeType,initUser,deepData} from '../../reducer/types'
import {goto} from '../../commonFnc/history'
import ContentEdit from '../../components/common/contentEdit'
import ContentEvent from '../../commonFnc/contentEvent'

interface Iprops{
    history:any,
    actions:{
        goto:Function,
        initFnc:Function,
        editContent:Function,
        editContentAsync:Function
    },
    initUser:initUser,
    name:string,
    editData:deepData[]
}
const initState = {
    isShiftDown:false
}
type State = Readonly<typeof initState>
interface IState{
    isShiftDown:boolean
}
interface content{
    id:string,
    content:string,
    children:deepData[]
}

class Home extends PureComponent<Iprops,State>{
    readonly state:State=initState
    constructor(props:Iprops,state:State){
        super(props)
        this.dispatchFnu = this.dispatchFnu.bind(this)
        this.editFnc = this.editFnc.bind(this)
    }
    componentDidMount(){
        // this.dispatchFnu()
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
        const {isShiftDown} = this.state
        const value:string = e.currentTarget.innerHTML
        const key:string = e.key
        // console.log()
        if(e.shiftKey){
            this.setState({
                isShiftDown:true
            })
        }
        //检查是否按下shift健
        //非文本输入事件
        if(key === 'Enter'){
            console.log('enter')
            e.preventDefault()
            if(e.type === 'keyup'){
                ContentEvent.reduceData(editData,function(findArr:any){
                    const findIndex = findArr.findIndex((item:content)=>item.id === id)
                    const insertChildren:deepData = {
                        id:Math.random().toString(),
                        content:'',
                        children:[]
                    }
                    //向当前后面插入一个
                    findArr.splice(findIndex+1,0,insertChildren)
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
                ContentEvent.reduceData(editData,function(findArr:any){
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
                console.log('upupup')
                ContentEvent.reduceData(editData,function(findArr:any){
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
                this.setState({
                    isShiftDown:false
                })
            }
           
            return false
        }
        //键盘抬起事件
        if(e.type === 'keyup' && key!='Shift'){
            console.log('keyup',key)
            //找到对应的content，由于浅拷贝原因，store实际值已经改变，这时候不需要去重新渲染，避免光标问题
            ContentEvent.reduceData(editData,function(findArr:any){
                findArr.find((item:content)=>item.id === id).content = value
            },id)
            // actions.editContent(editData)
            
        }
    }
    render(){
        const {editData,actions:{editContent}} = this.props
        console.log('render')
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
function mapDispatchProps (dispatch:Dispatch):object {
    return{
        actions:bindActionCreators(TodoAction,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchProps
)(Home)