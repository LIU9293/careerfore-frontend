import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col ,Button} from 'antd';
import { browserHistory } from 'react-router';
import Zan from '../common/zan';
import FirstReply from '../common/firstReply';
import SecondReply from '../common/secondReply';
import { addComment ,deleteComment} from '../../vendor/connection/index';

class Replys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName : "",
      objFatherid:"",
      objid:"",
      fatherName:"",
      SecondCommentArray:[],
    }
    //二级评论超出这个数的 就隐藏
    this.MinCount = 2;
    this.getClickComment = this.getClickComment.bind(this);
    this.addComments = this.addComments.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.getParamByObjid = this.getParamByObjid.bind(this);
  }

  moreComment(objid){
    let originParam = this.getParamByObjid(objid);
    let newParam;
    if(originParam.showmore){
      //原来需要显示加载更多，更改状态之后，显示全部评论
      newParam = this.state.SecondCommentArray.map((item,index)=>{
        console.log(item.objid,objid)
        if(item.objid === objid){
          item.showmore = false;
          item.loadcontent = ",收起评论";
        }
        return item;
      })
    }else {
      newParam = this.state.SecondCommentArray.map((item,index)=>{
        if(item.objid === objid){
          item.showmore = true;
          item.loadcontent = item.reallycontent;
        }
        return item;
      })
    }
    this.setState({
      SecondCommentArray:newParam
    })
}
  //根据对象id获取对象的配置
  //objid 指一级评论的id
  //在this.state.SecondCommentArray  存储的形式是 :{objid:objid,showmore:ture,loadcontent:"点击查看剩余6条评论",reallycontent:"点击查看剩余6条评论"}
  getParamByObjid(objid){
    let paramReturn;
    this.state.SecondCommentArray.map((item,index)=>{
      if(item.objid === objid){
        paramReturn = item
      }
    })
    return paramReturn;
  }

  getClickComment(fatherid,objid,username,fatherName,uid){
    if(this.props.user.userid === undefined || this.props.user.userid === null){
      browserHistory.push(`/login`);
    }else {
      if(uid === this.props.user.userid){
        alert("不能给自己回复评论");
      }else {
        let reply = "回复:" + username;
        this.props.UPDATE_QUEPARAM(reply,fatherid,objid,fatherName);
        window.scrollBy(0,this.refs.commentarea.offsetTop);
      }
    }
  }

  deleteComment(commentid,level){
    if(level === 1){
      this.props.DELETE_TOP_COMMENT(this.props.postid,commentid);
    }else {
      this.props.DELETE_SECOND_COMMENT(this.props.postid,commentid);
    }
    //不是随机生成的ID
    if(commentid.split('.').length < 2){
      deleteComment(commentid,this.props.user.userid,(err,data)=>{
        if(err){console.log(err)}
        else {
          console.log(data)
        }
      })
    }
  }

  addComments(){
    if(this.props.user.userid === undefined){
      browserHistory.push(`/login`);
    }else {
      let commentContent = this.refs.textArea.value;
      if(commentContent.replace(' ','').length === 0){
        console.log("请输入有效的评论");
      }else {
        addComment(this.props.user.userid,this.props.postid,this.props.commentReq.objFatherid,commentContent,this.props.commentReq.objid,(err,data)=>{
          if(err){
            console.log(err);
          } else {
            if(this.props.commentReq.objFatherid==''){
              this.props.insertTopLevelComment({
                ChildList:[],
                Content:commentContent,
                HeadImg: this.props.user.userdata !== null ?this.props.user.userdata.avatar :"http://imageservice.pine-soft.com/logo.png",
                ID: Math.random().toString(),
                IsLike:0,
                Level:1,
                Phone:this.props.user.userdata !== null ?this.props.user.userdata.phone:"",
                PostID:this.props.postid,
                PraiseNumbers:0,
                ReleaseTime:'/Date('+ new Date().getTime() + ')/',
                ReplyNumbers:0,
                ResultCode:0,
                UserID:this.props.user.userid,
                UserNickName:this.props.user.userdata.nickName,
              },this.props.postid)
            }
            else {
              this.props.insertSecondLevelComment(this.props.commentReq.objid,{
                Content:commentContent,
                HeadImg: this.props.user.userdata !== null ?this.props.user.userdata.avatar :"http://imageservice.pine-soft.com/logo.png",
                ID: Math.random().toString(),
                IsLike:0,
                Level:2,
                Phone:this.props.user.userdata !== null ?this.props.user.userdata.phone:"",
                PostID:this.props.postid,
                PraiseNumbers:0,
                ReleaseTime:'/Date('+ new Date().getTime() + ')/',
                ReplyNumbers:0,
                ResultCode:0,
                UserID:this.props.user.userid,
                UserNickName:this.props.user.userdata.nickName,
                fatherID:this.props.commentReq.objid,
                fatherName:this.props.commentReq.fatherName
              },this.props.postid)
            }
            this.refs.textArea.value = "";
          }
        })
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.commentLists[this.props.postid]){
      let paramArray = [];
      nextProps.commentLists[this.props.postid].map((item,index)=>{
          var secondCommentCount = item.ChildList.length;
          if(secondCommentCount > this.MinCount){
            let paramOri = {
              objid:item.ID,
              showmore:true,
              loadcontent:"还有" + (secondCommentCount - this.MinCount) + "条评论,点击查看",
              reallycontent:"还有" + (secondCommentCount - this.MinCount) + "条评论,点击查看"}
            paramArray.push({...paramOri,key:Math.random()})
          }
      })
      this.setState({
        SecondCommentArray:paramArray
      })
    }

  }

  render(){
    var commentArea;
    if(this.props.user.userid === undefined || this.props.user.userid === null){
      commentArea = <div ref = "commentarea" style={{width:'100%',width: '100%',float:'left',marginTop: '20px'}} id="comment">
        <div className="left">
          <img src = "http://imageservice.pine-soft.com/logo.png" />
        </div>
        <div className = "right">
          <div className="border" style={{padding:"5%"}}>
            <p style={{fontSize:'16px'}}>登陆职前就可以发表评论了...</p>
            <Button type="primary" onClick={()=>{browserHistory.push(`/login`);}}>登陆</Button><Button type="primary" style={{marginLeft:'2%'}} onClick={()=>{browserHistory.push(`/register`);}}>注册</Button>
          </div>
          <Button type="primary" style={{float: 'right',marginTop: '10px'}} onClick={this.addComments}>评论</Button>
        </div>
      </div>
    }
    else {
      commentArea = <div ref = "commentarea" style={{width:'100%',width: '100%',float:'left',marginTop: '20px'}} id="comment">
        <div className="left">
          <img src = {this.props.user.userdata !== null ?this.props.user.userdata.avatar :"http://imageservice.pine-soft.com/logo.png"} />
        </div>
        <div className = "right">
          <div className="border">
            <textarea ref = "textArea" placeholder = {this.props.commentReq.userName}></textarea>
          </div>
          <Button type="primary" style={{float: 'right',marginTop: '10px'}} onClick={this.addComments}>评论</Button>
        </div>
      </div>
    }
    var comment = [];
    if(this.props.commentLists[this.props.postid]){
        let commengList = this.props.commentLists[this.props.postid];
        commengList.map((item,index)=>{
          let first = <FirstReply key = {index} item = {item} callback = {this.getClickComment} deletecallback = {this.deleteComment}/>;
          comment.push({...first,key:Math.random()});
          //load second comment
          var secondCommentCount = item.ChildList.length;
          if(secondCommentCount > this.MinCount){
              let param = this.getParamByObjid(item.ID);
              if(param === undefined || param === null || param.showmore === true){//需要显示加载更多
                  for (var i = 0; i < this.MinCount; i++) {
                    let second = <SecondReply item2 = {item.ChildList[i]} firstObjid = {item.ID} callback = {this.getClickComment} deletecallback = {this.deleteComment}/>;
                    comment.push({...second,key:Math.random()});
                  }
              }
              else {
                item.ChildList.map((item2,index2)=>{
                  let second = <SecondReply key = {index2} item2 = {item2} firstObjid = {item.ID} callback = {this.getClickComment} deletecallback = {this.deleteComment}/>;
                  comment.push({...second,key:Math.random()});
                })
              }
              if(param !== undefined && param !== null){
                let more = <div style = {styles.loadmore} >
                              <span>{param.loadcontent.split(',')[0]}</span>&nbsp;
                              <span id = "loadMoreSpan" onClick = {this.moreComment.bind(this,item.ID)} style = {{cursor:'pointer',color:'#2db7f5'}}>{param.loadcontent.split(',')[1]}</span>
                            </div>
                comment.push({...more,key:Math.random()});
              }
          }
          else {
            item.ChildList.map((item2,index2)=>{
            let second = <SecondReply key = {index2} item2 = {item2} firstObjid = {item.ID} callback = {this.getClickComment} deletecallback = {this.deleteComment}/>;
            comment.push({...second,key:Math.random()});
            })
          }
          let h1 = <hr />;
          comment.push({...h1,key:Math.random()});
        })
    }else {
      comment = (<div>暂无评论</div>);
    }
    return(
      <div className = "detailFoot">
          <div className="allComment">
            <span>全部评论({this.props.commentNum})</span>
            <hr />
          </div>
          {comment}
          {commentArea}
      </div>
    )
  }

}

