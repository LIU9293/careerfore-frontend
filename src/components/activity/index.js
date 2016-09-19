import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Row, Col ,Icon ,BackTop } from 'antd';
import ActivityCarousels from './ActivityCarousel';
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
  },
  upScroll:{
    height: '40px',
    width: '40px',
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#57c5f7',
    color: '#fff',
    textAlign: 'center',
    fontSize: '20px',
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
        <BackTop style={{ bottom: 230 }}>
          <div className="upScroll">UP</div>
        </BackTop>
      </div>
    )
  }
}

module.exports = Activity
