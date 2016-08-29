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
      userName : "",
      objFatherid:"",
      objid:"",
      fatherName:"",
      collectNum:0,
    }
    this.postsId = 0;
    this.loadData = this.loadData.bind(this);
    this.getClickComment = this.getClickComment.bind(this);
    this.addReadNum = this.addReadNum.bind(this);
    this.addComments = this.addComments.bind(this);
  }

  componentDidMount(){
    this.loadData();
    this.addReadNum();
  }

  chooseFid(fid){
    this.setState({objFatherid:""});
    this.setState({objid:""});
    this.setState({userName:""});
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

  getClickComment(fatherid,objid,username,fatherName,uid){
    if(this.props.user.userid === undefined || this.props.user.userid === null){
      browserHistory.push(`/login`);
    }else {
      if(uid === this.props.user.userid){
        //alert("不能给自己回复评论");
      }else {
        this.setState({
          objFatherid:fatherid,
          objid:objid,
          fatherName:fatherName
        });
        let reply =  "回复:"+username;
        this.setState({userName:reply});
        window.scrollBy(0,document.getElementById('comment').offsetTop);
      }
    }
  }

  addComments(){
    console.log(this.props.user.userid )
    if(this.props.user.userid === undefined){
      browserHistory.push(`/login`);
    }else {
      let commentContent = this.refs.textArea.value;
      if(commentContent.replace(' ','').length === 0){
        console.log("请输入有效的评论");
      }else {
        addComment(this.props.user.userid,this.postsId,this.state.objFatherid,commentContent,this.state.objid,(err,data)=>{
          if(err){
            console.log(err);
          } else {
            console.log('this.state.objFatherid',this.state.objFatherid)
            if(this.state.objFatherid==''){
              this.props.insertTopLevelComment({
                ChildList:[],
                Content:commentContent,
                HeadImg: this.props.user.userdata !== null ?this.props.user.userdata.avatar :"http://imageservice.pine-soft.com/logo.png",
                ID: Math.random().toString(),
                IsLike:0,
                Level:1,
                Phone:this.props.user.userdata !== null ?this.props.user.userdata.phone:"",
                PostID:this.postsId,
                PraiseNumbers:0,
                ReleaseTime:'/Date('+ new Date().getTime() + ')/',
                ReplyNumbers:0,
                ResultCode:0,
                UserID:this.props.user.userid,
                UserNickName:this.props.user.userdata.nickName,
              },this.postsId)
            } else {
              this.props.insertSecondLevelComment(this.state.objid,{
                Content:commentContent,
                HeadImg: this.props.user.userdata !== null ?this.props.user.userdata.avatar :"http://imageservice.pine-soft.com/logo.png",
                ID: Math.random().toString(),
                IsLike:0,
                Level:2,
                Phone:this.props.user.userdata !== null ?this.props.user.userdata.phone:"",
                PostID:this.postsId,
                PraiseNumbers:0,
                ReleaseTime:'/Date('+ new Date().getTime() + ')/',
                ReplyNumbers:0,
                ResultCode:0,
                UserID:this.props.user.userid,
                UserNickName:this.props.user.userdata.nickName,
                fatherID:this.state.objid,
                fatherName:this.state.fatherName
              },this.postsId)
            }

            console.log(data);

          }
        })
      }
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
        this.objFatherid ="";
        this.postsId = info.PostID;
        let bg = 'url(' + info.PostsFrontCover + ')';
        let time = millseconds2DateDiff(info.PostsDate);
        let name = info.UserName === "管理员"?"小C" :info.UserName;
        let commentArea ;
        //this.props.user.userdata.avatar
        if(this.props.user.userid === undefined || this.props.user.userid === null){
          commentArea = <div style={{width:'100%',width: '100%',float:'left',marginTop: '20px'}} id="comment">
            <div className="left">
              <img src = "http://imageservice.pine-soft.com/logo.png" />
            </div>
            <div className = "right">
              <div className="border" style={{padding:"5%"}}>
                <p style={{fontSize:'16px'}}>登陆职前就可以发表评论了...</p>
                <Button type="primary" onClick={()=>{browserHistory.push(`/login`);}}>登陆</Button><Button type="primary" style={{marginLeft:'2%'}} onClick={()=>{browserHistory.push(`/register`);}}>注册</Button>
              </div>
              <Button type="primary" style={{float: 'right',marginTop: '10px'}}>评论</Button>
            </div>
          </div>
        }else {
          commentArea = <div style={{width:'100%',width: '100%',float:'left',marginTop: '20px'}} id="comment">
            <div className="left">
              <img src = {this.props.user.userdata !== null ?this.props.user.userdata.avatar :"http://imageservice.pine-soft.com/logo.png"} />
            </div>
            <div className = "right">
              <div className="border">
                <textarea ref = "textArea" placeholder = {this.state.userName}></textarea>
              </div>
              <Button type="primary" style={{float: 'right',marginTop: '10px'}} onClick={this.addComments}>评论</Button>
            </div>
          </div>
          }
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
                <div  onClick = {this.chooseFid.bind(this,info.PostID)} className="pageContent" dangerouslySetInnerHTML = {{__html : info.Content || ''}}>
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

              <DiscoverDetailFoot postid={this.props.params.discoverID} callback={this.getClickComment}/>
              {commentArea}
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
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(DiscoverDetail)
