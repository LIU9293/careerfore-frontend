import React, { Component } from 'react';
import { getActivityCarousel } from '../../vendor/connection';
import { Row, Col, Icon ,Carousel} from 'antd';
import { browserHistory } from 'react-router';
import styles from './activity.css';

class ActivityCarousels extends Component{
  constructor(props){
    super(props);
    this.state = {
      data:[]
    }
}

 componentDidMount(){
  getActivityCarousel(this.props.areaID,(err,data)=>{
    if (err) {
      console.log(err)
    }else {
      console.log(data);
      this.setState({
        data:data.HomeFigList
      })
    }
  })

 }

 render(){
   if (this.state.data.length<=0) {
     return(
       <div></div>
     )
   }else{
     let carousleList=this.state.data.map((item,ii)=>{
      return(
        <div className="picImg" key={ii} onClick={()=>{browserHistory.push(`/activity/${item.EventID}`)}}>
        <div className="carouselImg">
        <img src={item.PictureUrl}/>
        </div>
        <p>{item.Title}</p>
        </div>
      )
     })
     return(
       <Carousel autoplay className="large" key={Math.random()}>
       {carousleList}
       </Carousel>
     )
    }
 }

}
 module.exports = ActivityCarousels
