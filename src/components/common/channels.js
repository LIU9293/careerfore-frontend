import React, { Component } from 'react';
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

class Channels extends Component {

  constructor(props){
    super(props);
    this.state = {
      channels: null,
    }
  }

  componentDidMount(){
    getDiscoverFilterList((err,data)=>{
      if(err){console.log(err)} else {
        console.log(data.ChannelList);
        this.setState({
          channels: data.ChannelList
        })
      }
    })
  }

  handleClick(id){
    browserHistory.push('/channel/'+ id);
  }

  render(){
    if(!this.state.channels){
      return (
        <div>loading...</div>
      )
    } else {

      var channel = this.state.channels.map((item,ii)=>{
        return(
          <a onClick={this.handleClick.bind(this,item.ChannelID)} key={ii}>
            <div style={styles.box}>
              {item.ChannelName}
            </div>
          </a>
        )
      })
      return(
        <div style={styles.container}>
          <h2>职前发现</h2>
          <hr style={{width:'90%',margin:'auto'}}/>
          {channel}
        </div>
      )
    }
  }
}

module.exports = Channels
