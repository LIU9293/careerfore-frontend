import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import { browserHistory } from 'react-router';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const style = {
  menuItem: {
    paddingTop: '10px',
    paddingBottom: '10px',
  }
};

class Navbar extends Component{

  constructor(props){
    super(props);
    this.state = {
      currentMenu: 'home',
    }
  }

  handleClick(e){
    this.setState({
      currentMenu: e.key
    });
    browserHistory.push(e.key)
  }

  render(){
    if(this.props.user.login){
      return(
        <div className="navbar-container">
          <Menu mode="horizontal" className="navbar" onClick={this.handleClick.bind(this)}>
            <Menu.Item key="/" style={style.menuItem}>
              主页
            </Menu.Item>
            <Menu.Item key="/activity" style={style.menuItem}>
              活动
            </Menu.Item>
            <Menu.Item key="/discover" style={style.menuItem}>
              发现
            </Menu.Item>
            <Menu.Item key="/profile"  style={{...style.menuItem, float:'right'}}>
              <div className="menuProfileArea">
                <a>
                  <img src={this.props.user.userdata.avatar} className="menuProfileAvatar" />
                </a>
              </div>
            </Menu.Item>
          </Menu>
        </div>
      )
    } else {
      return(
        <div className="navbar-container">
          <Menu mode="horizontal" className="navbar" onClick={this.handleClick.bind(this)}>
            <Menu.Item key="/" style={style.menuItem}>
              主页
            </Menu.Item>
            <Menu.Item key="/activity" style={style.menuItem}>
              活动
            </Menu.Item>
            <Menu.Item key="/discover" style={style.menuItem}>
              发现
            </Menu.Item>
            <Menu.Item key="/login" style={{...style.menuItem, float:'right'}}>
              登录
            </Menu.Item>
          </Menu>
        </div>
      )
    }
  }

}

function mapStateToProps(store){
  return {
    user: store.user,
  }
}

module.exports = connect(mapStateToProps)(Navbar)
