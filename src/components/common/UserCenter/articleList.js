import React, { Component } from 'react';
import Single from './articleSingle';
import { connect } from 'react-redux';


class ArticleList extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    var lists = this.props.articleList;
    var singles;
    if(lists.length > 0){
      singles = lists.map((item,index)=>{
        return <Single singleData ={item} key = {index}/>
      })
      return (
        <div>
          {singles}
        </div>
      )
    }else {
      let singles = <img src = "http://imageservice.pine-soft.com/28943B0D496C4BCE8AEDB3E0BBDC8039.jpg"/>
      return (
        <div style ={{padding : '30px 0',textAlign:'center'}}>
          {singles}
        </div>
      )
    }

  }
}

module.exports = ArticleList
