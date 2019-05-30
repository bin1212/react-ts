import React, {PureComponent} from 'react'

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
            <div>hello {name}</div>
        )
    }
}