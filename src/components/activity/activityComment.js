import React , { Component } from 'react';
import { getActivityComment } from '../../vendor/connection';
import { Row, Col, Icon } from 'antd';
import styles from './activity.css';
import {millseconds2DateDiff} from '../../vendor/helper/timeTransfer';
import Zan from '../common/zan';

class ActivityComment extends Component{

  constructor(props){
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount(){
    getActivityComment(this.props.activityID,'', 1, (err,data)=>{
      if (err){
          console.log(err)
      } else {
        console.log(data);
        let commentNum=data.CommentNum;
        let activityList=data.CommentList.map((item,ii)=>{
          let UserID=item.UserID;
          let Content=item.Content;
          let EventID=item.EventID;
          let HeadImg=item.HeadImg;
          let ID=item.ID;
          let Level=item.Level;
          let Phone=item.Phone;
          let raiseNumbers=item.raiseNumbers;
          let ReleaseTime=item.ReleaseTime;
          let ReplyNumbers=item.ReplyNumbers;
          let UserNickName=item.UserNickName;
          let Time=millseconds2DateDiff(ReleaseTime);
          return(
              <div key={Math.random()}>
                <div className="commentBox">
                  <img src={HeadImg}/>&nbsp;&nbsp;&nbsp;&nbsp;
                  {UserNickName}&nbsp;&nbsp;&nbsp;&nbsp;{Time}
                  <span style={{fontSize:'10px'}}><Icon type="heart-o" />&nbsp;{raiseNumbers}</span>
                </div>
                <div className="commentContent">
                  {Content}
                </div>
                <hr/>
              </div>
          )
        });
       this.setState({
         data:activityList
       })
      }
    })
  }

  render(){
    return(
      <div className="comment">
          <p className="globalComment">｜全部评论</p>
          {this.state.data}
      </div>

    )
  }
}

module.exports = ActivityComment
