import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserArticles } from '../../../vendor/connection';
import { browserHistory } from 'react-router';
import S from 'string';

const styles = {
  container:{
    height: '250px',
    width: '500px',
    borderRadius: '3px',
    overflow: 'hidden',
    border: 'solid 1px #efefef',
    marginBottom: '20px'
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
  }
}

class Article extends Component{

  constructor(props){
    super(props);
    this.state = {
      articleInfo: {data: null, loaded: false},
      articleError: null
    }
  }

  componentDidMount(){
    getUserArticles(this.props.userinfo.userid, (err,data)=>{
      if(err){
        console.log(err);
        this.setState({
          articleError: err
        })
      } else {
        this.setState({
          articleInfo: {data:data.UserArticleList, loaded:true}
        })
      }
    })
  }

  render(){
    if(this.state.articleError == "没有帖子"){
      return(
        <div>还没有发布文章...</div>
      )
    } else if(this.state.articleInfo.loaded)
    {
      let article = this.state.articleInfo.data.map((item,ii)=>{
        var content = S(item.ZPT_CONTENT).decodeHTMLEntities().stripTags().s,
            cover   = 'url(' + item.ZPT_COVER + ')',
            time    = item.ArticleReleaseToNow,
            id      = item.ZCT_ID,
            title   = item.ZPT_TITLE;
        if (content.length > 70) {
					content = content.substr(0, 70) + '...';
				}
        return(
          <div style={styles.container} key={Math.random()}>
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
      })
      return(
        <div style={{maxWidth:'500px', margin:'30px auto 30px 30px'}}>
          <h2>我的文章</h2>
          <hr style={{marginBottom:'30px', marginTop:'30px'}}/>
          {article}
        </div>
      )
    } else {
      return(
        <div> loading... </div>
      )
    }

  }

}

function mapStateToProps(store){
  return {
    userinfo: store.user
  }
}

module.exports = connect(mapStateToProps)(Article)
