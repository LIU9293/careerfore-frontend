import React, { Component } from 'react';
import { connect } from 'react-redux';
import AvatarEditor from "react-avatar-editor";
import { Button, message, Modal } from 'antd';

class BaseInfo extends Component {
  constructor(props) {
    super(props)
  }


  render(){
    return (
      <div>

      </div>
    )
  }
}

function mapStateToProps(store){
  return {
    userinfo: store.user
  }
}

function mapDispatchToProps(dispatch){
  return {
    login: (userid,data) => {dispatch({type:'LOG_IN', userid:userid, userdata:data})} ,
    logout: () => {dispatch({type:'LOG_OUT'})},
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(BaseInfo)
