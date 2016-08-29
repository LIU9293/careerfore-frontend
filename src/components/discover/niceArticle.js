  import React, { Component } from 'react';
  import { connect } from 'react-redux';
  import { Icon,Button } from 'antd';
  import { browserHistory } from 'react-router';
  import { getnicepostlist, getDiscoverFilterList } from '../../vendor/connection';
  import {millseconds2DateDiff} from '../../vendor/helper/timeTransfer';
  import style from './discover.css';
  import QueueAnim from 'rc-queue-anim';
  import Loading from '../loading';

  class NiceArticle extends Component{

    constructor(props){
      super(props);
      this.state = {
        data: [],
        index: 1,
        loadContent:"点击加载更多",
        show: true,
      }
      this.loadData = this.loadData.bind(this);
      // this.loadChannelList = this.loadChannelList.bind(this);
      // this.getChannelIdByChannelName = this.getChannelIdByChannelName.bind(this);
      this.canFresh = true;
      // this.channel = [];
      this.dataContent = [];
    }

    // componentDidMount(){
    //   this.loadChannelList();
    // }
    //
    // loadChannelList(){
    //   getnicepostlist((err,data)=>{
    //     if(err){
    //       console.log(err);
    //     }else {
    //       console.log(data.NickPostList)
    //       data.NickPostList.map((item,index)=>{
    //         var obj ={
    //           key:item.ChannelName,
    //           value:item.ChannelID
    //         }
    //
    //         this.channel.push(obj);
    //       })
    //       this.loadData();
    //     }
    //   })
    // }
    // getChannelIdByChannelName(name){
    //   let a = null;
    //   this.channel.map((item,iii)=>{
    //     if(item.key == name){
    //       a = item.value;
    //     }
    //   })
    //   return a;
    // }
componentDidMount(){
    loadData(){
      if(this.canFresh){
        this.canFresh = false;
        this.setState({loadContent:"正在加载..."});
        // let channelID = this.props.params.id;
        getnicepostlist(this.state.PageCurrent, 5, (err,data)=>{
          this.canFresh = true;
          if(err){
            console.log(err);
          } else {
            console.log(data);
            if(data.length <= 0){
                this.setState({loadContent:"没有更多内容了"});
            }else{
              this.setState({loadContent:"数据处理中..."});
              if(this.state.PageCurrent === 1){
                this.setState({
                  data: data,
                  index :this.state.PageCurrent + 1
                })
              }else {
                this.setState({
                  data: this.state.data.concat(data),
                  index: this.state.PageCurrent + 1
                })
              }
              this.setState({loadContent:"点击加载更多"});
            }
          }
        })
      }
    }
  }

    render(){
      if(this.state.data.length === 0){
        return(
          <Loading />
        )
      } else {
        this.dataContent = [];
        let myReactComponent = this.state.data.map((item,ii)=>{
          let channerN = this.getChannelIdByChannelName(item.ZCT_NAME);
          let Time =millseconds2DateDiff(item.ZPT_RELEASEDATE)
          let bg = 'url(http://imageservice.pine-soft.com/'+ item.ZPT_COVER + ')';
          let nikeName = item.ZAT_NAME === "职前管理员"?"careerfore小仙女":item.ZAT_NAME;
          if(item.ZPT_COVER && item.ZPT_COVER !== undefined){
            return(
              <div key={ii} className="sectionMain recentNews cf-box" data-tid = {item.ZPT_ID}>
              <div className='box-top'>
                  <div className="nameAndCategory" style={{paddingLeft:0}}>
                      <div className="row" >
                        <a href={'/user/'+item.ZAT_NAME}>
                          <div className="box-name" >{nikeName}</div><br/>
                        </a>
                      </div>
                      <div className="row">
                            <div className="box-category" ><Icon type="appstore-o" />&nbsp;&nbsp;{item.ZPT_ISTOP}&nbsp;&nbsp;{item.ZPT_ISRECOMMEND}&nbsp;&nbsp;{item.ZPT_ISESSENCE}</div>
                      </div>
                    </div>
                    <div className="box-time">
                        <span className="timeago" >{Time}</span>
                    </div>
              </div>
              <div className="box-middle">
                <div className="box-content" style={{backgroundImage:bg}} onClick={()=>{browserHistory.push(`/discover/${item.ZPT_ID}`);}}>
                </div>
                </div>
                <div className="box-bottom">
                <a href={'/discover/'+item.ZPT_ID} className="aStyle">
                  <div className="box-title">{item.ZPT_TITLE}</div>
                </a>
                <div className="box-time" style={{fontSize:'12px'}} onClick={()=>{browserHistory.push(`/discover/${item.ZPT_ID}`);}}>继续阅读</div>
                <Icon type="eye" />&nbsp;&nbsp;{item.ZPT_PV}
              </div>
              </div>
            )
          }else {
            return(
              <div key={ii} className="sectionMain recentNews cf-box" data-tid = {item.ZPT_ID}>
              <div className='box-top'>
                  <div className="nameAndCategory" style={{paddingLeft:0}}>
                      <div className="row" >
                        <a href={'/user/'+item.ZAT_NAME}>
                          <div className="box-name">{nikeName}</div><br/>
                        </a>
                      </div>
                      <div className="row">
                            <div className="box-category" ><Icon type="appstore-o" />&nbsp;&nbsp;{item.ZPT_ISTOP}&nbsp;&nbsp;{item.ZPT_ISRECOMMEND}&nbsp;&nbsp;{item.ZPT_ISESSENCE}</div>
                      </div>
                    </div>
                    <div className="box-time">
                        <span className="timeago" >{Time}</span>
                    </div>
                    </div>
                      <div className="box-bottom">
                      <a href={'/discover/'+item.ZPT_ID} className="aStyle">
                        <div className="box-title">{item.ZPT_TITLE}</div>
                      </a>
                      <div className="box-time" style={{fontSize:'12px'}} onClick={()=>{browserHistory.push(`/discover/${item.ZPT_ID}`);}}>继续阅读</div>
                      <Icon type="eye" />&nbsp;&nbsp;{item.ZPT_PV}
                    </div>
              </div>
            )
          }
        })
        return(

          <div>
                <QueueAnim component="ul" type={['right', 'left']} >
                  {this.state.show ? myReactComponent  : null}
                </QueueAnim>

            <div className="loadCover">
                <span type="primary" className="loadMore" onClick={this.loadData}>{this.state.loadContent}</span>
            </div>
          </div>
        )
      }

    }
  }

  module.exports = NiceArticle
