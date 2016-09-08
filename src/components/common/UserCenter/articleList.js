import React, { Component } from 'react';
import Single from './articleSingle';
import { connect } from 'react-redux';
import { BackTop } from 'antd';

const styles = {
  article:{
    marginTop: "5px",
    background: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 5px 0px'
  },
  upScroll:{
    height: '40px',
    width: '40px',
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#57c5f7',
    color: '#fff',
    textAlign: 'center',
    fontSize: '20px',
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
      <div>
      <div style = {styles.article}>
        {singles}
      </div>
      <BackTop style={{ bottom: 100 }}>
        <div className="upScroll">UP</div>
      </BackTop>
      </div>
    )
  }
}

module.exports = ArticleList
