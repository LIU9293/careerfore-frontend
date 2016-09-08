import React, { Component } from 'react';
import { Icon} from 'antd';
import S from 'string';
import { browserHistory } from 'react-router';
import { id2name } from '../../../vendor/helper/cityid';

const styles = {
  container: {
    height: '320px',
    width: '100%',
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
    width: '200px',
    padding: '20px 15px',
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


class ActivitySingle extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    let item = this.props.singleData;
    return(
      <div style={styles.container}>
        <a onClick={e => browserHistory.push('/activity/'+item.ZET_ID)}>
          <div style={{...styles.left, backgroundImage: 'url(' + item.ZET_ADVERTS + ')'}} />
        </a>
        <div style={styles.right}>
          <a onClick={e => browserHistory.push('/activity/'+item.ZET_ID)}>
            <div style={{marginBottom: '10px',maxHeight: '50px',fontSize: '17px', overflow: 'hidden'}}>{ item.ZET_TITLE }</div>
          </a>
          <div dangerouslySetInnerHTML = {{__html : item.ActivityContent || ''}}></div>
          <div style={ styles.infoArea } >
            <div style={ styles.infoBox }>
              <Icon type="environment-o" style={{fontSize: '20px'}}/>
              <span style={{marginLeft:'20px'}}>{ id2name(item.cityID) }</span>
            </div>
            <div style={ styles.infoBox }>
              <Icon type="team" style={{fontSize: '20px'}}/>
              <span style={{marginLeft:'20px'}}>{item.ZET_PeopleNumber + '人'}</span>
            </div>
            <div style={{ ...styles.infoBox, borderBottom: 'none' }}>
              <Icon type="calendar"  style={{fontSize: '20px'}}/>
              <span style={{marginLeft:'20px'}}>{item.ZET_STARTTIME}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = ActivitySingle
