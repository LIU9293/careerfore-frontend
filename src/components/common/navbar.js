import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Badge, Button,Dropdown, } from 'antd';
import { browserHistory } from 'react-router';
import { secretaryMessage } from '../../vendor/connection';
import Search from './searchInput';
import style from './showSelectOptions.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const styles = {
  menuItem: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  newsBox: {
    height: '280px',
    width: '260px',
    position: 'absolute',
    overflow: 'auto',
    zIndex: '99999',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    right: '0',
  },
  newsRow: {
    width: '100%',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  newsBoxNoMessage: {
    lineHeight: '260px',
    textAlign: 'center',
  },
  logo:{
    paddingTop: '20px',
    paddingBottom: '10px',
    position:'absolute',
  },
};


class Navbar extends Component{

  constructor(props){
    super(props);
    this.state = {
      currentMenu: 'home',
      showMessage: false,
    }
    this.closeMessageBox = () => {
      this.setState({
        showMessage: false
      })
    }
  }

  componentDidMount(){
    if(this.props.user.login){
      this.loadUnreadMessages();
    }
    document.getElementsByClassName('main')[0].addEventListener('click', this.closeMessageBox);
  }

  componentWillUnmount(){
    document.getElementsByClassName('main')[0].removeEventListener('click', this.closeMessageBox);
  }

  componentWillReceiveProps(nextProps){
    if((nextProps.user.userid !== this.props.user.userid) && nextProps.user.login){
      this.loadUnreadMessages();
    }
  }

  loadUnreadMessages(){
    secretaryMessage(this.props.user.userid, 'No', (err,data)=>{
      if(err){
        if(err !== '没有数据'){
          console.log(err);
        }
      } else {
        this.props.updateSecretaryMessage(data.List);
      }
    });
  }

  readaMessage(id, objid, type){
    this.props.readaMessage(id);
    this.setState({showMessage: false});
    switch (type) {
      case '帖子':
        browserHistory.push('/discover/' + objid);
        break;
      case '活动':
        browserHistory.push('/activity/' + objid);
        break;
      case '个推':
        break;
      default:
        break;
    }
  }

  clearMessage(){
    this.props.clearSecretaryMessage();
    this.setState({
      showMessage: false
    })
  }

  handleClick(e){
    if(e.key !== '/search' && e.key !== '/message'){
      this.setState({
        currentMenu: e.key
      });
      browserHistory.push(e.key)
    }
  }

  render(){
    if(this.props.user.login){
      let news = null;
      if(this.props.secretaryMessage.UnreadMessages !== 0){
        news = this.props.secretaryMessage.data.map((item,ii)=>{
          return(
            <a key={ii} onClick={this.readaMessage.bind(this,item.ZTMT_ID, item.ZTMT_OBJECTID, item.ZTMT_TYPE)}>
              <div style={styles.newsRow} >
                {item.ZTMT_TITLE}
              </div>
            </a>
          )
        })
      } else {
        news = <div style={styles.newsBoxNoMessage}>
                  还没有消息哦～
               </div>
      }
      return(
        <div className="navbar-container">
          <Menu mode="horizontal" className="navbar" onClick={this.handleClick.bind(this)}>
            <div style={styles.logo}>
            <a href="http://www.careerfore.com"><img  src="http://img.careerfore.com/logo%E5%89%AF%E6%9C%AC.png" style={{width:'160px',}} /></a>
            </div>
            <Menu.Item key="/" style={styles.menuItem} className="menuFound">
              发现
            </Menu.Item>
            <Menu.Item key="/activity" style={styles.menuItem}>
              活动
            </Menu.Item>
            <Menu.Item key={"/user/"+this.props.user.userid}  style={{...styles.menuItem, float:'right'}}>
              <div className="menuProfileArea">
                <a>
                  <img src={this.props.user.userdata.avatar} className="menuProfileAvatar" />
                </a>
              </div>
            </Menu.Item>
            {/*<SubMenu title={<span>发帖</span>} style={{...styles.menuItem, float:'right',}}>
                <Menu.Item key="/new">发布新文章</Menu.Item>
                <Menu.Item key="/newlink">发布新外链</Menu.Item>
            </SubMenu>*/}
            <Menu.Item key="/message" style={{...styles.menuItem, float:'right',borderBottom: 'none'}} >
              <div onClick={(e) => {this.setState({showMessage: !this.state.showMessage})}} >
              {
                this.props.secretaryMessage.UnreadMessages !== 0
                ? <div>消息 <Badge count={this.props.secretaryMessage.UnreadMessages} style={{marginBottom:'3px'}} /></div>
                : <div>消息</div>
              }
              </div>
            </Menu.Item>
            <Menu.Item key="/search" style={{...styles.menuItem, float:'right', borderBottom: 'none'}}>
              <Search />
            </Menu.Item>
            <Menu.Item key="/new" style={{...styles.menuItem, float:'right'}}>
              发布新文章
            </Menu.Item>
            <Menu.Item key="/newlink" style={{...styles.menuItem, float:'right'}}>
              发布新链接
            </Menu.Item>

          </Menu>
          <div style={{maxWidth: '1000px', position: 'relative', margin: 'auto'}}>
            <div style={{...styles.newsBox, display: this.state.showMessage ? 'block' : 'none' }} id="newsBox" >
              { this.props.secretaryMessage.UnreadMessages !== 0
                ? <Button type="ghost" style={{width: '100px',marginTop:'10px',display:'block', marginLeft:'auto',marginRight:'auto'}} onClick={this.clearMessage.bind(this)}>清除所有消息</Button>
                : null
              }
              {
                news
                ? news
                : null
              }
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div className="navbar-container">
          <Menu mode="horizontal" className="navbar" onClick={this.handleClick.bind(this)}>
            <div style={styles.logo}>
            <a href="http://www.careerfore.com"><img  src="http://img.careerfore.com/logo%E5%89%AF%E6%9C%AC.png" style={{width:'160px',}} /></a>
            </div>
            <Menu.Item key="/" style={styles.menuItem} className="menuFound">
              发现
            </Menu.Item>
            <Menu.Item key="/activity" style={styles.menuItem}>
              活动
            </Menu.Item>
            <Menu.Item key="/login" style={{...styles.menuItem, float:'right'}}>
              登录
            </Menu.Item>
            <Menu.Item key="/search" style={{...styles.menuItem, float:'right', borderBottom: 'none'}}>
              <Search />
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
    secretaryMessage: store.secretaryMessage,
  }
}
function mapDispatchToProps(dispatch){
  return {
    updateSecretaryMessage: (data) => {dispatch({type:'UPDATE_SECRETARY_MESSAGE', data: data})} ,
    readaMessage: (id) => {dispatch({type:'READ_A_MESSAGE', id: id})} ,
    clearSecretaryMessage: () => {dispatch({type: 'CLEAR_SECRETARY_MESSAGE'})}
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Navbar)
