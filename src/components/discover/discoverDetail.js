import React, { Component } from 'react';
import { getDiscoverPost,addComment } from '../../vendor/connection/index';
import { Row, Col ,Button} from 'antd';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import style from './discoverDetail.css';
import {millseconds2DateDiff} from '../../vendor/helper/timeTransfer';
import DiscoverDetailFoot from './discoverDetailFoot';
import SimpEditor from './PostArticle';

class DiscoverDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      postData:null,
      loadContent:"Loading...",
      userName : ""
    }
    this.postsId = 0;
    this.objFatherid = 0;
    this.objid = "";
    this.loadData = this.loadData.bind(this);
    this.getClickComment = this.getClickComment.bind(this);
  }

  componentDidMount(){
    this.loadData();
  }

  chooseFid(fid){
    this.objFatherid = "";
    this.objid = "";
    this.setState({userName:""});
  }

  getClickComment(fatherid,objid,username){
    console.log("*&**" + fatherid,objid,username);
    this.objFatherid = fatherid;
    this.objid = objid;
    let reply =  "回复:"+username;
    console.log(reply);
    this.setState({userName:reply});
    console.log(this.state.userName)
  }

  addComment(fatherid,objid,username){
    console.log("))))" + fatherid,objid,username)
    if(this.props.userinfo.userid === undefined){
      browserHistory.push(`/login`);
    }else {
      let commentContent = this.refs.textArea.value;
      if(commentContent.replace(' ','').length === 0){
        console.log("请输入有效的评论");
      }else {
        addComment(this.props.userinfo.userid,this.postsId,this.objFatherid,commentContent,this.objid,(err,data)=>{
          if(err){
            console.log(err);
          }else {
            console.log(data);
          }
        })
      }
    }
  }

  loadData(){
    let userid = "";
    if(this.props.userinfo.userid !== undefined)
    {
      userid =this.props.userinfo.userid;
    }
    getDiscoverPost(this.props.params.discoverID,userid,(err,data)=>{
        if(err){
          console.log(err);
        }else {
          console.log(data);
          this.setState({postData:data});
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
        if(this.props.userinfo.userid === undefined){
          commentArea = <div style={{width:'100%',width: '100%',float:'left',marginTop: '20px'}}>
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
          commentArea = <div style={{width:'100%',width: '100%',float:'left',marginTop: '20px'}}>
            <div className="left">
              <img src = "http://imageservice.pine-soft.com/logo.png" />
            </div>
            <div className = "right">
              <div className="border">
                <textarea ref = "textArea" placeholder = {this.state.userName}></textarea>
              </div>
              <Button type="primary" style={{float: 'right',marginTop: '10px'}} onClick={this.addComment.bind(this)}>评论</Button>
            </div>
          </div>
          }
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
                    <i className="love_icon"></i>赞·{info.LikeNum}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="collect">
                    <i className="collect_icon"></i>收藏·{info.CollectionNumbers}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;阅读数·{info.ReadNum}
                </div>
              </div>
                {commentArea}
              <DiscoverDetailFoot postid={this.props.params.discoverID} callback={this.getClickComment}/>
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
    userinfo: store.user
  }
}

module.exports = connect(mapStateToProps)(DiscoverDetail)
