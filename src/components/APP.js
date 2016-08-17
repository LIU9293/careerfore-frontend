import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class home extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <Menu onClick={this.handleClick}
          mode="horizontal"
        >
          <Menu.Item key="home">
            <a href="/" target="_blank">主页</a>
          </Menu.Item>
          <Menu.Item key="activity">
            <a href="/activity" target="_blank">活动</a>
          </Menu.Item>
          <Menu.Item key="found">
            <a href="/discover" target="_blank">发现</a>
          </Menu.Item>
        </Menu>
        {this.props.children}
      </div>
    )
  }
}

module.exports = home
