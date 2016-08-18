import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import style from './index.css';
import { sendSMS, userRegister } from '../../vendor/connection';
import Cookies from 'js-cookie';

const FormItem = Form.Item;

class Register extends Component{

  constructor(props){
    super(props);
    this.state = {
      mobile:null,
      vaildCode:null,
      password:null,
      errorMobile: null,
      errorRegister: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this._sendSMS = this._sendSMS.bind(this);
  }

  _sendSMS(){
    if(!this.state.mobile){
      this.setState({
        errorMobile: '请输入正确的手机号'
      })
    } else {
      sendSMS(this.state.mobile, '注册', (err, data)=>{
        if(err){
          this.setState({
            errorMobile: err
          })
          console.log(err);
        } else {
          this.setState({
            errorMobile: null,
          })
          console.log(data);
        }
      })
    }
  }

  handleSubmit(e){
    e.preventDefault();
    if(!this.state.mobile){
      this.setState({errorRegister: '请输入手机号'});
    } else if (!this.state.vaildCode){
      this.setState({errorRegister: '请输入验证码'});
    } else if (!this.state.password){
      this.setState({errorRegister: '请输入密码'});
    } else {
      userRegister(this.state.mobile, this.state.vaildCode, this.state.password, '', '', (err,data)=>{
        if(err){
          console.log(err);
          this.setState({errorRegister: err});
        } else {
          this.setState({errorRegister: null});
          let UserID = data.UserId;
          Cookies.set('UserID', UserID, { expires: 7 });
          console.log('用户注册成功，并且已将用户ID存入cookie, cookie是：');
          console.log(Cookies.get('UserID'));
        }
      })
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="wapper">
        <div className="form-container">
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="手机号">
              <Input placeholder="请输入手机号" style={{display:"inline-block",width:"calc(100% - 103px)"}}
                onChange={(e)=>{this.setState({mobile: e.target.value})}}
              />
              <Button type="ghost" style={{float:'right'}} htmlType="button" onClick={this._sendSMS}>发送验证码</Button>
            </FormItem>
            <h5 style={{color:'#e33', marginBottom: '20px', marginTop: '-20px'}}>{this.state.errorMobile || ''}</h5>
            <FormItem label="验证码">
              <Input type="password" placeholder="验证码" style={{display:"inline-block",width:"100px"}}
                onChange={(e)=>{this.setState({vaildCode: e.target.value})}}
              />
            </FormItem>
            <FormItem label="密码">
              <Input type="password" placeholder="请输入密码"
                onChange={(e)=>{this.setState({password: e.target.value})}}
              />
            </FormItem>
            <Button type="primary" htmlType="submit">注册</Button>
          </Form>
          <h5 style={{marginTop: '20px'}}>已有帐号？去<a href={'/login'}>登录</a></h5>
        </div>
      </div>
    );
  }
}

Register = Form.create()(Register);

module.exports = Register
