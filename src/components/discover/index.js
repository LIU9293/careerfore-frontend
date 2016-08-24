import React, { Component } from 'react';
import DiscoverTag from './discoverTag';
import DiscoverCarousel from './discoverCarousel';
import DiscoverList from './discoverList';
import SimpEditor from './PostArticle';


class Discover extends Component{

  constructor(props){
    super(props);
    this.editor = null;
  }

  render(){
    return(
      <div>
        <DiscoverTag />
        <DiscoverCarousel />
        <DiscoverList NumPerPage={6} />
      </div>
    )
  }
}

module.exports = Discover