const styles = {
  loadmore:{
    textAlign: 'left',
    fontSize: '13px',
    borderBottom: '1px solid rgb(238, 238, 238)',
    width: '80%',
    // border: '1px dashed #f0f0f0',
    border: '1px dashed lightgray',
    borderLeft: '3px solid lightgray',
    marginLeft: '20%',
    padding: '10px 0 10px 10px',
    borderRight: 'none',
  }
}

function mapStateToProps(store){
  return {
    user: store.user,
    commentLists:store.commentOperate,
    commentReq:store.addCommentOperate,
  }
}

function mapDispatchToProps(dispatch){
  return {
    insertTopLevelComment: (commentData,postID) => {dispatch({type:'INSERT_TOP_LEVEL_COMMENT', commentData: commentData, postID: postID})},
    insertSecondLevelComment: (ID,commentData,postID) => {dispatch({type:'INSERT_SECOND_LEVEL_COMMENT', commentData: commentData, ID:ID, postID: postID})},
    DELETE_TOP_COMMENT:(postID,commentid)=>{dispatch({type:'DELETE_TOP_COMMENT',postID:postID,commentid:commentid})},
    DELETE_SECOND_COMMENT:(postID,commentid)=>{dispatch({type:'DELETE_SECOND_COMMENT',postID:postID,commentid:commentid})},
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
    UPDATE_QUEPARAM:(userName,objFatherid,objid,fatherName)=>{dispatch({type:'UPDATE_QUEPARAM',userName:userName,objFatherid:objFatherid,objid:objid,fatherName:fatherName})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Replys)
/*
//   var secondCommentCount = item.ChildList.length;
//   if(this.state.showMore){
//     if(secondCommentCount > this.MinCount){
//         for (var i = 0; i < this.MinCount; i++) {
//           let second = <SecondReply item2 = {item.ChildList[i]} firstObjid = {item.ID} callback = {this.getClickComment} deletecallback = {this.deleteComment}/>;
//           comment.push({...second,key:Math.random()});
//         }
//         let more = <div style = {{textAlign:'center',fontSize:'14px',borderBottom:'1px solid #eee',cursor:'pointer'}} onClick = {this.moreComment.bind(this)}>{this.state.loadMore}</div>
//         comment.push({...more,key:Math.random()});
//     }
//     else {
//       item.ChildList.map((item2,index2)=>{
//       let second = <SecondReply key = {index2} item2 = {item2} firstObjid = {item.ID} callback = {this.getClickComment} deletecallback = {this.deleteComment}/>;
//       comment.push({...second,key:Math.random()});
//       })
//     }
//   }else {
//     item.ChildList.map((item2,index2)=>{
//       let second = <SecondReply key = {index2} item2 = {item2} firstObjid = {item.ID} callback = {this.getClickComment} deletecallback = {this.deleteComment}/>;
//       comment.push({...second,key:Math.random()});
//     })
//     if(secondCommentCount > this.MinCount)
//     {
//       let more = <div style = {{textAlign:'center',fontSize:'14px',borderBottom:'1px solid #eee',cursor:'pointer'}} onClick = {this.moreComment.bind(this)}>{this.state.loadMore}</div>
//       comment.push({...more,key:Math.random()});
//     }
//   }
// })
*/
