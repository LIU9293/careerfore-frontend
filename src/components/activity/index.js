import React, { Component } from 'react';
import { getPlaygroundList } from '../../vendor/connection';
import { browserHistory } from 'react-router';
import styles from './activity.css';
import { Row, Col ,Icon} from 'antd';
import ActivityCarousels from './ActivityCarousel';
import QueueAnim from 'rc-queue-anim';


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
        let activityList = data.map((item,ii)=>{
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
          let realContent=ActivityContent;
          if (ActivityContent.length>20) {
              realContent= ActivityContent.substring(0,20)+"...";
          }
          return(

              <Col xs={{span:20}} sm={{span:20}} md={{span:8}} lg={{span:8}} key={Math.random()}>
                <div className='page' key={ii} onClick={()=>{browserHistory.push(`/activity/${item.ActivityID}`)}}>
                  <div className='pageImg'>
                    <div className='pageOverlay'></div>
                    <div className='pageCategory'>{ActivityState}</div>
                    <div className='pageNum'>已有{PeopleNum}个小伙伴报名</div>
                    <img src={PictureUrl}/>
                  </div>
                  <div className='Txt'>
                    <h3>{ActivityTitle}</h3>
                    <p>{realContent}</p>
                    <span><Icon type="clock-circle-o" />{ActivityStartDate} - {ActivityEndDate}</span><br/>
                    <span><Icon type="environment-o" />{ActivityAddress}</span>
                    <div className="DetailComment">
                      <span><a>查看详情</a></span>
                    </div>
                  </div>
                </div>
              </Col>
          )
        });
        this.setState({
          data: activityList
        })
      }
    })
  }
  render(){
    return(
      <div className="width1000">
        <QueueAnim type={['right', 'left']} delay={500}>
          {this.state.show ? activityList : null}
        </QueueAnim>
        <div>
        <ActivityCarousels arerid={this.props.arerID} />
        </div>
        <Row>
        {this.state.data}
        </Row>
      </div>


    )
  }
}

module.exports = Activity
