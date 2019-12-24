import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators,Dispatch} from 'redux'
// import '../home/css/home.less'
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
var img = new Image();
img.src = 'https://mdn.mozillademos.org/files/4553/Capitan_Meadows,_Yosemite_National_Park.jpg';
var CanvasXSize = 800;
var CanvasYSize = 200;
var speed = 30; //lower is faster
var scale = 1.05;
var y = -4.5; //vertical offset

// Main program

var dx = 0.75;
var imgW:any;
var imgH:any;
var x = 0;
var clearX:any;
var clearY:any;
var ctx:any;
class Home extends PureComponent<Iprops,IState>{
    constructor(props:Iprops){
        super(props)
    }
    componentDidMount(){
        this.downImg()
    }
    downImg = ()=>{
        
        img.onload = ()=>{
            imgW = img.width*scale;
            imgH = img.height*scale;
            if (imgW > CanvasXSize) { x = CanvasXSize-imgW; } // image larger than canvas
            if (imgW > CanvasXSize) { clearX = imgW; } // image larger than canvas
            else { clearX = CanvasXSize; }
            if (imgH > CanvasYSize) { clearY = imgH; } // image larger than canvas
            else { clearY = CanvasYSize; }
            //Get Canvas Element
            ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext('2d');
            // ctx.fillStyle = 'rgba(255,255,255,0.3)';
            //Set Refresh Rate
            return setInterval(this.draw, speed)
        }
       
    }
    draw = ()=>{
        ctx.clearRect(0,0,clearX,clearY);
        //If image is <= Canvas Size
        if (imgW <= CanvasXSize) {
            //reset, start from beginning
            if (x > (CanvasXSize)) { x = 0; }
            //draw aditional image
            if (x > (CanvasXSize-imgW)) { ctx.drawImage(img,x-CanvasXSize+1,y,imgW,imgH); }
        }
        //If image is > Canvas Size
        else {
            //reset, start from beginning
            if (x > (CanvasXSize)) { x = CanvasXSize-imgW; }
            //draw aditional image
            if (x > (CanvasXSize-imgW)) { ctx.drawImage(img,x-imgW+1,y,imgW,imgH); }
        }
        //draw image
        ctx.drawImage(img,x,y,imgW,imgH);
        //amount to move
        x += dx;
    }
    render(){
        const {editData,actions:{editContent}} = this.props
        return(
            <div className='contentBody'>
               <canvas id="canvas" width="800" height="200"></canvas>
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