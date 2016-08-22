import React, { Component } from 'react';
import { getPlaygroundPost } from '../../vendor/connection';
import { Row, Col, Icon } from 'antd';
import styles from './activity.css';
import ActivityComment from './activityComment';

class ActivityPost extends Component{

  constructor(props){
    super(props);
    this.state={
      activityData:{},
    }
  }

  componentDidMount(){
    getPlaygroundPost(this.props.params.activityID, '',(err,data)=>{
      if(err){
        console.log(err);
      } else {
        console.log(data);
        let image = data.Activity.ActivityPictureUrl;
        let content = data.Activity.ActivityContent;
        let title = data.Activity.ActivityTitle;
        let Address=data.Activity.ActivityAddress;
        let StartDate=data.Activity.ActivityStartDate;
        let EndDate=data.Activity.ActivityEndDate;
        let CheckPeopleNum=data.Activity.CheckPeopleNum;
        let PeopleNum=data.Activity.PeopleNum;
        let Fee=data.Activity.Fee;
        let Latitude=data.Activity.ActivityLatitude;
        let Longitude=data.Activity.ActivityLongitude;
        this.setState({
          activityData:{
            image: image,
            content: content,
            title: title,
            Address:Address,
            StartDate:StartDate,
            EndDate:EndDate,
            CheckPeopleNum:CheckPeopleNum,
            PeopleNum:PeopleNum,
            Fee:Fee,
            Latitude:Latitude,
            Longitude:Longitude,
          }
        })
      };
    })
    console.log(this.state.activityData);
  }

  render(){
    return(
      <Row>
        <Col xs={2} sm={4} md={6} lg={4} />
          <Col xs={20} sm={16} md={12} lg={16}>
            <div className="Img">
            <img src={this.state.activityData.image || ''}/>
            </div>
            <div className="detail">
              <h1>{this.state.activityData.title || ''}</h1>
              <div className="FontLg" dangerouslySetInnerHTML={{__html: this.state.activityData.content || ''}} />
              <p><Icon type="clock-circle-o" />{this.state.activityData.StartDate || ''} - {this.state.activityData.EndDate || ''}</p>
              <p><Icon type="team" />{this.state.activityData.PeopleNum || '0'}人(限{this.state.activityData.CheckPeopleNum || ''}人报名)</p>
              <p><Icon type="environment-o" />{this.state.activityData.Address}</p>
              <ActivityComment activityID={this.props.params.activityID} />
            </div>
          </Col>
        <Col xs={2} sm={4} md={6} lg={4} />
      </Row>
    )
  }
}

module.exports = ActivityPost
