import React, { Component } from 'react';
import { Row, Col ,Button} from 'antd';
import {millseconds2DateDiff} from '../../vendor/helper/timeTransfer';
import { browserHistory } from 'react-router';
import Zan from '../common/zan';
import { connect } from 'react-redux';

class FirstReply extends Component {
  constructor(props) {
    super(props);
  }

  deletecallback(commentid,level){
    this.props.deletecallback(commentid,level);
  }

  back(fatherid,objid,username,fatherName,uid){
    this.props.callback(fatherid,objid,username,fatherName,uid);
  }

  //需要传入的属性 :item callback
  render(){
    var item = this.props.item;
    let date = millseconds2DateDiff(item.ReleaseTime);
    let reply1;
    let delete1;
    if(item.UserID !== this.props.userinfo.userid){
      reply1 = (<span type="primary" id = "deleteOrReply"
      style={{marginRight:'1%'}} onClick = {this.back.bind(this,item.UserID,item.ID,item.UserNickName,item.UserNickName,item.UserID)} title = "点击回复评论">回复</span>);
    }
    else {
      delete1 = (<span type="primary" id = "deleteOrReply" style={{marginRight:'1%'}} onClick = {this.deletecallback.bind(this,item.ID,1)} title = "点击删除评论">删除</span>)
    }
    return(
      <div className = "single">
        <div className = "commentBox">
          <img src={item.HeadImg} onClick={()=>{browserHistory.push(`/my/${item.UserID}`);}}/>
          <label className = "spanintro" onClick={()=>{browserHistory.push(`/my/${item.UserID}`);}}>&nbsp;{item.UserNickName}&nbsp;</label>
          <label className = "spanintro" >{date}</label>
        </div>
        <div className = "commentContent">{item.Content}</div>
        <div style={{textAlign:'right'}}>
          {reply1}
          {delete1}
        </div>
      </div>
    )
  }
}

const styles = {
  single:{
    position: 'relative',
    boxSizing: 'border-box',
    fontSize: '12px',
    lineHeight: '30px',
    color: '#4b4c4c',
    display: 'block',
    padding: '0 20px 0 20px',
    margin: '80px 0 20px 0',
    textAlign: 'left',
    // font-family: "PingFang SC", "Microsoft JhengHei";
  },
  commentBox:{
    fontSize:'10px',
    float:'left'
  },
  commentBoxImg:{
    display: 'inline',
    margin: 'auto',
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    verticalAlign: 'middle',
  },
  spanintro:{
    fontSize: '14px',
  },
  commentContent:{
    fontSize: '16px',
    paddingLeft: '55px',
    marginBottom: '10px',
  },
  h:{
    marginBottom: '5px',
    padding: '0',
    border: '0',
    backgroundColor: '#eee',
    height: '1px',
    marginTop: '6px',
  }
}

function mapStateToProps(store){
  return {
    userinfo: store.user,
    commentLists:store.commentOperate
  }
}
function mapDispatchToProps(dispatch){
  return {
    commentOperate:(postid,newcommentlist)=>{dispatch({type:'UPDATE_COMMENT',commentData:newcommentlist,postID:postid})}
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(FirstReply)

/*
<div className = "single">
  <div className = "commentBox">
    <img src={item.HeadImg} onClick={()=>{browserHistory.push(`/my/${item.UserID}`);}}/>
    <label className = "spanintro" onClick={()=>{browserHistory.push(`/my/${item.UserID}`);}}>&nbsp;{item.UserNickName}&nbsp;</label>
    <label className = "spanintro" >{date}</label>
  </div>
  <div className = "commentContent">{item.Content}</div>
  <div style={{textAlign:'right'}}>
    <Zan objid = {item.ID} isLiked = {item.IsLike === 1?true:false} baseNum = {item.PraiseNumbers} type={1}/>
    {reply1}
    {delete1}
  </div>
</div>
*/
