import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserInfo from '../common/UserCenter/userInfo';
import ArticleList from '../common/UserCenter/articleList';
import { getUserArticles,getUserInfo } from '../../vendor/connection';
import { Row, Col, Icon, Button, Carousel, Collapse, Calendar, BackTop, Spin, Tooltip, message ,Tabs} from 'antd';

const styles = {
  father:{
    textAlign:'center',
  },showPhoto:{
    width:'100%',
    background:'#000',
    textAlign:'center',
    display:'none',
  },container:{
    width: '1000px',
    margin: 'auto',
    paddingTop: '30px',
    paddingBottom: '30px',
    textAlign: 'left',
  },Main:{
    width: '650px',
    display: 'inline-block',
    position: 'relative',
  },silder:{
    width: '330px',
    marginLeft:'20px',
    display: 'inline-block',
    position: 'absolute',
  } ,upScroll:{
      height: '40px',
      width: '40px',
      lineHeight: '40px',
      borderRadius: 4,
      backgroundColor: '#57c5f7',
      color: '#fff',
      textAlign: 'center',
      fontSize: '20px',
    }
}

const TabPane = Tabs.TabPane;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherUserData:null,
      articleData:null
    }
  }

  componentDidMount(){
    let uid = this.props.params.userid;
    if(uid === null || uid === undefined){
      alert("页面缺少必要参数");
      window.history.go(-1);
    }else {
      // this.props.startLoading();//开始loading
      getUserInfo(uid,(err,data)=>{
        // this.props.stopLoading();//结束loading
        if(err){
          message.warn(err);
        }else {
          this.otherUserData = data;
          getUserArticles(uid,(err,data2)=>{
            if(err){
              message.warn(err);
            }else {
              this.setState({
                otherUserData:data,
                articleData:data2.UserArticleList
              })
            }
          })
        }
      })
    }
  }
  tabsChanges(key){
    console.log(key)
  }

  render(){
    if(this.state.otherUserData){
      return(
        <div style = {styles.father}>
          <div style = {styles.showPhoto}>
            {/*<img src = "http://imageservice.pine-soft.com/BEEB0A3FCF0747FD938D42FDAC3D48BB.jpg" />*/}
          </div>
          <div style ={styles.container}>
            <div style = {styles.Main}>
              <UserInfo userinfo = {this.state.otherUserData}/>
              <Tabs defaultActiveKey="1" onChange={this.tabsChanges.bind(this)} style = {{marginTop:'15px'}}>
                <TabPane tab="他的文章" key="1">
                  <ArticleList articleList = {this.state.articleData}/>
                </TabPane>
                <TabPane tab="他的活动" key="2">选项卡二内容</TabPane>
                <TabPane tab="他的收藏" key="3">选项卡三内容</TabPane>
              </Tabs>
            </div>

            <div style = {styles.silder}>
            </div>
          </div>
          <BackTop style={{ bottom: 100 }}>
            <div className="upScroll">UP</div>
          </BackTop>
        </div>
      )
    }else {
      return(<div />)
    }

  }
}


function mapDispatchToProps(dispatch){
  return{
    updateDiscoverListData: (data) => {dispatch({type:'UPDATE_DISCOVER_LIST_DATA',data: data })},
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
  }
}
module.exports = connect(mapDispatchToProps)(HomePage)
