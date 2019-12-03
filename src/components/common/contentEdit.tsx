//文本编辑的公共组件，传入参数：1:initData,是一个数组，初始文本数据，2:editFnc，一个函数，每次改动后执行的操作，

import React, {PureComponent,Component} from 'react'
import {storeType,initUser,deepData} from '../../reducer/types'
import './css/contentEdit.less'

interface editProps{
    initData:deepData[],
    editFnc:Function,
    refreshRender:Function
}
interface content{
    id:string,
    content:string,
    children:deepData[]
}
class ContentEdit extends Component<editProps>{
    constructor(props:editProps){
        super(props)
        this.keyDownEvent = this.keyDownEvent.bind(this)
        this.chineseKey = this.chineseKey.bind(this)
        this.rotKeyTest = this.rotKeyTest.bind(this)
        this.blurEvent = this.blurEvent.bind(this)
    }
    public keyDownEvent(id:string,e:React.KeyboardEvent<HTMLDivElement>):any{
        const {initData, editFnc} = this.props;
        editFnc(e,id)
    }
    public chineseKey(e:any){
        console.log(e)
    }
    public rotKeyTest(keyName:any, e:any, handle:any){
        console.log(keyName,e,handle)
    }
    public blurEvent(){
        this.props.refreshRender()
    }
    // static getDerivedStateFromProps(nextProps:editProps, prevState:any){
    //     console.log(nextProps)
    // }
    // getSnapshotBeforeUpdate(prevProps:editProps, prevState:any){
    //     console.log(prevProps,this.props)
    // }
    // componentDidUpdate(){

    // }
    render(){
        const {initData, editFnc, refreshRender} = this.props
        // console.log(initData)
        return (
            <React.Fragment>
                {
                    initData.map((item:content,index:number)=>{
                        return (
                            <div className='content_wrapper' key={index}>
                                <div className='bullet_wrapper'>
                                    <div className='dot'></div>
                                </div>
                                <div 
                                    className='edit_content' 
                                    contentEditable={true}
                                    dangerouslySetInnerHTML={{__html:item.content}}
                                    // onKeyPress = {this.keyDownEvent.bind(this,item.id)}
                                    onKeyUp = {this.keyDownEvent.bind(this,item.id)}
                                    onKeyDown = {this.keyDownEvent.bind(this,item.id)}
                                    id={item.id}
                                    onBlur={this.blurEvent}
                                    // compositionStart={this.chineseKey}
                                    >
                                </div>
                               
                                {
                                    item.children && item.children.length ?
                                    <div className='children_content'>
                                        <ContentEdit initData={item.children} editFnc={editFnc} refreshRender={refreshRender}/>
                                    </div>:null
                                }
                            </div>
                        )
                    })
                }
            </React.Fragment>
            
        )
    }
}
export default ContentEdit