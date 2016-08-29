import React, { Component } from 'react';
import { Carousel } from 'antd';
import { getCarousel } from '../../vendor/connection';
import style from './index.css';
// import style from './discover.css';

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
   //<img key={ii} src={item.PictureUrl} />
   //<div key={ii} className="box-content" style={{backgroundImage:bg}}>
  render(){
    if (this.state.data.length<=0) {
      return(
        <div></div>
      )
    }else {
      let myHomeFigList=this.state.data.map((item,ii)=>{
        let bg = 'url(' + item.PictureUrl + ')';
        return(
          <img key={ii} src={item.PictureUrl} />
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
