import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaygroundList } from '../../vendor/connection';
import ActivityList from '../common/activityList';
import AvailableCitiesBox from './availableCitiesBox';
import S from 'string';

const styles = {
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

class ActivityListByCity extends Component{

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
    this.loadData(this.props.params.cityID, 1)
  }

  componentWillUnmount(){
    this.props.updateActivityListData([]);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.params.cityID !== this.props.params.cityID){
      this.props.updateActivityListData([]);
      this.setState({page: 2, haveMore: true});
      this.loadData(nextProps.params.cityID,1);
    }
  }

  loadMore(){
    this.loadData(this.props.params.cityID, this.state.page);
    this.setState({
      page: this.state.page + 1,
    })
  }

  loadData(id, index){
    getPlaygroundList(id, index, 10, (err, data) => {
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
      <div className="wapper1000">
        <div style={styles.main}>
          <ActivityList />
          <button type="ghost" onClick={this.loadMore} disabled={!this.state.haveMore}>
            {this.state.haveMore ? '点击加载更多...' : '没有更多了...'}
          </button>
        </div>
        <div style={styles.side}>
          <AvailableCitiesBox select={this.props.params.cityID} />
        </div>
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
module.exports = connect(mapStateToProps, mapDispatchToProps)(ActivityListByCity)
