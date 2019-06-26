import React,{PureComponent} from 'react'
import {Form, Icon, Input, Button, Checkbox} from 'antd'
import { FormComponentProps } from 'antd/lib/form';
import './css/login.less'

interface UserFormProps extends FormComponentProps {
    username:string,
    password:string
  }
  
class Login extends PureComponent<UserFormProps,any>{
    constructor(props:any){
        super(props)
    }
    render(){
        const {getFieldDecorator} = this.props.form;
        console.log(this.props)
        return(
            <div className='login_container'>
                <div className='login_content'>
                    <Form>
                        <Form.Item>
                            {getFieldDecorator('username',{
                                rules:[{ required: true, message: '请输入账户名'}]
                            })(
                                <Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名'/>
                            )
                            }
                        </Form.Item>
                        <Form.Item>
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
                    </Form>
                </div>
            </div>
        )
    }
}
const WrapLogin = Form.create<UserFormProps>()(Login)
export default WrapLogin