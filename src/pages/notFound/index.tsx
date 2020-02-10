import React, {PureComponent} from 'react'
import './css/index.less'


const NotFound = ()=>(
    <React.Fragment>
        <div className='notFoundPage'>
            <img src={require('../../assets/images/404.jpg')}/>
        </div>
    </React.Fragment>
)
export default NotFound