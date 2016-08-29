import React, { Component } from 'react';
import { getDiscoverPostComment ,clickLove} from '../../vendor/connection/index';
import { Row, Col ,Button} from 'antd';
import { connect } from 'react-redux';
import styles from './discoverDetailFoot.css';
import {millseconds2DateDiff} from '../../vendor/helper/timeTransfer';
import { browserHistory } from 'react-router';
import Zan from '../common/zan';
import FirstReply from '../common/firstReply';
import SecondReply from '../common/secondReply';

class DiscoverDetailFoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loadContent:"点击加载更多评论",
    }
    this.commentNum = 0;
    this.canFresh = true;
    this.pageIndex = 1;
    this.loadComment = this.loadComment.bind(this);
  }

  componentDidMount(){
      this.loadComment();
  }

  back(fatherid,objid,username,fatherName,uid){
    this.props.callback(fatherid,objid,username,fatherName,uid);
  }

  loadComment() {
      if(this.canFresh){
        this.canFresh = false;
        this.setState({loadContent:"正在请求数据"});
        getDiscoverPostComment(this.props.userinfo.userid,this.props.postid,this.pageIndex,(err,data)=>{
          this.canFresh = true;
          if(err){
            console.log(err);
          }else {
            console.log(data);
            if(data.CommentList.length >= 0){
              this.setState({loadContent:"点击加载更多评论"});
              if(this.pageIndex === 1){
                this.commentNum += data.CommentNum;
                this.setState({data:data.CommentList},()=>{
                  this.props.commentOperate(this.props.postid,this.state.data);
                });
              } else {
                this.commentNum += data.CommentNum;
                this.setState({
                  data:this.state.data.concat(data.CommentList)
                },()=>{
                  this.props.commentOperate(this.props.postid,this.state.data);
                })
              }
              this.pageIndex ++;
            }else {
              this.setState({loadContent:"暂无更多评论"});
            }
          }
        })
      }
  }


  render(){
    if(this.props.commentLists[this.props.postid]){
        var comment = [];
        let commengList = this.props.commentLists[this.props.postid];
        commengList.map((item,index)=>{
          let first = <FirstReply item = {item} callback = {this.props.callback}/>
          comment.push({...first,key:Math.random()});
          //laod section comment
          if(item.ChildList.length > 0){
            item.ChildList.map((item2,index)=>{
              let sec = <SecondReply item2 = {item2} firstObjid = {item.ID} callback = {this.props.callback}/>;
              comment.push({...sec,key:Math.random()});
            })
          }
        })
        return(
          <div className = "detailFoot">
              <div className="allComment">
                <span>全部评论({this.commentNum})</span>
              </div>
              {comment}
              <div style={{textAlign:'center'}}>
                <span onClick={this.loadComment}>{this.state.loadContent}</span>
              </div>
          </div>
        )
    }else {
      return(<div />)
    }
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

module.exports = connect(mapStateToProps,mapDispatchToProps)(DiscoverDetailFoot)
