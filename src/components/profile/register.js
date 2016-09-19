import React, { Component } from 'react';
import { Form, Input, Button, Checkbox ,message} from 'antd';
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
      limitTime : 0,
      sendBtnEnabled:true,
    }
    this.AllTime = 120;
    this.sendCode = this.sendCode.bind(this);
    this.timeCutDown = this.timeCutDown.bind(this);
    this.regist = this.regist.bind(this);
  }

  //发送验证码
  sendCode(){
    let phone = this.refs.phone.value;
    if(phone.replace(" ","").length === 0){
      message.warn("请输入手机号");return;
    }
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ //手机号码正则
    if(!phone.match(reg)){
      message.error("手机号不合法");return;
    }
    sendSMS(phone, '注册', (err, data)=>{
      if(err){
        message.warn(err);
      }else {
        this.timeCutDown();
      }
    })
  }

  //倒计时
  timeCutDown(){
    this.AllTime -- ;
    if(this.AllTime <= 0){
      this.setState({
        limitTime : 0,
        sendBtnEnabled : true,
      })
      this.AllTime = 120
      return;
    }
    this.setState({
      limitTime : this.AllTime,
      sendBtnEnabled : false,
    })
    setTimeout(()=>{
      this.timeCutDown();
    }, 1000);
  }

  regist(){
    let phone = this.refs.phone.value;//手机号
    if(phone.replace(" ","").length === 0){
      message.warn("请输入手机号");return;
    }
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ //手机号码正则
    if(!phone.match(reg)){
      message.error("手机号不合法");return;
    }
    let vaildCode = this.refs.vaildCode.value;//验证码
    if(vaildCode.replace(" ","").length === 0){
      message.error("请输入验证码");return;
    }
    let userName = this.refs.userName.value; //用户名
    if(userName.replace(" ","").length <2 || userName.replace(" ","").length > 16){
      message.error("用户名的长度不符合");return;
    }
    let pass = this.refs.pass.value;//密码
    let passAgain = this.refs.passAgain.value;//确认密码
    if(pass.replace(" ","").length === 0){
      message.error("请输入有效的密码");return;
    }
    if(pass!== passAgain){
      message.error("两次密码不一致");return;
    }
    userRegister(phone, vaildCode, pass, '', '', (err,data)=>{
      if(err){
        message.error(err);
      }else {
        let UserID = data.UserId;
        updateUserNickName(UserID, userName, (err, data)=>{
            if(err){
              message.warn(err);
            }else {
              getUserInfo(UserID, (err,data) => {
                if(err){
                  message.warn(err);
                } else {
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

  render() {
    const { getFieldProps } = this.props.form;
    return (

      <div style = {styles.mask}>
        <div style = {styles.outer}>
          <div style = {styles.left}>
            <div style = {styles.divout}>
              <span style = {styles.title}>手机号码</span><br/>
              <input type = "tel" maxLength = "11" placeholder = "" ref = "phone" style = {styles.input}/><br/>
              <span style = {styles.alert}>用作登录账号,您的手机号码不会公开</span>
            </div>
            <div style = {styles.divout}>
              <span style = {styles.title}>验证码</span><br/>
              <input type = "tel" placeholder = "" ref = "vaildCode" style = {styles.vildcode}/>
              <Button disabled = {!this.state.sendBtnEnabled} type="primary" size="large" style = {styles.getCode}  onClick = {this.sendCode}>{this.state.limitTime === 0 ?"获取验证码" : this.state.limitTime+" S"}</Button><br/>
              <span style = {styles.alert}>请输入手机收到的验证码</span>
            </div>
            <div style = {styles.divout}>
              <span style = {styles.title}>用户名</span><br/>
              <input type = "text" placeholder = "" ref = "userName" style = {styles.input}/><br/>
              <span style = {styles.alert}>限制长度2到16个字,您可被@用户名提及</span>
            </div>
            <div style = {styles.divout}>
              <span style = {styles.title}>密码</span><br/>
              <input type = "password" placeholder = "" ref = "pass" style = {styles.input}/><br/>
              <span style = {styles.alert}>您的密码长度必须不少于 6 个字符</span>
            </div>
            <div style = {styles.divout}>
              <span style = {styles.title}>确认密码</span><br/>
              <input type = "password" placeholder = "" ref = "passAgain" style = {styles.input}/><br/>
            </div>
            <div style = {{marginTop: '20px'}}>
                <span style = {styles.signBtn} onClick = {this.regist}>马上注册</span>
            </div>
          </div>
          <div style = {styles.right}>
            <div>
              <img src = ""/>
            </div>
            <div>
              <hr />
              <span>使用一下账号直接登陆</span>
            </div>
          </div>
        </div>
      </div>


    );
  }
}


const styles = {
  mask:{
    width: '100%',
    height: '800px',
    marginBottom: '-50px',
    backgroundImage: 'url(http://imageservice.pine-soft.com/3FFDF4B61B124B84B4AE891C7948FFF9.jpg)',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    paddingTop: '100px',
  },outer:{
    padding: '30px',
    background: 'rgb(255, 255, 255)',
    borderRadius: '10px',
    // width: '600px',
    width: '400px',
    margin: 'auto',
    overflow: 'hidden',
  },left:{
    float: 'left',
    // width: '60%'
    width: '100%'
  },right:{
    float:'right',
    width: '35%',
    display:'none'
  },divout:{
    marginBottom: '4px'
  },title:{
    fontSize: '18px',
    color: '#333'
  },input:{
    marginBottom: '5px',
    padding: '5px 10px',
    width: '100%',
    fontSize: '16px'
  },alert:{
    fontSize: '14px',
    color: '#ccc'
  },signBtn:{
    background: '#2db7f5',
    color: '#fff',
    width: '100%',
    display: 'inline-block',
    lineHeight: '40px',
    textAlign: 'center',
    fontSize: '16px',
    boxShadow: '0px 2px 12px #2db7f5',
  },vildcode:{
    marginBottom: '5px',
    padding: '5px 10px',
    width: '36%',
    fontSize: '16px',
  },getCode:{
    float: 'right',
    color: '#2db7f5',
    fontSize: '16px',
    padding: '7px 17px',
    border: '1px solid lightgray',
    cursor: 'pointer',
    marginBottom: '5px',
    background: '#fff',
    borderRadius: '0',
    borderColor: 'lightgray',
    width: '116px',
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
