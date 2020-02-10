import React, {PureComponent} from 'react'
import { Menu, Icon, Switch,Layout } from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators,Dispatch} from 'redux'
import {store} from '../../index'
import './css/index.less'
import {userInfo,userInfoStore} from '../../reducer/types'
import * as TodoAction from '../../actions'
import {hideMenuUrl} from '../../until/golbal'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

interface Iprops{
    history:any,
    actions?:{
        saveUserinfo:Function
    },
    userInfo?:userInfo
}

class LayoutMenu extends PureComponent<Iprops>{
    componentDidMount(){
        const pathname = this.props.history.location.pathname
        console.log(pathname)
        if(this.props.actions && this.props.userInfo && !hideMenuUrl.includes(pathname)){
            const {isRequest} = this.props.userInfo
            if(!isRequest) this.props.actions.saveUserinfo()
        }
    }
    handleClick = (e:any)=>{
        console.log('click ', e);
    }
    render() {
        // console.log(this.props.history.location.pathname)
        const {userInfo} = this.props
        const pathname = this.props.history.location.pathname
        return (
        <Layout style={{ minHeight: '100vh' }}>
            {
                (!hideMenuUrl.includes(pathname)) ?
                <Sider theme='light' style={{display:hideMenuUrl.includes(pathname)?'none':''}}>
                    <div className='menu_header'>
                        <img className='logo_img' src={require('../../assets/images/logo_512.png')}/>
                        <span>{userInfo?userInfo.count:''}</span>
                    </div>
                    <Menu
                    onClick={this.handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub2']}
                    mode="inline"
                    style={{height:'100%'}}
                    >
                        <SubMenu
                        key="sub2"
                        title={
                            <span>
                            <Icon type="appstore" />
                            <span>Navigation Two</span>
                            </span>
                        }
                        >
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                        </SubMenu>
                        <SubMenu
                        key="sub4"
                        title={
                            <span>
                            <Icon type="setting" />
                            <span>Navigation Three</span>
                            </span>
                        }
                        >
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                :''
            }

            <Layout>
                {
                    (!hideMenuUrl.includes(pathname)) ?
                    <Header style={{ background: '#fff', padding: 0,borderBottom:'1px solid #e8e8e8',display:hideMenuUrl.includes(pathname)?'none':'' }} />:''
                }
                <Content>
                    {this.props.children}
                </Content>
            </Layout>
        </Layout>
        );
      }
}

const mapStateToProps = (state:userInfoStore)=>{
    const {userInfo} = state
    return {userInfo}
}
const mapDispatchProps = (dispatch:Dispatch)=>{
    return{
        actions:bindActionCreators(TodoAction,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchProps
)(LayoutMenu)