//文本编辑的公共组件，传入参数：1:initData,是一个数组，初始文本数据，2:editFnc，一个函数，每次改动后执行的操作，

import React, {PureComponent, Children} from 'react'

interface editProps{
    initData:any,
    editFnc:Function
}
interface content{
    id:string,
    content:string,
    children:any
}
class ContentEdit extends PureComponent<editProps>{
    constructor(props:editProps){
        super(props)
        this.keyDownEvent = this.keyDownEvent.bind(this)
    }
    public keyDownEvent(id:string,e:React.KeyboardEvent<HTMLDivElement>):void{
        const {initData, editFnc} = this.props;
        editFnc(e,id)
    }
    render(){
        const {initData, editFnc} = this.props
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
                                    onKeyUp = {this.keyDownEvent.bind(this,item.id)}
                                    onKeyDown = {this.keyDownEvent.bind(this,item.id)}
                                    >
                                </div>
                                {
                                    item.children && item.children.length ?
                                    <div className='children_content'>
                                        <ContentEdit initData={item.children} editFnc={editFnc}/>
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