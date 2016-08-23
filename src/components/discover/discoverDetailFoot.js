import React, { Component } from 'react';
import { getDiscoverPostComment ,clickLove} from '../../vendor/connection/index';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import styles from './discoverDetailFoot.css';
import {millseconds2DateDiff} from '../../vendor/helper/timeTransfer';
import { browserHistory } from 'react-router';
import Zan from '../common/zan';

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

  // loveClickHandler(id, type){
  //   console.log(id)
  //   if(this.props.dianzan[id]){
  //     console.log('取消赞')
  //   } else {
  //     console.log('点赞')
  //   }
  //   this.props.zan(id);
  // }

/*
  unLoveClick(objid,type){
    this.setState({
      data: this.state.data.map((item,ii)=>{
        if(item.ID == objid){
          item.PraiseNumbers --;
        } else {
          item.ChildList.map((items,ii)=>{
            if(items.ID == objid){
              items.PraiseNumbers --;
            };
            return items;
          })
        }
        return item;
      })
    });
    this.refs[objid].onClick = this.loveClick.bind(this,objid,1);
    return;
    if(this.props.userinfo.userid === null){
      alert("您还没有登陆");
    }else {
      console.log(objid,type);
      clickLove(this.props.userinfo.userid,objid,type,(err,data)=>{
        if(err){
          console.log(err);
        }else {
          alert(data.ResultMessage);
        }
      })
    }
  }
*/
  loadComment() {
    console.log("load");
      if(this.canFresh){
        this.canFresh = false;
        this.setState({loadContent:"正在请求数据"});
        getDiscoverPostComment(this.props.userinfo.userid,this.props.postid,this.pageIndex,(err,data)=>{
          this.canFresh = true;
          if(err){
            console.log(err);
          }else {
            console.log(data);
            if(data.CommentList.length > 0){
              this.setState({loadContent:"点击加载更多评论"});
              if(this.pageIndex === 1){
                this.commentNum += data.CommentNum;
                this.setState({data:data.CommentList},()=>{console.log(this.state.data)});
              } else {
                this.commentNum += data.CommentNum;
                this.setState({
                  data:this.state.data.concat(data.CommentList)
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
  //<zan objid = {item.ID} isLiked = {false} baseNum = {item.PraiseNumbers} type = {1}/>
//<span className="spanLove" onClick={this.loveClickHandler.bind(this,item.ID,1)}>喜欢&nbsp;{item.PraiseNumbers + this.props.dianzan[item.ID]?1:0}</span>
  render(){
    if(this.state.data){
      console.log('render in parent')
        var comment = [];
        let commengList = this.state.data;
        commengList.map((item,index)=>{
          let date = millseconds2DateDiff(item.ReleaseTime);
          let firstComment = (
            <div className="single">
              <div className="commentBox">
                <img src={item.HeadImg} onClick={()=>{browserHistory.push(`/my/${item.UserID}`);}}/>
                <label className="spanintro" onClick={()=>{browserHistory.push(`/my/${item.UserID}`);}}>&nbsp;{item.UserNickName}&nbsp;</label>
                <label className="spanintro" >{date}</label>
                <Zan objid = {item.ID} isLiked = {item.IsLike === 1?true:false} baseNum = {item.PraiseNumbers} type={1}/>
              </div>
              <div className="commentContent">{item.Content}</div>
              <hr/>
            </div>
          )
          comment.push({...firstComment,key:Math.random()});
          //laod section comment
          if(item.ChildList.length > 0){
            item.ChildList.map((item,index)=>{
              let secondComment = (
                <div className="single_sec">
                  <div className="commentBox_sec">
                    <img src={item.HeadImg} onClick={()=>{browserHistory.push(`/my/${item.UserID}`);}}/>
                    <label className="spanintro_sec" onClick={()=>{browserHistory.push(`/my/${item.UserID}`);}}>&nbsp;{item.UserNickName}&nbsp;</label>
                    <label className="spanintro_sec" >{date}</label>
                    <Zan objid = {item.ID} isLiked = {item.IsLike === 1?true:false} baseNum = {item.PraiseNumbers} type={1}/>
                    <div style={{marginTop: '-8px', paddingBottom: '5px'}}>
                      <label style={{fontSize: '13px',marginLeft: '45px'}}>回复:</label><font style={{color:'blue',fontSize: '16px'}}>{item.fatherName}</font>
                    </div>
                  </div>
                  <div className="commentContent_sec">{item.Content}</div>
                  <hr/>
                </div>
              )
              comment.push({...secondComment,key:Math.random()});
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
  }
}



module.exports = connect(mapStateToProps)(DiscoverDetailFoot)
