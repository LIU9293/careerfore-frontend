import React, { Component } from 'react';
import { getDiscoverPost,addComment,AddCTR,Collect } from '../../vendor/connection/index';
import { Row, Col ,Button} from 'antd';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import style from './discoverDetail.css';
import {millseconds2DateDiff} from '../../vendor/helper/timeTransfer';
import DiscoverDetailFoot from './discoverDetailFoot';
import SimpEditor from './PostArticle';
import Zan from '../common/zan';

class DiscoverDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      postData:null,
      loadContent:"Loading...",
      collectNum:0,
    }
    this.postsId = 0;
    this.loadData = this.loadData.bind(this);
    this.addReadNum = this.addReadNum.bind(this);
  }

  componentWillMount(){
    this.props.startLoading();
  }

  componentWillMount(){
    this.props.startLoading();
  }

  componentDidMount(){
    this.loadData();
    this.addReadNum();
  }

  chooseFid(fid){
    this.props.UPDATE_QUEPARAM("","","","");
    // console.log(this.refs.discoverDetailFoot);
    // this.setState({objFatherid:"",objid:"",userName:""});
  }

  collecPost(objid){
    if(this.props.user.userid === undefined){
      alert("请登录");
    }else {
      this.setState({collectNum:(this.state.collectNum ++)},()=>{console.log("****" + this.state.collectNum)})
      Collect(this.props.user.userid,objid,0,(err,data)=>{
        if(err){
          console.log(err);
        }else {
          console.log(data);
        }
      })
    }
  }

  loadData(){
    let userid = "";
    if(this.props.user.userid !== undefined)
    {
      userid =this.props.user.userid;
    }
    getDiscoverPost(this.props.params.discoverID,userid,(err,data)=>{
        if(err){
          console.log(err);
        }else {
          console.log(data);
          this.setState({postData:data,collectNum:data.PostosInfo.CollectionNumbers});
          this.props.stopLoading();
        }
    })
  }

  addReadNum(){
    var userid = "";
    if(this.props.user.userid !== undefined)
    {
      userid = this.props.user.userid;
    }
    AddCTR(userid,this.props.params.discoverID,(err,data)=>{
      if(err){
        console.log(err);
      }else {
        console.log(data);
      }
    })
  }

  render(){
    if(this.state.postData){
      let post = this.state.postData;
      let info = post.PostosInfo;
      if(post.PostosInfo === undefined){
        return(
          <div component="topic/deleted/message" className="alert alert-warning">此主题已被删除。只有拥有主题管理权限的用户可以查看。</div>
        )
      }else {
        let bg = 'url(' + info.PostsFrontCover + ')';
        let time = millseconds2DateDiff(info.PostsDate);
        let name = info.UserName === "管理员"?"小C" :info.UserName;
        let fl = "left";
        let con = (
          <div className="content">
              <div className="box-content" style={{backgroundImage:bg, width:'150%'}}></div>
              <h1 className="title">{info.PostsTitle}</h1>
              <div className="postcontent">
                <div className="userinfo">
                    <img className = "userphoto" src={info.UserHeadUrl}  />
                    <div className = "introduction">
                        <span>{name} - {info.ChannelName} - {time}</span>
                    </div>
                </div>
                <div onClick = {this.chooseFid.bind(this,info.PostID)} className="pageContent" dangerouslySetInnerHTML = {{__html : info.Content || ''}}>
                </div>
              </div>
              <div id="like" className="like">
                <div className="Postlike">
                    <span className="love">
                      <Zan float = {fl} className ="love_icon" objid = {info.PostID} isLiked = {true} baseNum = {info.LikeNum} type={0}/>
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="collect" onClick = {this.collecPost.bind(this,info.PostID)}>
                    <i className="collect_icon"></i>收藏·{this.state.collectNum}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;阅读数·{info.ReadNum}
                </div>
              </div>
              <DiscoverDetailFoot ref = "discoverDetailFoot" postid={this.props.params.discoverID} callback={this.getClickComment}/>
          </div>
        )
        return(
          <div style={{maxWidth:'1000px',margin:'auto'}}>
            <Row>
              <Col xs = {24} md ={16} >
                {con}
              </Col>
              <Col xs = {24} md ={8} >
              </Col>
            </Row>
          </div>
        )
      }
    }else {
      return(
        <div>
          <h1 style={{textAlign: 'center'}}>loading...</h1>
        </div>
      )
    }
  }
}

function mapStateToProps(store){
  return {
    user: store.user
  }
}
function mapDispatchToProps(dispatch){
  return {
    insertTopLevelComment: (commentData,postID) => {dispatch({type:'INSERT_TOP_LEVEL_COMMENT', commentData: commentData, postID: postID})},
    insertSecondLevelComment: (ID,commentData,postID) => {dispatch({type:'INSERT_SECOND_LEVEL_COMMENT', commentData: commentData, ID:ID, postID: postID})},
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
<<<<<<< HEAD
    UPDATE_QUEPARAM:(userName,objFatherid,objid,fatherName)=>{dispatch({type:'UPDATE_QUEPARAM',userName:userName,objFatherid:objFatherid,objid:objid,fatherName:fatherName})},
=======
>>>>>>> master
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(DiscoverDetail)
