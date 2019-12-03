import React, {PureComponent,Component} from 'react'

class Debounce{
    public timer:any;
    public constructor(){
        this.timer = null
    }
    //防抖动
    public setTimer(cb:Function | null,duration:number | null){
        // console.log(this.timer)
        const initDuration = duration ? duration : 10
        if(this.timer){
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(()=>{
            if(cb) cb()
        },initDuration)
    }
}
export default new Debounce()