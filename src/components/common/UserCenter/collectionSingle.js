import React, { Component } from 'react';
import { Icon} from 'antd';
import S from 'string';
import { browserHistory } from 'react-router';

const styles = {
  container:{
    width: '100%',
    borderRadius: '3px',
    overflow: 'hidden',
    border: 'solid 1px #efefef',
    padding:'16px'
  },
  cover:{
    height: '150px',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  content:{
    height: '100px',
    padding: '10px',
  },title:{
    color:'#999',
    fontSize: '14px',
    margin: '8px 0',
  },time:{
    float:'right',
  }
}

class CollectionSingle extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    let item = this.props.singleData;
    if(item.ZMCT_TYPE=="发现"){
      var content = S(item.UserArticle.ZPT_CONTENT).decodeHTMLEntities().stripTags().s,
          cover   = 'url(' + item.UserArticle.ZPT_COVER + ')',
          time    = item.UserArticle.ArticleReleaseToNow,
          id      = item.UserArticle.ZCT_ID,
          title   = item.UserArticle.ZPT_TITLE;
      if (content.length > 70) {
        content = content.substr(0, 70) + '...';
      }
      return(
        <div style={styles.container}>
          <div style = {styles.title}>收藏了&nbsp;&nbsp;{item.UserArticle.Push_People}&nbsp;&nbsp;的文章<span style = {styles.time}>{item.UserArticle.ArticleReleaseToNow}</span></div>
          <a onClick={()=>{browserHistory.push('/discover/'+id)}}>
            <div style={{...styles.cover, backgroundImage: cover}}></div>
          </a>
          <div style={styles.content}>
            <a onClick={()=>{browserHistory.push('/discover/'+id)}}>
              <h3 style={{marginTop:'10px',marginBottom:'10px'}}>{title}</h3>
            </a>
            <p>{content}</p>
          </div>
        </div>
      )
    }
  }
}

module.exports = CollectionSingle
