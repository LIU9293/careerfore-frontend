import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Row, Col ,Icon} from 'antd';
import ActivityCarousels from './ActivityCarousel';
<<<<<<< HEAD
import QueueAnim from 'rc-queue-anim';

class Activity extends Component{

  constructor(props){
    super(props);
    this.state = {
      data: null
    }
=======
import List from './list';
import AvailableCitiesBox from './availableCitiesBox';

const styles = {
  wapper:{
    width: '1000px',
    margin: 'auto',
    paddingTop: '30px',
    paddingBottom: '30px',
  },
  main: {
    width: '700px',
    display: 'inline-block',
    position: 'relative',
  },
  side: {
    width: '300px',
    display: 'inline-block',
    position: 'absolute',
    paddingLeft: 'auto',
  },
  CarouselWapper: {
    width: '100%',
    backgroundColor: '#3f3f3f',
>>>>>>> master
  }
}

class Activity extends Component{
  render(){
    return(
      <div>
        <div style={styles.CarouselWapper}>
          <ActivityCarousels />
        </div>
        <div style={styles.wapper}>
          <div style={styles.main}>
            <List />
          </div>
          <div style={styles.side}>
            <AvailableCitiesBox />
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Activity
