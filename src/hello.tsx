import React, {PureComponent} from 'react'
import '../public/css/index.css'


interface HelloProps {
    name:string;
} 
export default class Hello extends PureComponent{
    constructor(public props:HelloProps){
        super(props);
    }
    render(){
        const {name} = this.props;
        return (
            <div>
                <p>hello {name}</p>
                <div className='img_h'>

                </div>
                <img src='/public/images/logo_512.png'/>
            </div>
        )
    }
}