import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaygroundList } from '../../vendor/connection';
import { id2name } from '../../vendor/helper/cityid';
import { Radio } from 'antd';
import { browserHistory } from 'react-router';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const styles = {
  container: {
    width: '270px',
    boxShadow: '0px 1px 6px #BCBCBC',
    backgroundColor: '#fff',
    padding: '15px',
    marginLeft: 'auto',
  },
  radio: {
    width: 'calc( 100% - 60px )',
    border: 'none',
    paddingTop: '10px',
    paddingBottom: '10px',
    height: '48px',
    borderBottom: 'solid 1px #ccc',
    borderRadius: '0',
    textAlign: 'center',
    marginLeft: '30px',
    marginRight: '30px',
    boxShadow: 'none',
  }
}

class AvailableCitiesBox extends Component{

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    browserHistory.push('/activity/city/'+e.target.value);
  }

  render(){
    let a = Object.entries(this.props.availableCities);
    let b = a.map(item => {
      return{
        city: id2name(item[0]),
        id: item[0],
        num: item[1],
      }
    });
    let c = b.map((item,ii)=>{
      if(ii == b.length -1 ){
        return (
          <RadioButton style={{...styles.radio, borderBottom: 'none'}} value={item.id} key={ii}>{item.city}</RadioButton>
        )
      } else {
        return (
          <RadioButton style={styles.radio} value={item.id} key={ii}>{item.city}</RadioButton>
        )
      }
    });
     return(
      <div style={styles.container} >
        <h2>地点</h2>
        <hr style={{marginTop:'10px',marginBottom:'10px'}} />
        <RadioGroup style={{width:'100%'}}  onChange={this.onChange} defaultValue={ this.props.select || null } >
          { c !== undefined ? c : null }
        </RadioGroup>
      </div>
    )
  }

}

function mapStateToProps(store){
  return {
    availableCities: store.availableCities ,
    activityListData: store.activityListData.data ,
    user: store.user ,
  }
}
function mapDispatchToProps(dispatch){
  return {
    updateActivityListData: (data) => {dispatch({type:'UPDATE_ACTIVITY_LIST_DATA',data: data })} ,
    startLoading: () => {dispatch({type:'START_LOADING'})} ,
    stopLoading: () => {dispatch({type:'STOP_LOADING'})} ,
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AvailableCitiesBox)
