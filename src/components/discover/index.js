import React, { Component } from 'react';
import DiscoverCarousel from './discoverCarousel';
import DiscoverList from './discoverList';
import SimpEditor from './PostArticle';
import EssenceBox from './essenceBox';
import Topics from '../common/topics';
import style from './index.css';

const styles = {
  wapper:{
    width: '1000px',
    margin: 'auto',
    paddingTop: '30px',
    paddingBottom: '30px',
  },
  main: {
    width: '650px',
    display: 'inline-block',
    position: 'relative',
  },
  side: {
    width: '350px',
    display: 'inline-block',
    position: 'absolute',
  },
  CarouselWapper: {
    width: '100%',
    backgroundColor: '#3f3f3f',
  }
}


class Discover extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <div style={styles.CarouselWapper}>
          <DiscoverCarousel />
        </div>
        <div style={styles.wapper}>
          <div style={styles.main}>
            <DiscoverList NumPerPage={6} />
          </div>
          <div style={styles.side} >
            <div style={{marginBottom: '30px'}}>
              <Topics />
            </div>
            <div id="sideFix">
              <EssenceBox />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Discover
