import React, { Component } from 'react';
import DiscoverTag from './discoverTag';
import DiscoverCarousel from './discoverCarousel';
import DiscoverList from './discoverList';

class Discover extends Component{

  constructor(props){
    super(props);
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
