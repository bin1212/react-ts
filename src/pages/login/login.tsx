import React,{PureComponent} from 'react'
import {Form, Icon, Input, Button, Checkbox, Row, Col, message} from 'antd'
import { FormComponentProps } from 'antd/lib/form';
import './css/login.less'
import {connect} from 'react-redux'
import {bindActionCreators,Dispatch} from 'redux'
import {store} from '../../index'
import {goto} from '../../commonFnc/history'
import * as TodoAction from '../../actions'
import {storeType,initUser} from '../../reducer/types'
import request from '../../commonFnc/request'
import AuthProvider from '../../commonFnc/AuthProvider'

interface UserFormProps extends FormComponentProps {
    // username:string,
    // password:string
  }
interface Istate{
    isLogin:boolean
}

class Login extends PureComponent<UserFormProps,Istate>{
    constructor(props:any){
        super(props)
        this.state={
            isLogin:true
        }
        this.submitForm = this.submitForm.bind(this)
        this.goRegister = this.goRegister.bind(this)
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }
    submitForm(e:any){
        const {isLogin} = this.state
        e.preventDefault();
        this.props.form.validateFields((err,values:UserFormProps) => {
            if(!err){
                if(isLogin){
                    this.login(values)
                }else{
                    this.register(values)
                }
                
            }
        });
    }
    goRegister():void{
        const {isLogin} = this.state
        this.setState({
            isLogin:!isLogin
        })
    }
    login(values:UserFormProps){
        request({url:'/api/auth/login',method:'POST',data:values})
            .then((res:any)=>{
                // console.log(res)
                if(res.resultCode == '200'){
                    message.success('登陆成功', 1);
                    AuthProvider.onLogin({token:res.resultContent.access_token,tokenExpireTime:res.resultContent.expiresIn})
                    if(res.resultContent.loginNum){
                        goto('/')
                    }else{
                        goto('/index')
                    }
                }else{
                    message.error(res.detailDescription, 1);
                }
            })
    }
    register(values:UserFormProps){
        request({url:'/api/auth/register',method:'POST',data:values})
            .then((res:any)=>{
                // console.log(res)
                if(res.resultCode == '200'){
                    message.success('注册成功', 1);
                    this.setState({
                        isLogin:true
                    })
                }else{
                    message.success(res.detailDescription, 1);
                }
            })
    }
    render(){
        console.log('jenkins')
        const {getFieldDecorator} = this.props.form;
        //皖ICP备19012433号
        const {isLogin} = this.state
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
          };
        const buttonLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        return(
            <div className='login_container'>
                <div className='login_back'>

                </div>
                <div className='login_content'>
                    <Form className="login-form" {...formItemLayout} onSubmit={this.submitForm}>
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={24} sm={24}>
                                <Form.Item label='账户名'>
                                {getFieldDecorator('username',{
                                    rules:[{ required: true, message: '请输入账户名'}]
                                })(
                                    <Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名'/>
                                )
                                }
                            </Form.Item>
                            </Col>
                        </Row>
                       
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={24} sm={24}>
                                 <Form.Item label='密码'>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }],
                                })(
                                    <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                    />,
                                )}
                                <span className='goGegister' onClick={this.goRegister}>
                                    
                                    {isLogin ? '没有账号？去注册' : '已有账号？去登陆'}
                                </span>
                            </Form.Item>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Form.Item {...buttonLayout}>
                                    <Button type="primary" htmlType="submit">{isLogin ? '登陆' : '注册'}</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <div className='beian'>备案号：<a href='http://www.beian.miit.gov.cn'>皖ICP备19012433号</a></div>
                </div>
            </div>
        )
    }
}
function mapStateToProps (state:storeType) {
    const {initUser} = state
    return {initUser}
    // return 
}
function mapDispatchProps (dispatch:Dispatch):any {
    return{
        actions:bindActionCreators(TodoAction,dispatch)
    }
}
const WrapLogin = Form.create<UserFormProps>()(Login)

export default connect(
    mapStateToProps,
    mapDispatchProps
)(WrapLogin)