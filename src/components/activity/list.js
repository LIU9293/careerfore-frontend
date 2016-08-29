import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaygroundList } from '../../vendor/connection';
import ActivityList from '../common/activityList';
import S from 'string';

class List extends Component{

  constructor(props){
    super(props);
    this.state = {
      page: 2,
      haveMore: true,
    };
    this.loadMore = this.loadMore.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentWillMount(){
    this.props.startLoading();
  }

  componentDidMount(){
    this.loadData(1)
  }

  componentWillUnmount(){
    this.props.updateActivityListData([]);
  }

  loadMore(){
    this.loadData(this.state.page);
    this.setState({
      page: this.state.page + 1,
    })
  }

  loadData(index){
    getPlaygroundList('', index, 10, (err, data) => {
      if(err){
        console.log(err);
      } else {
          let activities = data.map((item,ii)=>{
            let des = S(item.ActivityContent).decodeHTMLEntities().stripTags().s;
            if (des.length > 27) {
              des = des.substr(0, 27) + '...';
            }
            return {
              address: item.ActivityAddress,
              content: des,
              endDate: item.ActivityEndDate,
              startDate: item.ActivityStartDate,
              id: item.ActivityID,
              state: item.ActivityState,
              title: item.ActivityTitle,
              cityID: item.CityID,
              audit: item.IsAudit,
              enrolled: item.PeopleNum,
              cover: item.PictureUrl
            }
          });
          if(data.length < 10){
            this.setState({haveMore: false})
          }
        this.props.updateActivityListData(this.props.activityListData.concat(activities));
      };
      this.props.stopLoading();
    });
  }

  render(){
    return(
      <div>
        <ActivityList />
        <button type="ghost" onClick={this.loadMore} disabled={!this.state.haveMore}>
          {this.state.haveMore ? '点击加载更多...' : '没有更多了...'}
        </button>
      </div>
    )
  }
}

function mapStateToProps(store){
  return{
    activityListData: store.activityListData.data ,
    user: store.user ,
  }
}
function mapDispatchToProps(dispatch){
  return{
    updateActivityListData: (data) => {dispatch({type:'UPDATE_ACTIVITY_LIST_DATA',data: data })} ,
    startLoading: () => {dispatch({type:'START_LOADING'})} ,
    stopLoading: () => {dispatch({type:'STOP_LOADING'})} ,
  }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(List)
