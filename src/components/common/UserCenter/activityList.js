import React, { Component } from 'react';
import Single from './articleSingle';
import { connect } from 'react-redux';
import ActivitySingle from './activitySingle';

class ArticleLists extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    let lists = this.props.articleLists;
    if(lists.length === 0){
      let activities = <img src = "http://imageservice.pine-soft.com/D5B807895FFF41D3AD7F8027DD7BE933.jpg"/>
      return (
        <div style ={{padding : '30px 0',textAlign:'center'}}>
          {activities}
        </div>
      )
    }else {
      let activities = lists.map((item,index)=>{
        return <ActivitySingle singleData = {item} key = {index}/>
      })
      return(
        <div>
          {activities}
        </div>
      )
    }
  }
}

module.exports = ArticleLists
