import React, { Component } from 'react';
import { getDiscoverFilterList } from '../../vendor/connection';
import { millseconds2DateDiff } from '../../vendor/helper/timeTransfer';
import { browserHistory } from 'react-router';

const styles = {
  container: {
    width: '320px',
    height: '290px',
    boxShadow: '0px 1px 6px #BCBCBC',
    backgroundColor: '#fff',
    padding: '15px',
    marginLeft: 'auto',
  },
  box: {
    width: '33%',
    height: '42px',
    lineHeight: '25px',
    display: 'inline-block',
    paddingLeft: '13px',
    paddingTop: '9px',
    paddingBottom: '9px',
    fontSize: '12px',
    color: '#666',
  },
  img: {
    height: '22px',
    width: '22px',
    marginRight: '4px',
  },
  name: {
    position: 'absolute',
    display: 'inline-block',
  }
}

class Topics extends Component{

  constructor(props){
    super(props);
    this.state = {
      data: null,
    }
  }

 componentDidMount(){
  getDiscoverFilterList((err,data) => {
    if (err) {
      console.log(err)
    }else {
      let topicList = data.ChannelList.map((item,ii)=>{
        return(
          <a onClick={e=>browserHistory.push('/discover/topic/'+item.ChannelID)} key={ii}>
            <div style={styles.box}>
              <img src={`http://img.careerfore.com/${item.ChannelName}@2x.png`} style={styles.img} />
              <div style={styles.name}>
                {item.ChannelName}
              </div>
            </div>
          </a>
        )
      })
      this.setState({
        data: topicList
      });
    }
  })
 }

 render(){
   return(
     <div style={styles.container}>
      <h2>职前发现</h2>
      <hr style={{marginTop:'10px',marginBottom:'10px'}} />
      {this.state.data}
     </div>
   )
  }
}

module.exports = Topics
