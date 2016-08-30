import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Icon} from 'antd';
import { Collect} from '../../vendor/connection/index';
import { browserHistory } from 'react-router';

class Collection extends Component {
  constructor(props) {
    super(props);
  }

  collectClickHandler(id){
    if(this.props.userinfo.userid === null)
    {
      browserHistory.push(`/login`);
    }else {
      this.props.collectobj(id);
      // clickLove(this.props.userinfo.userid,this.props.objid,this.props.type,(err,data)=>{
      //   if(err){
      //     message.error(err);
      //   }else {
      //     message.success('操作成功');
      //   }
      // })
    }
  }

  render(){
    let fl =this.props.float !== null? this.props.float !== "" ? this.props.float: "" : "right";
    let collect,num
    if(this.props.collects[this.props.objid]){
      collect = this.props.collects[this.props.objid].iscollect ? "star" : "star-o" ;
      num = this.props.collects[this.props.objid].num;
    }
    return(
      <div style={{display:'inline',float:fl}} >
        <span className="spanLove_sec" onClick={this.collectClickHandler.bind(this,this.props.objid)}>
            <Icon style={{color:'#f2bc39'}} type={collect || 'star-o'} />&nbsp;{"收藏"}&nbsp;
          ({num || "0"})
        </span>
      </div>
    )
  }

}

function mapStateToProps(store){
  return {
    userinfo : store.user,
    collects : store.collect,
  }
}

function mapDispatchToProps(dispatch){
  return {
    collectobj :(objid)=>{dispatch({
      type:"COLLECT_TOGGLE",
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
module.exports = connect(mapStateToProps,mapDispatchToProps)(Collection)
