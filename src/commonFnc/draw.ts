import React, {PureComponent,Component} from 'react'
// let canvas = document.getElementById('panorama') as HTMLCanvasElement;
// let w = canvas.width;
// let h = canvas.height;
// let ctx:any = canvas.getContext('2d');
interface Iprops{
    canvas:HTMLCanvasElement,
    // color:string
}
interface layerProps{
    ctx:any;
    x:number;
    y:number;
    z:number;
    r:number;
    Radius:number;
    vpx:number;
    vpy:number
}
interface Istate{
    isRunning:boolean;LayerBallNum:number;LayerIntervalUp:number;canvas:HTMLCanvasElement;vpx:number;vpy:number;Radius:number;balls:any;angleX:number;angleY:number
}

class Wave {
    isRunning:boolean;LayerBallNum:number;LayerIntervalUp:number;canvas:HTMLCanvasElement;vpx:number;vpy:number;balls:any;angleX:number;angleY:number;
    Radius:number;ctx:any;up:number;num:number;
    public constructor(props:Iprops) {    
        this.isRunning = false;
        this.LayerBallNum = 360 / 30 ;  //横向圆周个数
        this.LayerIntervalUp = 360 / 30 ; //纵向
        this.canvas = props.canvas;
        this.vpx = this.canvas.width/2,
        this.vpy = this.canvas.height/2,
        this.Radius = 150 //整体大球的坐标
        this.balls = [],
        this.angleX = Math.PI/100,
        this.angleY = Math.PI/100;
        this.ctx = this.canvas.getContext("2d"),
        // this.x = 0,
        // this.y = 0,
        this.num = 0,
        // this.Lradius = Math.sqrt(Math.pow(this.Radius,2) - Math.pow(this.Radius * Math.cos(this.num * Math.PI * 2 / this.LayerBallNum), 2))
        this.up = 0,

        this.init()
    }  
    init(){
        let num = this.LayerIntervalUp / 2
        for (var i = 0; i <=num; i++) {
            this.draw(i,1)
            this.draw(i,-1)
        }
    }
    draw (i:number,up:number) {
        this.ctx.beginPath();
        let Lradius = Math.sqrt(Math.pow(this.Radius,2) - Math.pow(this.Radius * Math.cos(i * Math.PI * 2 / this.LayerBallNum), 2))
        this.ctx.arc(this.vpx, this.vpy, Lradius , 0, 2*Math.PI, true);
        this.ctx.strokeStyle = "#fff";
        this.ctx.stroke();
        
        this.setBalls(Lradius,up);
    }
    setBalls(radius:number,up:number) {
        for(var i=0; i<this.LayerBallNum; i++){
            var angle =  2 * Math.PI / this.LayerBallNum * i;
            var b = new Ball({
                x:radius * Math.cos(angle),
                y:radius * Math.sin(angle),
                z:up* Math.sqrt(Math.pow(this.Radius, 2) - Math.pow(radius, 2)),
                r:1.5,
                ctx:this.ctx,
                Radius:this.Radius,
                vpx:this.vpx,
                vpy:this.vpy,
            });
            this.balls.push(b);
        }

    }
    start(){
        this.isRunning = true;
        this.animate();   
    }
    stop(){
        this.isRunning = false;
    }
    animate(){
        this.ctx.clearRect(0,0,this.canvas.width , this.canvas.height);
        this.rotateX();
        this.rotateY();
        this.rotateZ();

        for(var i=0;i<this.balls.length;i++){
            this.balls[i].paint();
        }
        window.requestAnimationFrame(()=>{
            this.animate()
        });
        
    }
    rotateX(){
        var cos = Math.cos(this.angleX);
        var sin = Math.sin(this.angleX);
        for(var i=0;i<this.balls.length;i++){
            var y1 = this.balls[i].y * cos - this.balls[i].z * sin;
            var z1 = this.balls[i].z * cos + this.balls[i].y * sin;
            this.balls[i].y = y1;
            this.balls[i].z = z1;
        }
    }

    rotateY(){
        var cos = Math.cos(this.angleY);
        var sin = Math.sin(this.angleY);
        for(var i=0;i<this.balls.length;i++){
            var x1 = this.balls[i].x * cos - this.balls[i].z * sin;
            var z1 = this.balls[i].z * cos + this.balls[i].x * sin;
            this.balls[i].x = x1;
            this.balls[i].z = z1;
        }
    }

    rotateZ(){
        var cos = Math.cos(this.angleY);
        var sin = Math.sin(this.angleY);
        for(var i=0;i<this.balls.length;i++){
            var x1 = this.balls[i].x * cos - this.balls[i].y * sin;
            var y1 = this.balls[i].y * cos + this.balls[i].x * sin;
            this.balls[i].x = x1;
            this.balls[i].y = y1;
        }
    }


    paint(x:number , y:number , z:number , r:number){
        var fl = 450 //焦距
        this.ctx.save();
        this.ctx.beginPath();
        let scale = fl / (fl - z);
        let alpha = (z+this.Radius)/(2*this.Radius);
        this.ctx.arc(this.vpx + x, this.vpy + y, r*scale , 0 , 2*Math.PI , true);
        this.ctx.fillStyle = "rgba(255,255,255,"+(alpha+0.5)+")";
        // ctx.fillStyle = "#000";
        this.ctx.fill();
        this.ctx.restore();
    }
}

class Ball {
    ctx:any;x:number;y:number;z:number;r:number;width:number;Radius:number;
    vpx:number;vpy:number
    constructor(props:layerProps){
        this.ctx = props.ctx
        this.x = props.x;
        this.y = props.y;
        this.z = props.z;
        this.r = props.r;
        this.Radius = props.Radius;
        this.vpx = props.Radius;
        this.vpy = props.Radius;
        this.width = 2*this.r;
    }
    paint(){
        let fl = 450 //焦距
        this.ctx.save();
        this.ctx.beginPath();
        var scale = fl / (fl - this.z);
        var alpha = (this.z+this.Radius)/(2*this.Radius);
        this.ctx.arc(this.vpx + this.x, this.vpy + this.y, this.r*scale , 0 , 2*Math.PI , true);
        this.ctx.fillStyle = "rgba(255,255,255,"+(alpha+0.5)+")";
        // ctx.fillStyle = "#000";
        this.ctx.fill();
        this.ctx.restore();
    }
}

export default Wave
