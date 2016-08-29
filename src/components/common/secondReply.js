import React, { Component } from 'react';
import { Row, Col ,Button} from 'antd';
import {millseconds2DateDiff} from '../../vendor/helper/timeTransfer';
import { browserHistory } from 'react-router';
import Zan from '../common/zan';
import { connect } from 'react-redux';


class SecondReply extends Component {
  constructor(props) {
    super(props);
  }

  back(fatherid,objid,username,fatherName,uid){
    this.props.callback(fatherid,objid,username,fatherName,uid);
  }

  deletecallback(commentid,level){
    this.props.deletecallback(commentid,level);
  }

  render(){
    var item2 = this.props.item2;
    var firstObj = this.props.firstObjid;
    let date2 = millseconds2DateDiff(item2.ReleaseTime);
    let reply2;
    let delete2;
    if(item2.UserID !== this.props.userinfo.userid){
      reply2 = (<span type="primary" style={{marginRight:'1%'}} id="deleteOrReply"
      onClick = {this.back.bind(this,item2.UserID,firstObj,item2.UserNickName,item2.UserNickName,item2.UserID)}>回复</span>);
    }
    else
    {
      delete2 = (<span type="primary" id="deleteOrReply" style={{marginRight:'1%'}} onClick = {this.deletecallback.bind(this,item2.ID,2)}>删除</span>)
    }
    let rep = "@" + "<label className='spanintro_sec'>{date2}</label>";
    return(
      <div className="single_sec" >
        <div className="commentBox_sec" style = {{fontSize:'14px'}}>
          <label className="spanintro_sec" onClick={()=>{browserHistory.push(`/my/${item2.UserID}`);}}>&nbsp;{item2.UserNickName}&nbsp;</label> :
          <label className="spanintro_sec">{"@"}</label>
          <label className="spanintro_sec">{item2.fatherName}</label>&nbsp;
          {item2.Content}
          </div>

        <div style={{textAlign:'right', marginTop: '5px'}}>
          <label className="spanintro_sec" style = {{float:'left',lineHeight: '20px'}}>{date2}</label>
          {reply2}
          {delete2}
        </div>
      </div>
    )
  }
}

const styles = {
  single_sec:{

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


module.exports = connect(mapStateToProps,mapDispatchToProps)(SecondReply)


/*
<div className="single_sec" >
  <div className="commentBox_sec" >
    <img src={item2.HeadImg} onClick={()=>{browserHistory.push(`/my/${item2.UserID}`);}}/>
    <label className="spanintro_sec" onClick={()=>{browserHistory.push(`/my/${item2.UserID}`);}}>&nbsp;{item2.UserNickName}&nbsp;</label>
    <label className="spanintro_sec" >{date2}</label>
    <div style={{marginTop: '-8px', paddingBottom: '5px'}}>
      <label style={{fontSize: '13px',marginLeft: '45px'}}>回复:</label><font style={{color:'blue',fontSize: '16px'}}>{item2.fatherName}</font>
    </div>
  </div>
  <div className="commentContent_sec">{item2.Content}</div>
  <div style={{textAlign:'right'}}>
    <Zan objid = {item2.ID} isLiked = {item2.IsLike === 1?true:false} baseNum = {item2.PraiseNumbers} type={1}/>
    {reply2}
    {delete2}
  </div>
  <hr/>
</div>
*/
