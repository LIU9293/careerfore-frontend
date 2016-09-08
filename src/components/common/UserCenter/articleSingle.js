import React, { Component } from 'react';
import { Icon} from 'antd';
import S from 'string';

const styles = {
  singleFather:{
    padding: '10px',
  },time:{
    float:'right',
  },newArticle:{
    fontSize: '14px',
    color: '#999',
  },singleTitle:{
    color: '#2db7f5',
    fontSize: '20px',
    margin: '8px 0',
  },singleMiddle:{
    overflow :'hidden',
  },singleBg:{
    // width: '50%',
    width: '100%',
    height: '230px',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    // float:'left',
  },singleArticle:{
    // width: '50%',
    width: '100%',
    padding: '0 1%',
    color: '#333',
    // fontSize: '13px',
    fontSize: '15px',
    marginTop : '15px',
    // float:'left',
  },goDetail:{
    cursor:'pointer',
    color:'#2db7f5',
  },singleBottom:{
    marginTop: '15px',
    fontSize: '14px',
    paddingBottom: '10px',
    borderBottom: '1px solid lightgray',
  }
}

class Single extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    let singleData = this.props.singleData;
    var content = S(singleData.ZPT_CONTENT).decodeHTMLEntities().stripTags().s,
    content = content.length >180?(content.substring(0,180)+"..."):content;
    content += "&nbsp;&nbsp;<a target = '_blank' href = '/discover/"+singleData.ZCT_ID+"'>查看详情</a>"
    let bg = 'url(' + singleData.ZPT_COVER + ')';
    return(
      <div style = {styles.singleFather}>
        <div style = {styles.newArticle} >发布了新文章<span style = {styles.time}>{singleData.ArticleReleaseToNow}</span></div>
        <div style = {styles.singleTitle}>{singleData.ZPT_TITLE}</div>
        <div style = {styles.singleMiddle}>
          <div style={{...styles.singleBg, backgroundImage:bg,height: singleData.ZPT_COVER === "http://imageservice.pine-soft.com/" ?'0':'230px'}}>
          </div>
          <div style = {styles.singleArticle} dangerouslySetInnerHTML = {{__html : content || ''}}>
          </div>
        </div>
        <div style = {styles.singleBottom} >
          <span><Icon type="heart" style = {{color:'red'}}/> (2)</span>&nbsp;&nbsp;·&nbsp;&nbsp;
          <span><Icon type="star" style = {{color:'rgb(226,192,141)'}}/> (2)</span>&nbsp;&nbsp;·&nbsp;&nbsp;
          <span>收藏 (2)</span>
        </div>
      </div>
    )
  }
}

module.exports = Single
