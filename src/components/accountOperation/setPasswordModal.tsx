import React, {PureComponent} from 'react'
import { Modal,Form, Icon, Input, Checkbox, Row, Col, message} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import {change_password} from '../../commonFnc/api/api'
import {goto} from '../../commonFnc/history'

interface IProps extends FormComponentProps {
    showModal:boolean,
    handlModal:Function
}
interface Istate{
    isLogin:boolean
}
interface formTypes {
    newPassword: string,
    oldPassword: string,
    passwordAgain: string
}
class SetPasswordModal extends PureComponent<IProps,Istate>{
    constructor(props:IProps){
        super(props)
        this.state={
            isLogin:true
        }
    }
    changePassword = ()=>{
        // const {getFieldDecorator} = this.props.form;
        this.props.form.validateFields((err,values:formTypes) => {
            if(values.newPassword == values.passwordAgain){
                change_password(values)
                    .then((res:any)=>{
                        if(res.resultCode == 200){
                            message.success('修改成功，即将退出')
                            this.props.handlModal()
                            setTimeout(()=>{
                                goto('/login')
                            },1000)
                        }else{
                            message.error(res.detailDescription)
                        }
                    })
            }else{
                message.error('亲，两次输入密码不一致！')
            }
        });
    }
    render(){
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
          };
        const {getFieldDecorator} = this.props.form;
        return(
            <Modal
                title="修改密码"
                visible={this.props.showModal}
                onOk={this.changePassword}
                onCancel={()=>{this.props.handlModal()}}
            >
               <Form {...formItemLayout} >
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={24} sm={24}>
                        <Form.Item label='旧密码'>
                        {getFieldDecorator('oldPassword',{
                            rules:[{ required: true, message: '请输入原来密码'}]
                        })(
                            <Input  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名'/>
                        )
                        }
                    </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={24} sm={24}>
                        <Form.Item label='新密码'>
                        {getFieldDecorator('newPassword',{
                            rules:[{ required: true, message: '请输入新密码'}]
                        })(
                            <Input  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='请输入新密码'/>
                        )
                        }
                    </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={24} sm={24}>
                        <Form.Item label='再次输入新密码'>
                        {getFieldDecorator('passwordAgain',{
                            rules:[{ required: true, message: '再次输入密码'}]
                        })(
                            <Input  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='再次输入密码'/>
                        )
                        }
                    </Form.Item>
                    </Col>
                </Row>
               </Form>
        </Modal>
        )
    }
}
const WrapModal = Form.create<IProps>({})(SetPasswordModal)
export default WrapModal