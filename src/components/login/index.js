import React from 'react'
import { Button, Form, Input, Row, message } from 'antd'
import PropTypes from 'prop-types'
import { loginAction } from '../../actions'
import LoLess from './index.less'
const FormItem = Form.Item; 

class Login extends React.Component{
	constructor(){
		super();
		this.handleOk = this.handleOk.bind(this);
	}
	handleOk(){
		this.props.form.validateFields((err,values) => {
			if(err){
				console.warn(err);
			}else{
				console.log(values);
				if(values.password === "btime" && values.username === "btime"){
          const { store } = this.context;
          localStorage.setItem('login','in');
          loginAction.payload = 'in';
          store.dispatch(loginAction)
				}else{
					message.error('账号或密码错误~');
				}
			}
		})
	}
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='loginForm'>
        <div className='login-logo'>
          <img alt={'logo'} src={'http://p3.qhimg.com/t017bac45bfb16d34fb.png'} />
          <span>北京时间-数据展示平台</span>
        </div>
        <Form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                },
              ],
            })(<Input size="large" onPressEnter={this.handleOk} placeholder="用户名" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
                rules: [
                    {
                      required: true,
                      message: '请输入密码',
                    },
                ],
            })(<Input size="large" type="password" onPressEnter={this.handleOk} placeholder="密码" />)}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={this.handleOk}>
              登录
            </Button>
          </Row>
          <p>
            <span>账号：btime</span>
            <span>密码：btime</span>
          </p>
        </Form>
      </div>  
    )
  }
}

Login.contextTypes = {
  store: PropTypes.object
}

export default Form.create()(Login)