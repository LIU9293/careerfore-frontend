import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { Collect} from '../../../vendor/connection/index';
import { browserHistory } from 'react-router';
import style from './collect.css';

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
      Collect(this.props.userinfo.userid,id,this.props.type,(err,data)=>{
        if(err){
          message.error(err);
        }else {
          message.success('收藏成功');
        }
      })
    }
  }

  render(){
    let fl =this.props.float !== null? this.props.float !== "" ? this.props.float: "" : "right";
    let collect,num
    if(this.props.collects[this.props.objid]){
      collect = this.props.collects[this.props.objid].iscollect == 0 ? "collect" : "collect collectAnimation" ;
      num = this.props.collects[this.props.objid].num;
    }
    let height = this.props.height || '100px';
    let width = this.props.width || '160px';
    return(
      <div style={{ display:'inline-block',float:fl, height: height, width: width }} >
        <div className={collect} style={{height: height, width: height}} ref="collect" onClick={this.collectClickHandler.bind(this,this.props.objid)} />
        <span style={{height:height, lineHeight: height, display: 'inline-block', position: 'absolute',fontSize:'16px',marginLeft:'-22px'}}>&nbsp;{"收藏"}&nbsp; ({num || "0"})</span>
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
