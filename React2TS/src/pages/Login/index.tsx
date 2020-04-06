import { Form, Icon, Input, Button, message } from 'antd';
import React, { Component } from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Redirect } from 'react-router-dom';
import qs from 'qs';
import request from '../../request';
import './style.css';

interface FormFields {
  password: string;
}

interface Props {
  form: WrappedFormUtils<FormFields>;
}

class LoginForm extends Component<Props> {
  state = {
    isLogin: false
  };
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        request
          .post(
            '/api/login',
            qs.stringify({
              password: values.password
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          )
          .then(res => {
            const data: responseResult.login = res.data;
            if (data) {
              this.setState({
                isLogin: true
              });
            } else {
              message.error('登录失败');
            }
          });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLogin } = this.state;
    return isLogin ? (
      <Redirect to='/' />
    ) : (
      <div className='login-page'>
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入登陆密码' }]
            })(
              <Input
                prefix={
                  <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type='password'
                placeholder='Password'
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create({
  name: 'login'
})(LoginForm);
export default WrappedLoginForm;