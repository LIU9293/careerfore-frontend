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
    console.log("enhdhfisdhf>>>");
    this.props.callback(fatherid,objid,username,fatherName,uid);
  }

  render(){
    var item2 = this.props.item2;
    var firstObj = this.props.firstObjid;
    let date2 = millseconds2DateDiff(item2.ReleaseTime);
    let reply2;
    let delete2;
    if(item2.UserID !== this.props.userinfo.userid){
      reply2 = (<Button type="primary" style={{marginRight:'1%'}} onClick = {this.back.bind(this,item2.UserID,firstObj,item2.UserNickName,item2.UserNickName,item2.UserID)}>评论</Button>);
    }
    else
    {
      delete2 = (<Button type="primary" style={{marginRight:'1%'}}>删除</Button>)
    }
    return(
      <div className="single_sec" >
        <div className="commentBox_sec" >
          <img src={item2.HeadImg} onClick={()=>{browserHistory.push(`/my/${item2.UserID}`);}}/>
          <label className="spanintro_sec" onClick={()=>{browserHistory.push(`/my/${item2.UserID}`);}}>&nbsp;{item2.UserNickName}&nbsp;</label>
          <label className="spanintro_sec" >{date2}</label>
          <Zan objid = {item2.ID} isLiked = {item2.IsLike === 1?true:false} baseNum = {item2.PraiseNumbers} type={1}/>
          <div style={{marginTop: '-8px', paddingBottom: '5px'}}>
            <label style={{fontSize: '13px',marginLeft: '45px'}}>回复:</label><font style={{color:'blue',fontSize: '16px'}}>{item2.fatherName}</font>
          </div>
        </div>
        <div className="commentContent_sec">{item2.Content}</div>
        <div style={{textAlign:'right'}}>
          {reply2}
          {delete2}
        </div>
        <hr/>
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
