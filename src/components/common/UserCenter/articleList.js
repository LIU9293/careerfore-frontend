import React, { Component } from 'react';
import Single from './articleSingle';
import { connect } from 'react-redux';

const styles = {
  article:{
    marginTop: "5px",
    background: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 5px 0px'
  }
}

class ArticleList extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    var singles;
    singles = this.props.articleList.map((item,index)=>{
      return <Single singleData ={item} key = {index}/>
    })
    return (
      <div style = {styles.article}>
        {singles}
      </div>
    )
  }
}

module.exports = ArticleList
