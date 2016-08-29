import React, { Component } from 'react';
import DiscoverTag from './discoverTag';
import DiscoverCarousel from './discoverCarousel';
import DiscoverList from './discoverList';
import Essence from './essence';
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
        <Essence/>
      </div>
    )
  }
}

module.exports = Discover
