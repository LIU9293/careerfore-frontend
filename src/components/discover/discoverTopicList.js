import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPostsByChannel } from '../../vendor/connection';
import ArticleList from '../common/articleList';
import { millseconds2DateDiff } from '../../vendor/helper/timeTransfer';

const styles = {
  noArticle: {
    width: '650px',
    paddingTop: '50px',
    paddingBottom: '50px',
    textAlign: 'center',
    fontSize: '16px',
    color: '#666',
  }
}

class DiscoverTopicList extends Component{

  constructor(props){
    super(props);
    this.state = {
      page: 2,
      err: null,
    }
    this.loadMore = this.loadMore.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadMore(){
    this.loadData(this.state.page);
    this.setState({
      page: this.state.page + 1,
    })
  }

  loadData(index){
    getPostsByChannel(this.props.params.id + ';', index, 10, (err,data) => {
      if(err){
        console.log(err);
        this.setState({
          err: err
        });
        this.props.stopLoading();
      } else {
        console.log('服务器返回的PostsList数据是：');
        console.log(data.PostsList);
        let discoverListData = data.PostsList.map((item,ii)=>{
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
            id: item.ZPT_ID,
          }
        });
        this.props.updateDiscoverListData(this.props.discoverListData.concat(discoverListData));
        this.props.stopLoading();
      }
    })
  }

  componentWillMount(){
    this.props.startLoading();
  }

  componentDidMount(){
    this.loadData(1);
  }

  componentWillUnmount(){
    this.props.updateDiscoverListData([]);
  }

  render(){
    return(
      this.state.err == null
      ? <div className='wapper1000'>
          <ArticleList />
          <p onClick={this.loadMore}>点击加载更多...</p>
        </div>
      : <div className='wapper1000'>
          <div style={styles.noArticle}>
            {this.state.err}
          </div>
        </div>
    )
  }
}

//读数据
function mapStateToProps(store){
  return{
    discoverListData: store.discoverListData.data,
    user: store.user,
  }
}
//写数据
function mapDispatchToProps(dispatch){
  return{
    updateDiscoverListData: (data) => {dispatch({type:'UPDATE_DISCOVER_LIST_DATA',data: data })},
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(DiscoverTopicList)
