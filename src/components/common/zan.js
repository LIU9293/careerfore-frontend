import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Icon} from 'antd';
import { clickLove} from '../../vendor/connection/index';
import { browserHistory } from 'react-router';

const style = {
  container:{
    float:'right',
    display:'inline'
  }
}

class Zan extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    if(this.props.isLiked == true){
      this.props.zan(this.props.objid)
    }
  }

  loveClickHandler(id){
    if(this.props.userinfo.userid === null)
    {
      // alert("登陆");
      browserHistory.push(`/login`);
    }else {
      this.props.zan(id);
      clickLove(this.props.userinfo.userid,this.props.objid,this.props.type,(err,data)=>{
        if(err){
          console.log(err);
        }else {
          console(data.ResultMessage);
        }})
    }
  }
  render(){
    if(this.props.dianzan[this.props.objid]){
      return(
        <div style={style.container}>
        <span className="spanLove_sec" onClick={this.loveClickHandler.bind(this,this.props.objid)}><Icon style={{color:'red'}} type="heart" />&nbsp;
          {this.props.baseNum + 1}
        </span>
      </div>
    )
    }else {
      return(
        <div style={style.container}>
          <span className="spanLove_sec" onClick={this.loveClickHandler.bind(this,this.props.objid)}><Icon type="heart-o" />&nbsp;
            {this.props.baseNum }
          </span>
        </div>
      )
    }
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
    zan :(commentID)=>{dispatch({
      type:"LIKE_TOGGLE",
      commentID:commentID
    })}
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Zan)
