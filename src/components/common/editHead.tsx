import React, {PureComponent} from 'react'
import './css/editHead.less'

class EditHead extends PureComponent{
    render(){
        return (
            <div className='contentHeader'>
                {this.props.children}
            </div>
        )
    }
}
export default EditHead