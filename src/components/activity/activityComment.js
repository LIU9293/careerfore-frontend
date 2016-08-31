import React , { Component } from 'react';
import { getActivityComment } from '../../vendor/connection';
import { Row, Col, Icon } from 'antd';
import { connect } from 'react-redux';
import styles from '../discover/discoverDetailFoot.css';
import {millseconds2DateDiff} from '../../vendor/helper/timeTransfer';
import Zan from '../common/zan';
import Replys from '../common/Reply';


class ActivityComment extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: null,
      loadContent:"点击加载更多评论",
    }
    this.commentNum = 0 ;
    this.canFresh = true ;
    this.pageIndex = 1 ;
    this.loadComment = this.loadComment.bind(this);
  }
  componentDidMount(){
    console.log(this.props.activityid);
    this.loadComment();
  }

  loadComment() {
      if(this.canFresh){
        this.canFresh = false;
        this.setState({loadContent:"正在请求数据"});
        console.log(this.props.userinfo.userid,this.props.activityid,this.pageIndex);
        getActivityComment(this.props.activityid,this.props.userinfo.userid,this.pageIndex,(err,data)=>{
          this.canFresh = true;
          if(err){
            console.log(err);
          }else {
            console.log(data);
            // item.postID = item.
            if(data.CommentList.length >= 0){
              this.setState({loadContent:"点击加载更多评论"});
              if(this.pageIndex === 1){
                this.commentNum += data.CommentNum;
                this.setState({data:data.CommentList},()=>{
                  this.props.commentOperate(this.props.activityid,this.state.data);
                });
              } else {
                this.commentNum += data.CommentNum;
                this.setState({
                  data:this.state.data.concat(data.CommentList)
                },()=>{
                  this.props.commentOperate(this.props.activityid,this.state.data);
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
    return(
      <div>
        <Replys commentNum = {this.commentNum} postid = {this.props.activityid} sourceType ={"activity"}/>
        <div style={{textAlign:'center'}}>
          <span onClick={this.loadComment}>{this.state.loadContent}</span>
        </div>
      </div>
    )
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
    commentOperate:(activityID,newcommentlist)=>{dispatch({type:'UPDATE_COMMENT',commentData:newcommentlist,postID:activityID})}
  }
  }

  function clickTest(){
  console.log("clickTest")
  }

  module.exports = connect(mapStateToProps,mapDispatchToProps)(ActivityComment)
