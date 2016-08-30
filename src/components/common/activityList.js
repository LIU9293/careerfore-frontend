import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Icon } from 'antd';
import { area } from '../../vendor/connection';
import { id2name } from '../../vendor/helper/cityid';

const styles = {
  container: {
    height: '320px',
    width: '700px',
    boxShadow: '0px 1px 6px #BCBCBC',
    backgroundColor: '#fff',
    marginBottom: '30px',
    borderRadius: '3px',
    position: 'relative',
  },
  left: {
    display: 'inline-block',
    left: '0px',
    height: '100%',
    width: '450px',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  },
  right: {
    display: 'inline-block',
    right: '0px',
    height: '100%',
    width: '250px',
    paddingLeft: '30px',
    paddingTop: '20px',
    fontSize: '14px',
    position: 'absolute',
  },
  infoArea: {
    marginTop: '15px',
    marginRight: '15px',
    color: '#999',
  },
  infoBox: {
    height: '60px',
    width: '100%',
    lineHeight: '60px',
    borderBottom: 'solid 1px #ddd',
  },
};

class ActivityList extends Component{
  render(){
    const {data} = this.props;
    let activities = data.map((item,ii)=>{
      return(
        <div style={styles.container} key={ii}>
          <a onClick={e => browserHistory.push('/activity/'+item.id)}>
            <div style={{...styles.left, backgroundImage: 'url(' + item.cover + ')'}} />
          </a>
          <div style={styles.right}>
            <a onClick={e => browserHistory.push('/activity/'+item.id)}>
              <h2 style={{marginBottom: '10px'}}>{ item.title }</h2>
            </a>
            <p>{ item.content }</p>
            <div style={ styles.infoArea } >
              <div style={ styles.infoBox }>
                <Icon type="environment-o" style={{fontSize: '20px'}}/>
                <span style={{marginLeft:'20px'}}>{ id2name(item.cityID) }</span>
              </div>
              <div style={ styles.infoBox }>
                <Icon type="team" style={{fontSize: '20px'}}/>
                <span style={{marginLeft:'20px'}}>{item.enrolled + '人'}</span>
              </div>
              <div style={{ ...styles.infoBox, borderBottom: 'none' }}>
                <Icon type="calendar"  style={{fontSize: '20px'}}/>
                <span style={{marginLeft:'20px'}}>{item.startDate}</span>
              </div>
            </div>
          </div>
        </div>
      )
    })
    return(
      <div>
        { activities ? activities : null }
      </div>
    )
  }
}

function mapStateToProps(store){
  return{
    data: store.activityListData.data
  }
}

module.exports = connect(mapStateToProps)(ActivityList)
