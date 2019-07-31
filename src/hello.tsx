import React, {PureComponent} from 'react'
import  '../public/css/index.less'
import {Button} from 'antd'
interface HelloProps {
    name:any;
    age?:number;
    [propName: string]: any;
} 
export interface _name{
    name:any;
}
export default class Hello extends PureComponent{
    constructor(public props:HelloProps){
        super(props);
        this.state={
            a:1
        }
    }
    componentDidMount(){
        console.log(this.props)
        this._getName({name:'bin'});
    }
    _getName(params:_name){
        console.log(params)
        this.setState({
            b:1
        },()=>{
            console.log(this.state)
        })
    }
    render(){
        const {name} = this.props;
        return (
            <div>
                <p>hello {name}</p>
                <p>性感斌仔，在线发牌</p>
                {/* <Button type="primary">hhh</Button>
                <div className='img_h'>

                </div>
                <img src='./public/images/logo_512.png'/> */}
            </div>
        )
    }
}