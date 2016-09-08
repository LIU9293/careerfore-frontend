import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import style from './index.css';
import { sendSMS, userRegister, updateUserNickName, getUserInfo } from '../../vendor/connection';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

const FormItem = Form.Item;

class Register extends Component{

  constructor(props){
    super(props);
    this.state = {
      mobile:null,
      vaildCode:null,
      password:null,
      username: null,
      error: null,
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
      this.setState({error: '请输入手机号'});
    } else if (!this.state.vaildCode){
      this.setState({error: '请输入验证码'});
    } else if (!this.state.password){
      this.setState({error: '请输入密码'});
    } else if (!this.state.username){
      this.setState({error: '请输入昵称'});
    } else {
      userRegister(this.state.mobile, this.state.vaildCode, this.state.password, '', '', (err,data)=>{
        if(err){
          console.log(err);
          this.setState({error: err});
        } else {
          this.setState({error: null});
          let UserID = data.UserId;
          updateUserNickName(UserID, this.state.username, (err, data)=>{
            if(err){
              console.log(err);
            } else {
              getUserInfo(UserID, (err,data) => {
                if(err){
                  console.log(err);
                } else {
                  console.log(data)
                  let userData = {
                    avatar: data.ZUT_HEADIMG,
                    nickName: data.ZUT_NICKNAME,
                    phone: data.ZUT_PHONE
                  }
                  this.props.login(UserID, userData);
                  Cookies.set('UserID', UserID, { expires: 7 });
                  browserHistory.push('/');
                }
              })
            }
          })
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
            <FormItem label="昵称">
              <Input type="text" placeholder="请输入昵称"
                onChange={(e)=>{this.setState({username: e.target.value})}}
              />
            </FormItem>
            <h5 style={{color:'#e33'}}>{this.state.error || ''}</h5>
            <Button type="primary" htmlType="submit">注册</Button>
          </Form>
          <h5 style={{marginTop: '20px'}}>已有帐号？去<a href={'/login'}>登录</a></h5>
        </div>
      </div>
    );
  }
}

Register = Form.create()(Register);

function mapStateToProps(store){
  return {
    userinfo: store.user
  }
}
function mapDispatchToProps(dispatch){
  return {
    login: (userid,userdata) => {dispatch({type:'LOG_IN', userid: userid, userdata: userdata})}
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(Register)
