import React, { Component } from 'react';
import { getPlaygroundList } from '../../vendor/connection';
import styles from './activity.css';
import { Row, Col ,Icon} from 'antd';

class Activity extends Component{

  constructor(props){
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount(){
    getPlaygroundList('',1,10,(err,data)=>{
      if(err){console.log(err)} else {
        console.log(data);
        let discvoerList = data.map((item,ii)=>{
          let ActivityState=item.ActivityState;
          let PictureUrl=item.PictureUrl;
          let ActivityTitle=item.ActivityTitle;
          let ActivityContent=item.ActivityContent;
          let ActivityStartDate=item.ActivityStartDate;
          let ActivityEndDate=item.ActivityEndDate;
          let ActivityID=item.ActivityID;
          let CityID=item.CityID;
          let ActivityAddress=item.ActivityAddress;
          let PeopleNum=item.PeopleNum;
          return(
              <Col xs={{span:20}} sm={{span:20}} md={{span:8}} lg={{span:8}} key={Math.random()}>
                <div className='page' key={ii}>
                  <div className='pageImg'>
                    <div className='pageOverlay'></div>
                    <div className='pageCategory'>{ActivityState}</div>
                    <div className='pageNum'>已有{PeopleNum}个小伙伴报名</div>
                    <img src={PictureUrl}/>
                  </div>
                  <div className='Txt'>
                    <h3>{ActivityTitle}</h3>
                    <p>{ActivityContent}</p>
                    <span><Icon type="clock-circle-o" />{ActivityStartDate} - {ActivityEndDate}</span><br/>
                    <span><Icon type="environment-o" />{ActivityAddress}</span>
                    <span><a href={'/activity/'+ActivityID}>查看详情</a></span>
                  </div>
                </div>
              </Col>
          )
        });
        this.setState({
          data: discvoerList
        })
      }
    })
  }

  render(){
    return(
      <div>
        <Row>
        {this.state.data}
        </Row>
      </div>
    )
  }
}

module.exports = Activity
