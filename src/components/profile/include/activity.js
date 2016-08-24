import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserActivities, getPlaygroundList } from '../../../vendor/connection';
import { browserHistory } from 'react-router';
import S from 'string';

const styles = {
  container:{
    height: '250px',
    width: '500px',
    borderRadius: '3px',
    overflow: 'hidden',
    border: 'solid 1px #efefef',
    marginBottom: '20px'
  },
  cover:{
    height: '150px',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  content:{
    height: '100px',
    padding: '10px',
  }
}

class Activity extends Component {

  constructor(props){
    super(props);
    this.state = {
      activityError: null,
      activityData: { loaded: false, data: null },
    }
  }

  componentDidMount(){
    getUserActivities(this.props.userinfo.userid, (err,data)=>{
      if(err){
        console.log(err);
        this.setState({
          activityError: err
        })
      } else {
        console.log(data);
        this.setState({
          activityData: { loaded: true, data: data.UserActivityList}
        });
      }
    })
  }

  render(){
    if(this.state.activityError){
      return(
        <div>this.state.activityError</div>
      )
    } else if(this.state.activityData.loaded){

      let activity = this.state.activityData.data.map((item,ii)=>{
        let cover = 'url(' + item.ZET_ADVERTS + ')';
        let title = item.ZET_TITLE;
        let id = item.ZET_ID;
        let startTime = item.ZET_STARTTIME;
        let peopleNumber = item.ZET_PeopleNumber;
        return(
          <div style={styles.container} key={Math.random()}>
            <a onClick={()=>{browserHistory.push('/activity/'+id)}}>
              <div style={{...styles.cover, backgroundImage: cover}}></div>
            </a>
            <div style={styles.content}>
              <a onClick={()=>{browserHistory.push('/activity/'+id)}}>
                <h3 style={{marginTop:'10px',marginBottom:'10px'}}>{title}</h3>
              </a>
              <p>{startTime}</p>
              <p>{peopleNumber}</p>
            </div>
          </div>
        )
      })

      return(
        <div style={{maxWidth:'500px', margin:'30px auto 30px 30px'}}>
          <h2>我的活动</h2>
          <hr style={{marginBottom:'30px', marginTop:'30px'}}/>
          { activity }
        </div>
      )

    } else {
      return (
        <div>loading...</div>
      )
    }
  }
}

function mapStateToProps(store){
  return {
    userinfo: store.user
  }
}

module.exports = connect(mapStateToProps)(Activity)
