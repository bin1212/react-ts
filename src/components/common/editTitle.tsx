import React, {PureComponent} from 'react'
import './css/editTitle.less'
import Debounce from '../../commonFnc/debounce'

interface IProps{
    onChange:Function,
    title:string
}

class EditTitle extends PureComponent<IProps>{
    public debbounceChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = event.target
        const {onChange} = this.props
        Debounce.setTimer(()=>{onChange(value)},500)
    }
    render(){
        const {title} = this.props
        return (
            <div className='title'>
                <input onChange={this.debbounceChange} value={title} className='titleIpt' type='text' placeholder='无标题' maxLength={200}/>
            </div>
        )
    }
}
export default EditTitle