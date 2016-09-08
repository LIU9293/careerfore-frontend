import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import style from './APP.css';
import Cookies from 'js-cookie';
import { getUserInfo, getUserActivities, getPlaygroundList } from '../vendor/connection';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Navbar from './common/navbar';
import Loading from './loading';
import Footer from './common/footer';

const styles = {
  wapper: {
    backgroundColor: '#f9f9f9',
    paddingBottom: '50px'
  }
}

class home extends Component{

  constructor(props){
    super(props);
    this.state = {
      rightMenuItem: <a href="/login">登录</a>,
    }
  }

  componentWillMount(){
    let userid = Cookies.get('UserID');
    if(userid !== undefined){
      this.props.login(userid, {});
      getUserInfo(userid, (err,data) => {
        if(err){
          console.log(err);
        } else {
          console.log(data)
          let userData = {
            avatar: data.ZUT_HEADIMG,
            nickName: data.ZUT_NICKNAME,
            phone: data.ZUT_PHONE,
            userDesc : data.UserDes
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
          this.props.addAvailableCity(item.CityID);
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
        <Loading />
        <div style={{...styles.wapper, display: this.props.loading ? 'none' : 'block'}}>
          <Navbar />
          <div className="main" >
            {this.props.children}
          </div>
        </div>
        <Footer />
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
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
    addAvailableCity: (cityID) => {dispatch({type:'UPDATE_AVAILABLE_CITY', cityID: cityID })},
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(home)
