import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Icon,message} from 'antd';
import { clickLove} from '../../../vendor/connection/index';
import { browserHistory } from 'react-router';
import style from './zan.css';

class Zan extends Component {
  constructor(props) {
    super(props);
  }

  loveClickHandler(id){
    if(this.props.userinfo.userid === null)
    {
      browserHistory.push(`/login`);
    }else {
      this.props.zan(id);
      clickLove(this.props.userinfo.userid,this.props.objid,this.props.type,(err,data)=>{
        if(err){
          message.error(err);
        }else {
          //message.success("操作成功");
        }
      })
    }
  }
  render(){
    let fl =this.props.float !== null? this.props.float !== "" ? this.props.float: "" : "right";
    let num,ClassName;
    if(this.props.dianzan[this.props.objid]){
      num = this.props.dianzan[this.props.objid].num;
      ClassName = this.props.dianzan[this.props.objid].isliked == 0 ? "heart" : "heart heartAnimation";
    }
    let height = this.props.height || '100px';
    let width = this.props.width || '160px';
    return(
      <div style={{display:'inline-block',float:fl, height: height, width: width }} >
        <div className={ClassName} style={{height: height, width: height}} ref="like" onClick={this.loveClickHandler.bind(this,this.props.objid)} />
        <span style={{height:height, lineHeight: height, display: 'inline-block', position: 'absolute'}}>&nbsp;{"喜欢"}&nbsp; ({num || "0"})</span>
      </div>
    )
  }
}


function mapStateToProps(store){
  return {
    userinfo: store.user,
    dianzan:store.dianzan,
  }
}

function mapDispatchToProps(dispatch){
  return {
    zan :(objid)=>{dispatch({
      type:"LIKE_TOGGLE",
      objid:objid
    })}
  }
}

const success = function () {
  message.success('收藏成功');
};
const error = function (err) {
  message.error(err);
};

module.exports = connect(mapStateToProps,mapDispatchToProps)(Zan)
