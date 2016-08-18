import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {  Button, } from 'antd';
import { browserHistory } from 'react-router';

class Home extends Component{

  constructor(props){
    super(props);
    this.state = {
      userinfo: null
    }
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    this.setState({
      userinfo: Cookies.get('UserID')
    })
  }

  logout(){
    Cookies.remove('UserID');
    browserHistory.push('/');
  }

  render(){
    console.log(this.props.userinfo)
    return(
      <div style={{textAlign:'center',padding:'30px'}}>
        <h1 style={{textAlign:'center'}}>hello {this.state.userinfo || ''}</h1>
        <Button type="ghost" style={{margin:'auto',display:'block'}} onClick={this.logout}>注销</Button>
      </div>
    )
  }

}

module.exports = Home
