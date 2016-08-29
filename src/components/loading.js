import React ,{ Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';

const styles = {
  wapper: {
    position: 'absolute',
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    display: 'table',
    zIndex: '9999999',
  },
  inner: {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
}

class Loading extends Component{
  render(){
    return(
      <div style={{...styles.wapper, display: this.props.loading ? 'table' : 'none'}}>
        <div style={styles.inner}>
          <Spin />
        </div>
      </div>
    )
  }
}

function mapStateToProps(store){
  return{
    loading: store.loading
  }
}

module.exports = connect(mapStateToProps)(Loading)
