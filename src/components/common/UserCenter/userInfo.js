import React, { Component } from 'react';
import { connect } from 'react-redux';

const styles = {
  info:{
    textAlign: 'left',
    background: '#fff',
    boxShadow: '0 1px 5px 0px rgba(0,0,0,.2)',
    // padding: '10px'
  },header:{
    width: '100px',
    borderRadius: '50px',
  },rightCover:{
    margin: '-105px 0 0 120px',
    minHeight: '100px',
  },nickname:{
    fontWeight: 'bold',
    fontSize: '18px',
    color:'#333',
  },userSign:{
    fontSize: '18px',
    color: '#999'
  }
}

class UserInfo extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    let userin = this.props.userinfo;
    return (
      <div style = {styles.info}>
        <div style = {{borderBottom:'1px solid lightgray',padding:'16px'}}>
          <img style = {styles.header} src = {userin.ZUT_HEADIMG}/>
          <div style = {styles.rightCover}>
            <label style = {styles.nickname}>{userin.ZUT_NICKNAME}</label><br/>
            <label style = {styles.userSign}>{userin.UserDes}</label>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = UserInfo
