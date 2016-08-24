import React, { Component } from 'react';
import { connect } from 'react-redux';
import { secretaryMessage } from '../../../vendor/connection';
import { Timeline, Icon } from 'antd';
import style from './profileHomeComponents.css';

class Message extends Component{

  constructor(props){
    super(props);
    this.state = {
      secretaryInfo: {data: null, loaded: false}
    }
  }

  componentDidMount(){
    secretaryMessage(this.props.userinfo.userid, 'All', (err,data)=>{
      if(err){console.log(err)} else {
        this.setState({
          secretaryInfo: {data:data, loaded:true}
        })
      }
    });
  }

  render(){
    if(this.state.secretaryInfo.loaded == true){
      let messageList = this.state.secretaryInfo.data.List.map((item,ii)=>{
        if(item.ZTMT_TYPE=="帖子"){
          return(
            <Timeline.Item
              key={Math.random()}>
              <div className="secretaryListBox">
                <div className="secretaryListBoxHeader">
                  <h3 style={{display:'inline'}}>{item.ZTMT_TITLE}</h3>
                  <h3 style={{display:'inline', float:'right'}}>{item.ZTMT_SENDTIME}</h3>
                </div>
                <div className="secretaryListBoxContent">
                  <p>{item.ZTMT_CONTENT}</p>
                </div>
              </div>
            </Timeline.Item>
          )
        } else {
          return(
            <Timeline.Item
              key={Math.random()}>
              <div className="secretaryListBox">
                <div className="secretaryListBoxHeader">
                  <h3 style={{display:'inline'}}>{item.ZTMT_TITLE}</h3>
                  <h3 style={{display:'inline', float:'right'}}>{item.ZTMT_SENDTIME}</h3>
                </div>
                <div className="secretaryListBoxContent">
                  <p>{item.ZTMT_CONTENT}</p>
                </div>
              </div>
            </Timeline.Item>
          )
        }
      })
      return(
        <div style={{maxWidth:'500px', margin:'30px auto 30px 30px'}}>
          <h2>系统消息</h2>
          <hr style={{marginBottom:'30px', marginTop:'30px'}} />
          <Timeline>
            {messageList}
          </Timeline>
        </div>
      )
    } else {
      return(
        <div> loading... </div>
      )
    }
  }
}

function mapStateToProps(store){
  return {
    userinfo: store.user
  }
}
module.exports = connect(mapStateToProps)(Message)
