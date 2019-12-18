import React, {PureComponent} from 'react'
import './css/editHead.less'

const EditHead = (props:any) =>(
    <div className='contentHeader'>
        {props.children}
    </div>
)
export default EditHead