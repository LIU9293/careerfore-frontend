import React, { Component } from 'react';
import { getDiscoverList,getDiscoverFilterList } from '../../vendor/connection';
import { Button } from 'antd';
import style from './discover.css';
// import {millseconds2DateDiff}

class DiscoverList extends Component{

  constructor(props){
    super(props);
    this.state = {
      data: [],
      index: 1,
    }
    this.loadData = this.loadData.bind(this);
    this.loadChannelList = this.loadChannelList.bind(this);
    this.getChannelIdByChannelName = this.getChannelIdByChannelName.bind(this);
    this.canFresh = true;
    this.channel = [];
  }

  componentDidMount(){
    this.loadChannelList();
  }

  loadChannelList(){
    getDiscoverFilterList((err,data)=>{
      if(err){
        console.log(err);
      }else {
        data.ChannelList.map((item,index)=>{
          var obj ={
            key:item.ChannelName,
            value:item.ChannelID
          }
          this.channel.push(obj);
        })
        this.loadData();
      }
    })
  }

  getChannelIdByChannelName(name){
    console.log(this.channel);
    let a = null;
    this.channel.map((item,iii)=>{
      if(item.key == name){
        a = item.value;
      }
    })
    return a;
  }

  loadData(){
    if(this.canFresh){
      this.canFresh = false;
      getDiscoverList('', this.state.index, 5, (err,data)=>{
        this.canFresh = true;
        if(err){
          console.log(err);
        } else {
          console.log(data.PostsList);
          if(this.state.index === 1){
            this.setState({
              data: data.PostsList,
              index :this.state.index + 1
            })
          }else {
            this.setState({
              data: this.state.data.concat(data.PostsList),
              index: this.state.index + 1
            })
          }
        }
      })
    }
  }

  render(){
    if(this.state.data.length == 0){
      return(
        <div>
          <h1>loading...</h1>
        </div>
      )
    } else {
      let myReactComponent = this.state.data.map((item,ii)=>{
        let channerN = this.getChannelIdByChannelName(item.ZctName);
        let bg = 'url(' + item.PictureUrl + ')';
        let nikeName = item.NickName === "管理员"?"小C":item.NickName;
        return(
          <div key={ii} className="sectionMain recentNews cf-box" data-tid = {item.PostsID}>
          <div className='box-top'>
              <a href={'/user/'+item.NickName}>
                  <img data-uid={item.UserID} src={item.HeadUrl} className="box-avatar" />
              </a>
              <div className="nameAndCategory">
                  <div className="row" >
                    <a href={'/user/'+item.NickName}>
                      <div className="box-name">{item.NickName}</div><br/>
                    </a>
                  </div>
                  <div className="row">
                    <a href={'/category/'+channerN}>
                      <div className="icon">
                        <i className="fa fa-fw fa-bank"></i>
                      </div>
                        <div className="box-category">{item.ZctName}</div>
                    </a>
                  </div>
                </div>
                <div className="box-time">
                    <span className="timeago" >{item.Date}</span>
                </div>
          </div>
          <div className="box-middle">
            <a href={'/discover/:'+item.PostsID}>
            <div className="box-content" style={{backgroundImage:bg}}>
            </div>


            </a>
            </div>
            <div className="box-bottom">
            <a href={'/discover/:'+item.PostsID} className="aStyle">
              <div className="box-title">{item.Title}</div>
            </a>
            <p>前言两年前，如果有人问我“什么是青春”，我会毫不犹豫地告诉他“青春就是在放荡不羁的岁月里，做自己不后悔的事”。现在，我的回答是“青春就是，和...</p>
            <a href={'/discover/:'+item.PostsID}>
              <div className="box-time" style={{fontSize:'12px'}}>继续阅读</div>
            </a>
            {item.CommentNum} 回复 &amp; {0} 查看
          </div>

          </div>
        )
      })
      return(
        <div>
          {myReactComponent}
          <Button type="primary" onClick={()=>{this.loadData()}}>点击加载更多</Button>
        </div>
      )
    }

  }
}

module.exports = DiscoverList
/*
<div className="box-content" style={{backgroundImage:item.PictureUrl}}></div>

*/


/*

*/
