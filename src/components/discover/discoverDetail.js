import React, { Component } from 'react';
import { getDiscoverPost,addComment,AddCTR,Collect } from '../../vendor/connection/index';
import { Row, Col ,Button,message} from 'antd';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import style from './discoverDetail.css';
import {millseconds2DateDiff} from '../../vendor/helper/timeTransfer';
import DiscoverDetailFoot from './discoverDetailFoot';
import SimpEditor from './PostArticle';
import Zan from '../common/zan';
import Collection from '../common/collect';

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

  componentDidMount(){
    this.loadData();
    this.addReadNum();
  }

  chooseFid(fid){
    this.props.UPDATE_QUEPARAM("","","","");
  }

  collecPost(objid){
    if(this.props.user.userid === undefined){
      alert("请登录");
    }else {
      this.setState({collectNum:(this.state.collectNum + 1)});
      message.success('收藏成功');
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
        }else {
          console.log(data)
          this.setState({postData:data,collectNum:data.PostosInfo.CollectionNumbers});
          this.props.UPDATE_LIKE(data.PostosInfo.PostID,data.IsLike,data.PostosInfo.LikeNum);
          this.props.UPDATE_COLLECT(data.PostosInfo.PostID,data.IsCollect,data.PostosInfo.CollectionNumbers);
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
          <div>
            <div className="box-content" style={{backgroundImage:bg}}></div>
            <div className="content" style={{maxWidth:'1000px',margin:'auto'}}>
                <h1 className="title">{info.PostsTitle}</h1>
                <div className="postcontent">
                  <div className="userinfo">
                      <img className = "userphoto" src={info.UserHeadUrl}  />
                      <div className = "introduction">
                          <span>{name}&nbsp;&nbsp;·&nbsp;&nbsp; {info.ChannelName}&nbsp;&nbsp;·&nbsp;&nbsp;{time}</span>
                      </div>
                  </div>
                  <div onClick = {this.chooseFid.bind(this,info.PostID)} id="content" className="pageContent" dangerouslySetInnerHTML = {{__html : info.Content || ''}}>
                  </div>
                </div>
                <div id="like" className="like" style = {{maxWidth:'750px',margin:'0 auto',paddingBottom:'30px',marginTop: '30px'}}>
                  <div >
                      <Zan float = {""} objid = {info.PostID} type={0}/>
                      &nbsp;&nbsp;
                      {/*<Collection float = {""} objid = {info.PostID} type={0}/>*/}
                      <span style = {{float:'right',fontSize: '14px',color: '#999', lineHeight: '100px'}}>
                      阅读&nbsp;({info.ReadNum})
                      </span>
                  </div>
                </div>
                <DiscoverDetailFoot ref = "discoverDetailFoot" postid={this.props.params.discoverID} callback={this.getClickComment}/>
            </div>

          </div>
        )
        return(
          <div>
            {con}
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
    UPDATE_QUEPARAM:(userName,objFatherid,objid,fatherName)=>{dispatch({type:'UPDATE_QUEPARAM',userName:userName,objFatherid:objFatherid,objid:objid,fatherName:fatherName})},
    UPDATE_LIKE:(objid,isliked,num)=>{dispatch({type:"UPDATE_LIKE",objid:objid,isliked:isliked,num:num})},
    UPDATE_COLLECT:(objid,iscollect,num)=>{dispatch({type:"UPDATE_COLLECT",objid:objid,iscollect:iscollect,num:num})},
  }
}

const success = function () {
  message.success('收藏成功');
};

module.exports = connect(mapStateToProps,mapDispatchToProps)(DiscoverDetail)

// const styles = {
//   cover:{
//     display:'none',
//     position: 'fixed',
//     width: '100%',
//     height: '100%',
//     top: '0',
//     left: '0',
//     textAlign: 'center',
//     background: 'rgba(0,0,0,.2)',
//   },alert:{
//     position: relative;
// padding: 20px 50px;
// background: rgba(0,0,0,.7);
// line-height: 50px;
// color: #fff;
// font-size: 25px;
// border-radius: 8px;
// top: 40%;
//   }
// }
//<i className="collect_icon"></i>收藏·{this.state.collectNum}
/*
<div style = {styles.cover} ref = "cover">
  <span style = {styles.alert}>收藏成功</span>
</div>
*/

/*
<div id="like" className="like">
  <div className="Postlike">
      <span className="love">
        <Zan float = {fl} className ="love_icon" objid = {info.PostID} isLiked = {true} baseNum = {info.LikeNum} type={0}/>
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span className="collect" onClick = {this.collecPost.bind(this,info.PostID)}>
      <i className="collect_icon"></i>收藏·{this.state.collectNum}
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;阅读数·{info.ReadNum}
  </div>
</div>
*/
