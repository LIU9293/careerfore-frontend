import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import style from './APP.css';
import Cookies from 'js-cookie';
import { getUserInfo } from '../vendor/connection';
import { connect } from 'react-redux';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class home extends Component{

  constructor(props){
    super(props);
    this.state = {
      rightMenuItem: <a href="/login" target="_blank">登录</a>,
    }
  }

  componentDidMount(){
    let userid = Cookies.get('UserID');
    console.log(userid);
    if(userid !== undefined){
      this.props.login(userid);
      getUserInfo(userid, (err,data) => {
        if(err){
          console.log(err);
        } else {
          let avatar = data.ZUT_HEADIMG,
              nickName = data.ZUT_NICKNAME,
              phone = data.ZUT_PHONE;
          this.setState({
            rightMenuItem:  <div className="menuProfileArea">
                              <a href={'/my/'+ userid } >
                                <img src={avatar} className="menuProfileAvatar" />
                              </a>
                            </div>
          });
        }
      })
    }
  }

  

  render(){
    return(
      <div>
        <div className="navbar-container">
          <Menu mode="horizontal" className="navbar">
            <Menu.Item key="home">
              <a href="/" target="_blank">主页</a>
            </Menu.Item>
            <Menu.Item key="activity">
              <a href="/activity" target="_blank">活动</a>
            </Menu.Item>
            <SubMenu title={<span>发现</span>}>
              <Menu.Item key="discover:1">
                <a href="/discover" target="_blank">发现</a>
              </Menu.Item>
              <Menu.Item key="discover:2">选项2</Menu.Item>
              <Menu.Item key="discover:3">选项3</Menu.Item>
              <Menu.Item key="discover:4">选项4</Menu.Item>
            </SubMenu>
            <Menu.Item key="profile" style={{float: 'right'}}>
              {this.state.rightMenuItem || ''}
            </Menu.Item>
          </Menu>
        </div>
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
    userinfo: store.user
  }
}
function mapDispatchToProps(dispatch){
  return {
    login: (userid) => {dispatch({type:'LOG_IN', userid:userid})}
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(home)
