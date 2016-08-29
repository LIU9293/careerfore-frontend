import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserCollection } from '../../../vendor/connection';
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

class Collection extends Component {

  constructor(props){
    super(props);
    this.state = {
      collectionError: null,
      collectionData: { loaded: false, data: null },
    }
  }

  componentWillMount(){
    this.props.startLoading();
  }

  componentDidMount(){
    getUserCollection(this.props.userinfo.userid, (err,data)=>{
      if(err){
        console.log(err);
        this.setState({
          collectionError: err
        })
      } else {
        console.log(data);
        this.setState({
          collectionData: { loaded: true, data: data.UserCollectList}
        });
      }
      this.props.stopLoading();
    })
  }

  render(){
    if(this.state.collectionError){
      return(
        <div>{this.state.collectionError}</div>
      )
    } else if(this.state.collectionData.loaded){

      let collection = this.state.collectionData.data.map((item,ii)=>{
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
        }
      })

      return(
        <div style={{maxWidth:'500px', margin:'30px auto 30px 30px'}}>
          <h2>我的收藏</h2>
          <hr style={{marginBottom:'30px', marginTop:'30px'}}/>
          { collection }
        </div>
      )

    } else {
      return (
        <div>loading...</div>
      )
    }
  }
}

function mapStateToProps(store){
  return {
    userinfo: store.user
  }
}
function mapDispatchToProps(dispatch){
  return {
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Collection)
