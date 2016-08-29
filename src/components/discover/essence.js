import React, { Component } from 'react';
import { connect } from 'react-redux';
import { essenceArticle } from '../../vendor/connection';
import ArticleList from '../common/articleList';
import { millseconds2DateDiff } from '../../vendor/helper/timeTransfer';
import Topics from '../common/topics';

class Essence extends Component{
  componentDidMount(){
    essenceArticle(1, 10, (err,data) => {
      if(err){console.log(err)} else {
        let essenceData = data.NickPostList.map((item,ii)=>{
          return {
            avatar: null,
            category: item.ZCT_ID,
            description: item.ZPT_TITLE,
            nickName: item.ZAT_NAME,
            cover: 'http://imageservice.pine-soft.com/' + item.ZPT_COVER,
            title: item.ZPT_TITLE,
            time: millseconds2DateDiff(item.ZPT_RELEASEDATE),
            viewNum: item.ZPT_PV,
            likeNum: 0,
            essence: item.ZPT_ISRECOMMEND == "精华" ? 1 : 0,
            top: item.ZPT_ISTOP == "置顶" ? 1 : 0,
            recommand: item.ZPT_ISRECOMMEND == "推荐" ? 1 : 0,
            id: item.ZAT_ID,
          }
        });
        this.props.updateDiscoverListData(essenceData);
      }
    })
  }
  render(){
    return(
      <div>
        <Topics />
        <ArticleList />
      </div>
    )
  }
}

//读数据
function mapStateToProps(store){
  return{
    discoverListData: store.discoverListData,
  }
}
//写数据
function mapDispatchToProps(dispatch){
  return{
    updateDiscoverListData: (data) => {dispatch({type:'UPDATE_DISCOVER_LIST_DATA',data: data })},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Essence)
