import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Icon,message} from 'antd';
import { clickLove} from '../../vendor/connection/index';
import { browserHistory } from 'react-router';


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
          message.success("操作成功");
        }
      })
    }
  }
  render(){
    let fl =this.props.float !== null? this.props.float !== "" ? this.props.float: "" : "right";
    let heart,num
    if(this.props.dianzan[this.props.objid]){
      heart = this.props.dianzan[this.props.objid].isliked ? "heart" : "heart-o" ;
      num = this.props.dianzan[this.props.objid].num;
    }
    return(
      <div style={{display:'inline',float:fl}} >
        <span className="spanLove_sec" onClick={this.loveClickHandler.bind(this,this.props.objid)}>
            <Icon style={{color:'#f09999'}} type={heart || 'heart-o'} />&nbsp;{"喜欢"}&nbsp;
          ({num || "0"})
        </span>
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
