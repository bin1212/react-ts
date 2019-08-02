import React,{PureComponent} from 'react'
import {Form, Icon, Input, Button, Checkbox, Row, Col} from 'antd'
import { FormComponentProps } from 'antd/lib/form';
import './css/login.less'
import {connect} from 'react-redux'
import {bindActionCreators,Dispatch} from 'redux'
import {store} from '../../index'
import * as TodoAction from '../../actions'
import {storeType,initUser} from '../../reducer/types'

interface UserFormProps extends FormComponentProps {
    username:string,
    password:string
  }
  
class Login extends PureComponent<UserFormProps>{
    constructor(props:any){
        super(props)
        this.submitForm = this.submitForm.bind(this)
    }
    submitForm(e:any){
        e.preventDefault();
        this.props.form.validateFields((err,values:UserFormProps) => {
            if(!err){
                console.log('success',values)
            }
        });
    }
    render(){
        const {getFieldDecorator} = this.props.form;
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
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Form.Item {...buttonLayout}>
                                    <Button type="primary" htmlType="submit">登陆</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
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