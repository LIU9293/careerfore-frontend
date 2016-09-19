import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserInfo from '../common/UserCenter/userInfo';
import ArticleList from '../common/UserCenter/articleList';
import { getUserArticles,getUserInfo ,getUserCollection,getUserActivities} from '../../vendor/connection';
import { Row, Col, Icon, Button, Carousel, Collapse, Calendar, BackTop, Spin, Tooltip, message ,Tabs} from 'antd';
import s from './homePage.css';
import ActivityList from '../common/activityList';
import CollectionList from '../common/UserCenter/collectionList';
import ArticleLists from '../common/UserCenter/activityList'
import Setting from './include/setting';
import Message from './include/message';

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
      articleData:[],
      activityData:[],
      collectData:[],
    }
    this.loadArticle = this.loadArticle.bind(this);
    this.loadActivity = this.loadActivity.bind(this);
    this.loadCollection = this.loadCollection.bind(this);
  }

  componentDidMount(){
    let uid = this.props.params.userid;
    if(uid === null || uid === undefined || uid === ""){
      alert("页面缺少必要参数");
      window.history.go(-1);
    }else {
      // this.props.startLoading();//开始loading
      getUserInfo(uid,(err,data)=>{
        // this.props.stopLoading();//结束loading
        if(err){
          message.warn(err);
        }else {
          this.setState({
            otherUserData:data,
          })
          this.loadArticle(uid);
        }
      })
    }
  }
  //加载发表的文章
  loadArticle(uid){
    getUserArticles(uid,(err,data)=>{
      if(err){
        message.warn(err);
      }else {
        console.log(data)
        this.setState({
          articleData:data.UserArticleList
        })
      }
    })
  }

  //加载活动的列表
  loadActivity(uid){
    getUserActivities(uid,(err,data)=>{
      if(err){
        message.warn(err);
      }else {
        console.log(data)
        this.setState({
          activityData:data.UserActivityList
        })
      }
    })
  }

  //加载收藏的列表
  loadCollection(uid){
      getUserCollection(uid,(err,data)=>{
        if(err){
          message.warn(err);
        }else {
          console.log(data)
          this.setState({
            collectData:data.UserCollectList
          })
        }
      })
  }

  ///tab改变时出发这个事件
  tabsChanges(key){
    switch (key) {
      case "1"://加载发表的文章
        if(this.state.otherUserData.length === 0){
          this.loadArticle(this.props.params.userid)
        }
        break;
      case "2"://加载活动的列表
          if(this.state.activityData.length === 0){
            this.loadActivity(this.props.params.userid)
          }
          break;
      case "3"://加载收藏的列表
          if(this.state.collectData.length === 0){
            this.loadCollection(this.props.params.userid)
          }
        break;
      default:

    }
  }

  render(){
    if(this.state.otherUserData && this.props.params.userid !== this.props.user.userid){
      return(
        <div style = {styles.father}>
          <div style = {styles.showPhoto}>
            {/*<img src = "http://imageservice.pine-soft.com/BEEB0A3FCF0747FD938D42FDAC3D48BB.jpg" />*/}
          </div>
          <div style ={styles.container}>
            <div style = {styles.Main}>
              <UserInfo userinfo = {this.state.otherUserData}/>
                <Tabs defaultActiveKey="1" onChange={this.tabsChanges.bind(this)} style = {{marginTop:'15px',boxShadow:'rgba(0, 0, 0, 0.2) 0px 1px 5px 0px',background: '#fff'}}>
                  <TabPane tab="他的文章" key="1">
                    <ArticleList articleList = {this.state.articleData}/>
                  </TabPane>
                  <TabPane tab="他的活动" key="2">
                    <ArticleLists articleLists = {this.state.activityData}/>
                  </TabPane>
                  <TabPane tab="他的收藏" key="3">
                    <CollectionList collectionData = {this.state.collectData}/>
                  </TabPane>
                </Tabs>
            </div>
            <div style = {styles.silder}>
            </div>
          </div>
          <BackTop style={{ bottom: 230 }}>
            <div className="upScroll">UP</div>
          </BackTop>
        </div>
      )
    }else if(this.state.otherUserData && this.props.params.userid === this.props.user.userid){
      return(
        <div style = {styles.father}>
          <div style = {styles.showPhoto}>
            {/*<img src = "http://imageservice.pine-soft.com/BEEB0A3FCF0747FD938D42FDAC3D48BB.jpg" />*/}
          </div>
          <div style ={styles.container}>
            <div style = {styles.Main}>
              <UserInfo userinfo = {this.state.otherUserData}/>
                <Tabs defaultActiveKey="1" onChange={this.tabsChanges.bind(this)} style = {{marginTop:'15px',boxShadow:'rgba(0, 0, 0, 0.2) 0px 1px 5px 0px',background: '#fff'}}>
                  <TabPane tab="我的文章" key="1">
                    <ArticleList articleList = {this.state.articleData}/>
                  </TabPane>
                  <TabPane tab="我的活动" key="2">
                    <ArticleLists articleLists = {this.state.activityData}/>
                  </TabPane>
                  <TabPane tab="我的收藏" key="3">
                    <CollectionList collectionData = {this.state.collectData}/>
                  </TabPane>
                  <TabPane tab="设置" key="4">
                    <Setting />
                  </TabPane>
                  <TabPane tab="消息" key="5">
                    <Message />
                  </TabPane>
                </Tabs>
            </div>
            <div style = {styles.silder}>
            </div>
          </div>
          <BackTop style={{ bottom: 230 }}>
            <div className="upScroll">UP</div>
          </BackTop>
        </div>
      )
    }
    else {
      return(<div />)
    }

  }
}


function mapStateToProps(store){
  return{
    activityListData: store.activityListData.data ,
    user: store.user ,
  }
}
function mapDispatchToProps(dispatch){
  return{
    updateActivityListData: (data) => {dispatch({type:'UPDATE_ACTIVITY_LIST_DATA',data: data })} ,
    startLoading: () => {dispatch({type:'START_LOADING'})} ,
    stopLoading: () => {dispatch({type:'STOP_LOADING'})} ,
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(HomePage)
