import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPostsByChannel } from '../../vendor/connection';
import ArticleList from '../common/articleList';
import { millseconds2DateDiff } from '../../vendor/helper/timeTransfer';
import EssenceBox from './essenceBox';
import Topics from '../common/topics';

const styles = {
  noArticle: {
    width: '650px',
    paddingTop: '50px',
    paddingBottom: '50px',
    textAlign: 'center',
    fontSize: '16px',
    color: '#666',
  },
  wapper: {
    width: '1000px',
    margin: 'auto',
    marginTop: '30px',
    marginBottom: '30px',
  },
  side: {
    width: '300px',
    display: 'inline-block',
    position: 'absolute',
    paddingLeft: 'auto',
  },
  main: {
    width: '700px',
    display: 'inline-block',
    position: 'relative',
  },
}

class DiscoverTopicList extends Component{

  constructor(props){
    super(props);
    this.state = {
      page: 2,
      err: null,
      haveMore: true,
    }
    this.loadMore = this.loadMore.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadMore(){
    this.loadData(this.props.params.id, this.state.page);
    this.setState({
      page: this.state.page + 1,
    })
  }


  loadData(id, index){
    getPostsByChannel(id + ';', index, 10, 0, (err,data) => {
      if(err){
        console.log(err);
        this.setState({
          err: err
        });
        this.props.stopLoading();
      } else {
        console.log(data);
        let discoverListData = data.PostsList.map((item,ii)=>{
          return {
            commentNum: item.CommentNum,
            avatar: item.HeadUrl,
            category: item.ZctName,
            description: item.Content.length > 72 ? item.Content.substring(0,72)+'...' : item.Content,
            nickName: item.NickName,
            cover: item.PictureUrl || '',
            title: item.Title,
            time: millseconds2DateDiff(item.CreatDate),
            viewNum: 0,
            likeNum: item.LikeNum,
            essence: item.IsEssence == "精华" ? 1 : 0,
            top: item.IsTop == "置顶" ? 1 : 0,
            recommand: item.IsRecommend == "推荐" ? 1 : 0,
            id: item.PostsID,
            type: item.Type,
            content: item.Content,
          }

        });
        this.props.updateDiscoverListData(this.props.discoverListData.concat(discoverListData));
        if(data.PostsList.length < 10){
          this.setState({haveMore: false})
        }
        this.props.stopLoading();
      }
    })
  }

  componentWillMount(){
    this.props.startLoading();
  }

  componentDidMount(){
    this.loadData(this.props.params.id, 1);
  }

  componentWillUnmount(){
    this.props.updateDiscoverListData([]);
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.params.id !== this.props.params.id){
      this.props.updateDiscoverListData([]);
      this.setState({
        page: 2,
        haveMore: true,
        err: null
      });
      this.loadData(nextProps.params.id, 1);
    }
  }

  render(){
    return(
      this.state.err == null
      ? <div className='wapper1000'>
          <div style={styles.main}>
            <ArticleList />
            <button type="ghost" onClick={this.loadMore} disabled={!this.state.haveMore}>
              {this.state.haveMore ? '点击加载更多...' : '没有更多了...'}
            </button>
          </div>
          <div style={styles.side}>
            <div style={{marginBottom: '30px'}}>
              <Topics />
            </div>
            <EssenceBox />
          </div>
        </div>
      : <div className='wapper1000'>
          <div style={styles.main}>
            <div style={styles.noArticle}>
              {this.state.err}
            </div>
          </div>
          <div style={styles.side}>
            <div style={{marginBottom: '30px'}}>
              <Topics />
            </div>
            <EssenceBox />
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
