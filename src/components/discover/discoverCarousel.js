import React, { Component } from 'react';
import { Carousel } from 'antd';
import { getCarousel } from '../../vendor/connection';
import style from './index.css';
// import style from './discover.css';

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
        return(
          <div style={{width: '1000px', height: '400px',
           backgroundSize:  'cover',
           backgroundPosition: 'center center',
           backgroundImage: 'url('+item.PictureUrl+')'}} key={ii} />
        )
      })
      return(
        <div style={styles.wapper}>
          <Carousel autoplay style={styles.Carousel}>
            {myHomeFigList}
          </Carousel>
        </div>
      )
    }
  }
}
module.exports = DiscoverCarousel
