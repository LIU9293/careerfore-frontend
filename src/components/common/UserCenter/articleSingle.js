import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    height: '230px',
  },singleBg:{
    width: '50%',
    height: '100%',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  },singleArticle:{
    width: '50%',
    padding: '0 1%',
    margin: '-230px 0 0 50%',
    color: '#333',
    fontSize: '13px',
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
        <div style = {styles.newArticle}>发布了新文章<span style = {styles.time}>{singleData.ArticleReleaseToNow}</span></div>
        <div style = {styles.singleTitle}>{singleData.ZPT_TITLE}</div>
        <div style = {styles.singleMiddle}>
          <div style={{backgroundImage:bg,width: '50%',height: '100%',backgroundPosition: 'center center',backgroundSize: 'cover'}}>
          </div>
          <div style = {styles.singleArticle} dangerouslySetInnerHTML = {{__html : content || ''}}>
          </div>
          {/*<div style = {styles.singleArticle} >评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论<span>查看详情</span>
          </div>*/}
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

function mapStateToProps(store){
  return {
    userinfo: store.user,
    dianzan:store.dianzan,
  }
}

function mapDispatchToProps(dispatch){
  return {
    zan :(objid)=>{dispatch({
      type:"LIKE_TOGGLE",
      objid:objid
    })}
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(Single)
