import React from 'react';
import {storeType,initUser,deepData} from '../reducer/types'
interface content{
    id:string,
    content:string,
    children:deepData[]
}
class ContentEvent{
    constructor(){

    }
   /**
     * @param mapData 需要递归的数据
     * @param cb 找到数据后的回调，会返回一个找到的对应的数组,不需要可以为null
     * @param id 对应的那条数据的id
     */
    reduceData(mapData:deepData[],cb:Function | null,id:string){
        const that = this
        mapData.some(function (mapArr:content, index:number, _ary:any):any{
            if(_ary.find((item:content)=>item.id === id)){
                if(typeof cb == 'function') cb(_ary)
                return true
            }else if(mapArr.children && mapArr.children.length){
                return that.reduceData(mapArr.children,cb,id)
            }
        })
    }
    //将光标放到对应id的后面
    getFocus(id:string){
        let srcObj:HTMLElement | null = document.getElementById(id);
        let range = window.getSelection();//创建range 
        if (range && srcObj) {
            srcObj.focus(); //解决ff不获取焦点无法定位问题  
            range.selectAllChildren(srcObj);//range 选择obj下所有子内容  
            range.collapseToEnd();//光标移至最后  
        }  
    }
}
export default new ContentEvent()