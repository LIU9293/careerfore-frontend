import React, { Component } from 'react';
import { getDiscoverList,getDiscoverFilterList } from '../../vendor/connection';
import { Button} from 'antd';
import style from './discover.css';
import { browserHistory } from 'react-router';
import QueueAnim from 'rc-queue-anim';
import Loading from '../loading';

class DiscoverList extends Component{

  constructor(props){
    super(props);
    this.state = {
      data: [],
      index: 1,
      loadContent:"点击加载更多",
      show: true,
    }
    this.loadData = this.loadData.bind(this);
    this.loadChannelList = this.loadChannelList.bind(this);
    this.getChannelIdByChannelName = this.getChannelIdByChannelName.bind(this);
    this.canFresh = true;
    this.channel = [];
    this.dataContent = [];
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
      this.setState({loadContent:"正在加载..."});
      getDiscoverList('', this.state.index, 5, (err,data)=>{
        this.canFresh = true;
        if(err){
          console.log(err);
        } else {
          console.log(data.PostsList)
          if(data.PostsList.length <= 0){
              this.setState({loadContent:"没有更多内容了"});
          }else{
            this.setState({loadContent:"数据处理中..."});
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
            this.setState({loadContent:"点击加载更多"});
          }
        }
      })
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
        let channerN = this.getChannelIdByChannelName(item.ZctName);
        let bg = 'url(' + item.PictureUrl + ')';
        let nikeName = item.NickName === "管理员"?"小C":item.NickName;
        var con = item.Content;
        if(con.length > 70){
          con = con.substring(0,70)+'...';
        }
        if(item.PictureUrl && item.PictureUrl !== undefined){
          return(
            <div key={ii} className="sectionMain recentNews cf-box" data-tid = {item.PostsID}>
            <div className='box-top'>
                <a href={'/user/'+item.NickName}>
                    <img data-uid={item.UserID} src={item.HeadUrl} className="box-avatar" />
                </a>
                <div className="nameAndCategory">
                    <div className="row" >
                      <a href={'/user/'+item.NickName}>
                        <div className="box-name" >{nikeName}</div><br/>
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
              <div className="box-content" style={{backgroundImage:bg}} onClick={()=>{browserHistory.push(`/discover/${item.PostsID}`);}}>
              </div>
              </div>
              <div className="box-bottom">
              <a href={'/discover/'+item.PostsID} className="aStyle">
                <div className="box-title">{item.Title}</div>
              </a>
              <p>{con}</p>
              <div className="box-time" style={{fontSize:'12px'}} onClick={()=>{browserHistory.push(`/discover/${item.PostsID}`);}}>继续阅读</div>
              {item.CommentNum} 评论 &amp; {0} 查看
            </div>
            </div>
          )
        }else {
          return(
            <div key={ii} className="sectionMain recentNews cf-box" data-tid = {item.PostsID}>
            <div className='box-top'>
                <a href={'/user/'+item.NickName}>
                    <img data-uid={item.UserID} src={item.HeadUrl} className="box-avatar" />
                </a>
                <div className="nameAndCategory">
                    <div className="row" >
                      <a href={'/user/'+item.NickName}>
                        <div className="box-name">{nikeName}</div><br/>
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
                    <div className="box-bottom">
                    <a href={'/discover/'+item.PostsID} className="aStyle">
                      <div className="box-title">{item.Title}</div>
                    </a>
                    <p>{con}</p>
                    <div className="box-time" style={{fontSize:'12px'}} onClick={()=>{browserHistory.push(`/discover/${item.PostsID}`);}}>继续阅读</div>
                    {item.CommentNum} 回复 &amp; {0} 查看
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

module.exports = DiscoverList
//{myReactComponent}
