import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {  Button, Menu, Icon, Row, Col } from 'antd';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { getUserInfo, activityMessage, unreadMessage, unreadMessageContent } from '../../vendor/connection';
import BlurImg from '../common/blurimg';
import Message from './include/message';
import Article from './include/article';
import Activity from './include/activity';
import Setting from './include/setting';
import Collect from './include/collect';

class Home extends Component{

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      Menulist: {
        message: <Message /> ,
        article: <Article /> ,
        collect: <Collect /> ,
        activity: <Activity /> ,
        setting: <Setting />
      },
      current: <Collect />
    }
  }

  componentDidMount(){
    if(this.props.userinfo.login == false && !Cookies.get('UserID')){
      this.redirect2login();
    }
  }

  redirect2login(){
    browserHistory.push('/login');
  }

  handleClick(e){
    this.setState({
      current: this.state.Menulist[e.key]
    });
  }

  render(){
    return(
      <div>
        <div style={{width:'100%', height:'200px', overflow:'hidden'}}>
          <BlurImg src="http://img.careerfore.com/campus.jpg" />
        </div>
        <Row style={{maxWidth: '1000px', margin:'auto'}}>
          <Col xs={6}>
            <Menu mode="inline" onClick={this.handleClick} selectedKeys={[this.state.currentMenu]} style={{width:'200px',marginTop:'30px'}}>
              <Menu.Item key="message">
                通知
              </Menu.Item>
              <Menu.Item key="article">
                文章
              </Menu.Item>
              <Menu.Item key="activity">
                活动
              </Menu.Item>
              <Menu.Item key="collect">
                收藏
              </Menu.Item>
              <Menu.Item key="setting">
                设置
              </Menu.Item>
            </Menu>
          </Col>
          <Col xs={18}>
            {this.state.current}
          </Col>
        </Row>
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
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Home)
