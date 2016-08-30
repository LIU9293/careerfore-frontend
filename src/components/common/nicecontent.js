import React, { Component } from 'react';
import NiceArticle from '../discover/niceArticle';
import { getDiscoverFilterList } from '../../vendor/connection';
import { browserHistory } from 'react-router';
const styles = {
  box:{
    width: '33%',
    height: '40px',
    textAlign: 'center',
    display: 'inline-block',
  },
  container: {
    width: '300px',
    backgroundColor: '#fff',
  },
}


class Nicecontents extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div style={styles.container} >
        <h2> 精华推荐 </h2>
        { NiceArticle }
      </div>
    )
  }
}

module.exports = Nicecontents
