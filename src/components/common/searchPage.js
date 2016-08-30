import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchFound } from '../../vendor/connection';
import ArticleList from './articleList';
import { Button } from 'antd';

const styles = {
  wapper: {
    maxWidth: '1000px',
    margin: 'auto',
    paddingTop: '30px',
    paddingBottom: '30px',
  }
}

class SearchPage extends Component{

  constructor(props){
    super(props);
    this.moreSearch = this.moreSearch.bind(this);
  }

  componentWillUnmount(){
    this.props.updateDiscoverListData([]);
  }

  moreSearch(){
    searchFound(this.props.searchContent.key, this.props.searchContent.page + 1, 10, (err,data)=>{
      if(err){console.log(err)} else {
        console.log(data);
        if(data.SearchFoundList){
          let discoverData =  data.SearchFoundList.map((item, ii)=>{
            let des = S(item.Content).decodeHTMLEntities().stripTags().s;
            if (des.length > 72) {
              des = des.substr(0, 72) + '...';
            }
            return(
              {
                avatar: null,
                category: item.ChannelName,
                description: des,
                nickName: item.ReleasePerson,
                cover: item.CoverImg,
                title: item.Title,
                time: millseconds2DateDiff(item.Date),
                viewNum: 0,
                likeNum: 0,
                essence: 0,
                top: 0,
                recommand: 0,
                id: item.ID,
              }
            )
          });
          this.props.updateDiscoverData(this.props.discoverData.data.concat(disocoverData));
          this.props.updatePage(this.props.searchContent.page + 1, data.SearchFoundList.length == 10 ? true : false);
        }
      }
    })
  }

  render(){
    return(
      <div style={styles.wapper}>
        <ArticleList />
        <Button type='ghost' onClick={this.moreSearch} disabled={!this.props.searchContent.haveMore} >
          {this.props.searchContent.haveMore ? '点击加载更多' : '没有更多了'}
        </Button>
      </div>
    )
  }

}

function mapStateToProps(store){
  return{
    searchContent: store.search ,
    disocoverData: store.disocoverData ,
  }
}
function mapDispatchToProps(dispatch){
  return{
    search: (key) => {dispatch({type:'UPDATE_SEARCH_KEY', key: key})} ,
    updatePage: (page,haveMore) => {dispatch({type:'UPDATE_SEARCH_PAGE', page: page, haveMore: haveMore, })} ,
    updateDiscoverData: (data) => {dispatch({type:'UPDATE_DISCOVER_LIST_DATA', data: data})} ,
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(SearchPage)
