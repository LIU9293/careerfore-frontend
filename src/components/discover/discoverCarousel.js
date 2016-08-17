import React, { Component } from 'react';
import { Carousel } from 'antd';
import { getCarousel } from '../../vendor/connection';
import styles from './index.css';
class DiscoverCarousel extends Component{

  constructor(props){
    super(props);
    this.state={
      data:[]
    }
  }
  componentDidMount(){
     getCarousel((err,data)=>{
       if (err) {console.log(err)}else {
         console.log(data);
         this.setState({
           data:data.HomeFigList,
         })
         console.log(this.state.data);
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
          <img key={ii}
          src={item.PictureUrl}
          />
        )
      })
      return(
        <Carousel autoplay className="size">
          {myHomeFigList}
        </Carousel>
      )
    }
  }
}
module.exports = DiscoverCarousel
