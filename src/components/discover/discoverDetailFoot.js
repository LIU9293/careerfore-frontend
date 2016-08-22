import React, { Component } from 'react';
import { getDiscoverPostComment } from '../../vendor/connection/index';
import { Row, Col } from 'antd';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import styles from './discoverDetailFoot.css';


class DiscoverDetailFoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadContent:"点击加载更多评论",
      show: true,
    }
    this.canFresh = true;
    this.pageIndex = 1;
    this.loadComment = this.loadComment.bind(this);
  }

  componentDidMount(){
      this.loadComment();
  }

  loadComment() {
      console.log(this.props.userinfo.userid === null ?"":this.props.userinfo.userid);
      console.log(this.props.postid);
      console.log(this.pageIndex);
      getDiscoverPostComment(this.props.userinfo.userid,this.props.postid,this.pageIndex,(err,data)=>{
        if(err){
          console.log(err);
        }else {
          console.log(data);
        }
      })
  }

  render(){
    return(
      <div className = "detailFoot">
          <div className="allComment">
            <span>全部评论(5)</span>
          </div>
          <div className="single">
            <div className="commentBox">
              <img src="http://imageservice.pine-soft.com/0AE74C9BDB3D464CB3497D739E60A119.jpg" />
              <span >&nbsp;&nbsp;&nbsp;&nbsp;我是王叔叔！！&nbsp;&nbsp;&nbsp;&nbsp;2天前</span>
              <span style={{fontSize:'10px',float:'right'}}>喜欢&nbsp;0</span>
            </div>
            <div className="commentContent">抢沙发</div>
            <hr/>
          </div>

          <div className = "list">

          </div>
      </div>
    )
  }
}
const mapStateToProps = (store) => {
  return {
    userinfo: store.user
  }
}
module.exports = connect(mapStateToProps)(DiscoverDetailFoot)
