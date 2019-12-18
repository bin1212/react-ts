import React, {PureComponent} from 'react'
import { Menu, Dropdown, Icon } from 'antd';
import './css/accountOperation.less'
import SetPasswordModal from '../accountOperation/setPasswordModal'
import {logout} from '../../commonFnc/api/api'
import Cookies from 'js-cookie';
import {goto} from '../../commonFnc/history'

const initState = {
    showModal:false
}
type State = Readonly<typeof initState>

class AccountOperation extends PureComponent<any,State>{
    readonly state:State=initState
    downMenu = ()=>(
        <Menu style={{minWidth:'100px'}}>
            <Menu.Item>
                <div className='login_out' onClick={this.userLogout}>
                    退出
                </div>
            </Menu.Item>
            <Menu.Item>
                <div className='change_password' onClick={this.handlModal}>
                    修改密码
                </div>
            </Menu.Item>
        </Menu>
    )
    userLogout = ()=>{
        logout()
            .then((res:any)=>{
                Cookies.remove('access_token');
            })
            .catch((err:any)=>{
                Cookies.remove('access_token');
            })
        
        goto('/login')
    }
    handlModal = ()=>{
        this.setState({
            showModal:!this.state.showModal
        })
    }
    render(){
        const {showModal} = this.state
        return (
            <React.Fragment>
                <Dropdown overlay={this.downMenu}>
                    <a className="ant-dropdown-link" href="#">
                        <Icon type="usergroup-delete" style={{fontSize:'20px'}}/>
                        <Icon type="down" style={{fontSize:'20px'}}/>
                    </a>
                </Dropdown>
                <SetPasswordModal
                    showModal={showModal}
                    handlModal = {this.handlModal}
                />
            </React.Fragment>
            
        )
    }
}
export default AccountOperation