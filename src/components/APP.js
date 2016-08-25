import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import style from './APP.css';
import Cookies from 'js-cookie';
import { getUserInfo, getUserActivities, getPlaygroundList } from '../vendor/connection';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Navbar from './common/navbar';

class home extends Component{

  constructor(props){
    super(props);
    this.state = {
      rightMenuItem: <a href="/login">登录</a>,
    }
  }

  componentDidMount(){
    let userid = Cookies.get('UserID');
    if(userid !== undefined){
      getUserInfo(userid, (err,data) => {
        if(err){
          console.log(err);
        } else {
          console.log(data)
          let userData = {
            avatar: data.ZUT_HEADIMG,
            nickName: data.ZUT_NICKNAME,
            phone: data.ZUT_PHONE
          }
          this.props.login(userid, userData);
        }
      })
      getUserActivities(userid, (err,data) => {
        if(err){console.log(err)} else {
          data.UserActivityList.map((item,ii)=>{
            this.props.baoming(item.ZET_ID)
          })
        }
      })
    }
    getPlaygroundList('', 1, 1000, (err,data)=>{
      if(err){console.log(err)} else {
        data.map((item,ii)=>{
          if(item.ActivityState.trim() == '已结束'){
            this.props.closeActivity(item.ActivityID)
          }
        })
      }
    })
  }

  render(){
    return(
      <div>
        <Navbar />
        <div className="main" >
          {this.props.children}
        </div>
        <div className="footer-container">
          <div className="footer">
            <h5 style={{textAlign:'center'}}>careerfore - the missing piece of higher education</h5>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(store){
  return {
    userinfo: store.user,
    joinedActivity: store.yibaoming
  }
}
function mapDispatchToProps(dispatch){
  return {
    login: (userid,data) => {dispatch({type:'LOG_IN', userid:userid, userdata:data})} ,
    baoming: (id) => {dispatch({type:'JOIN_ACTIVITY', id: id})} ,
    closeActivity: (id) => {dispatch({type:'ADD_CLOSED', id: id})},
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(home)
