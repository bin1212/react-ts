import React, {PureComponent} from 'react'
import Wave from '../../commonFnc/draw'
import './css/index.less'

class Index extends PureComponent{
    componentDidMount(){
        // this.panoramaDraw()
        
        const panorama = document.getElementById('panorama') as HTMLCanvasElement;
        panorama.width  = document.body.clientWidth
        panorama.height  = document.body.clientHeight
        let wave = new Wave({
            canvas:panorama,
        })
        // wave.start()
    }
    render(){
        return(
            <div className='canvas'>
                <canvas id='panorama' width='1000' height="500"></canvas>
            </div>
        )
    }
}
export default Index