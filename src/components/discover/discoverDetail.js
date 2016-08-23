import React, { Component } from 'react';
import { getDiscoverPost } from '../../vendor/connection/index';
import { Row, Col } from 'antd';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import style from './discoverDetail.css';
import {millseconds2DateDiff} from '../../vendor/helper/timeTransfer';
import DiscoverDetailFoot from './discoverDetailFoot';

class DiscoverDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      postData:null,
      loadContent:"Loading...",
    }
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount(){
    this.loadData();
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
        let bg = 'url(' + info.PostsFrontCover + ')';
        let time = millseconds2DateDiff(info.PostsDate);
        let name = info.UserName === "管理员"?"小C" :info.UserName;
        let con = (
          <div className="content">
              <div className="box-content" style={{backgroundImage:bg}}></div>
              <h1 className="title">{info.PostsTitle}</h1>
              <div className="postcontent">
                <div className="userinfo">
                    <img className = "userphoto" src={info.UserHeadUrl}  />
                    <div className = "introduction">
                        <span>{name} - {info.ChannelName} - {time}</span>
                    </div>
                </div>
                <div className="pageContent" dangerouslySetInnerHTML = {{__html : info.Content || ''}}>
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
              <DiscoverDetailFoot postid={this.props.params.discoverID}/>
          </div>
        )
        return(
          <Row>
            <Col xs={2} sm={4} md={6} lg={4} />
            <Col xs={20} sm={16} md={12} lg={16}>
              {con}
            </Col>
              <Col xs={2} sm={4} md={6} lg={4} />
          </Row>
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
