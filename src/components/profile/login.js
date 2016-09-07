import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import style from './index.css';
import Cookies from 'js-cookie';
import { userLogin, getUserActivities, getUserInfo } from '../../vendor/connection';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

const FormItem = Form.Item;

class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      username:null,
      password:null,
      remeberMe:false,
      error: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    if(!this.state.username || !this.state.password){
      this.setState({
        error: '用户名或密码不正确，请重新输入'
      })
    } else {
      userLogin(this.state.username, this.state.password, '','', (err,data) => {
        if(err){
          this.setState({error: err})
          console.log(err);
        } else {
          this.setState({error: null})
          let UserID = data.UserId;
          if(this.state.remeberMe){
            Cookies.set('UserID', UserID, { expires: 7 });
          } else {
            Cookies.set('UserID', UserID);
          }
          console.log('已将用户ID存入cookie, cookie是：');
          console.log(Cookies.get('UserID'));
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
            }
          })
          getUserActivities(UserID, (err,data) => {
            if(err){console.log(err)} else {
              data.UserActivityList.map((item,ii)=>{
                this.props.baoming(item.ZET_ID)
              })
            }
          })
          browserHistory.push('/')
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
            <FormItem label="账户">
              <Input placeholder="请输入账户名"
                onChange={(e)=>{this.setState({username: e.target.value})}}
              />
            </FormItem>
            <FormItem label="密码">
              <Input type="password" placeholder="请输入密码"
                onChange={(e)=>{this.setState({password: e.target.value})}}
              />
            </FormItem>
            <FormItem>
              <Checkbox onChange={(e)=>{this.setState({remeberMe: e.target.checked})}}>
                记住我
              </Checkbox>
            </FormItem>
            <h5 style={{color:'#e33', marginBottom: '20px'}}>{this.state.error || ''}</h5>
            <Button type="primary" htmlType="submit">登录</Button>
          </Form>
          <h5 style={{marginTop: '20px'}}>还没有帐号？去<a onClick={e => browserHistory.push('/register')}>注册</a></h5>
        </div>
      </div>
    );
  }
}

Login = Form.create()(Login);

function mapStateToProps(store){
  return {
    userinfo: store.user
  }
}
function mapDispatchToProps(dispatch){
  return {
    login: (userid,userdata) => {dispatch({type:'LOG_IN', userid: userid, userdata: userdata})} ,
    baoming: (id) => {dispatch({type:'JOIN_ACTIVITY', id: id})} ,
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login)
