import React, { Component } from 'react';
import { Carousel } from 'antd';
import { getActivityCarousel } from '../../vendor/connection';


const styles = {
  wapper: {
    height: '400px',
    width: '1000px',
    margin: 'auto',
  },
  Carousel: {
    height: '100%',
    width: '100%',
  }
}

class ActivityCarousel extends Component{

  constructor(props){
    super(props);
    this.state={
      data:[]
    }
  }
  componentDidMount(){
     getActivityCarousel('',(err,data)=>{
       if (err) {console.log(err)}else {
         this.setState({
           data:data.HomeFigList,
         })
       }
     })
   }

  render(){
    if (this.state.data.length<=0) {
      return(
        <div></div>
      )
    }else {
      let myHomeFigList=this.state.data.map((item,ii)=>{
        return(
          <div style={{width: '1000px', height: '400px',
           backgroundSize:  'cover',
           backgroundPosition: 'center center',
           backgroundImage: 'url('+item.PictureUrl+')'}} key={ii} />
        )
      })
      return(
        <div style={styles.wapper}>
          <Carousel autoplay >
            {myHomeFigList}
          </Carousel>
        </div>
      )
    }
  }
}
module.exports = ActivityCarousel
