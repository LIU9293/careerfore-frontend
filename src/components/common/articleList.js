import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { browserHistory } from 'react-router';

const styles = {
  box: {
    height: '470px',
    width: '650px',
    boxShadow: '0px 1px 6px #BCBCBC',
    backgroundColor: '#fff',
    marginBottom: '30px',
    paddingBottom: '10px',
    borderRadius: '3px',
  },
  header: {
    height: '80px',
    width: '100%',
    padding: '15px',
    color: '#999',
  },
  headerBlock: {
    height: '100%',
    display: 'inline-block',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  middle: {
    height: '230px',
    width: '100%',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  },
  footer: {
    width: '100%',
    padding: '15px',
  },
  author: {
    fontSize: '18px',
    color: '#5A5A5A',
    fontWeight: 'bold',
    marginTop: '2px',
  },
  category: {
    fontSize: '14px',
    color: '#999',
    lineHeight: '20px',
    height: '20px',
    marginTop: '5px'
  },
  description: {
    color: '#999',
    fontSize: '16px',
    marginBottom: '10px',
  },
  iconArea: {
    width: '100%',
  },
  title: {
    overflow: 'hidden',
    textOverflow:'ellipsis',
    whiteSpace: 'nowrap',
    marginBottom: '10px',
  }
}

class ArticleList extends Component{
  render(){
    const { data } = this.props;
    const essence = <div>
                      <Icon type="star" />
                      <span>    职前精华</span>
                    </div>
    const recommand = <div>
                        <Icon type="like" />
                        <span>    职前推荐</span>
                      </div>

    let articles = data.map((item, ii)=>{
      if(item.cover !== ''){
        return(
          <div style={styles.box} key={ii}>
            <div style={styles.header}>
              <div style={{...styles.headerBlock, float: 'left'}}>
                <img style={styles.avatar} src={item.avatar || 'http://img.careerfore.com/bear.jpg'} />
              </div>
              <div style={{...styles.headerBlock, float: 'left', marginLeft: '12px'}}>
                <div style={styles.author}>{item.nickName}</div>
                <div style={styles.category}>
                  <img src={`http://img.careerfore.com/${item.category}@2x.png`} style={{height:'20px',marginRight:'5px'}} />
                  <span style={{position:'absolute'}}>{item.category}</span>
                </div>
              </div>
              <div style={{...styles.headerBlock, float: 'right', fontSize:'18px', marginTop:'10px'}}>
                {item.time}
              </div>
            </div>
            <a onClick={e => browserHistory.push('/discover/'+item.id)} >
              <div style={{...styles.middle, backgroundImage: 'url(' + item.cover + ')'}} />
            </a>
            <div style={styles.footer}>
              <a onClick={e => browserHistory.push('/discover/'+item.id)} style={{color:'#5d5d5d'}}>
                <h1 style={styles.title}>{item.title}</h1>
              </a>
              <p style={styles.description}>{item.description}</p>
              <div style={{...styles.iconArea, fontSize: '18px', color:'#999'}}>
                <div style={{display:'inline-block', float:'left'}}>
                  { item.essence == 0 ? null : essence }
                </div>
                <div style={{display:'inline-block', float:'right'}}>
                  <Icon type="heart" />
                  <span>       {item.likeNum}</span>
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        return(
          <div style={{...styles.box, height:'240px'}} key={ii}>
            <div style={styles.header}>
              <div style={{...styles.headerBlock, float: 'left'}}>
                <img style={styles.avatar} src={item.avatar || 'http://img.careerfore.com/bear.jpg'} />
              </div>
              <div style={{...styles.headerBlock, float: 'left', marginLeft: '12px'}}>
                <div style={styles.author}>{item.nickName}</div>
                <div style={styles.category}>
                  <img src={`http://img.careerfore.com/${item.category}@2x.png`} style={{height:'20px',marginRight:'5px'}} />
                  <span style={{position:'absolute'}}>{item.category}</span>
                </div>
              </div>
              <div style={{...styles.headerBlock, float: 'right', fontSize:'18px', marginTop:'10px'}}>
                {item.time}
              </div>
            </div>
            <div style={styles.footer}>
              <a onClick={e => browserHistory.push('/discover/'+item.id)} style={{color:'#5d5d5d'}}>
                <h1 style={styles.title}>{item.title}</h1>
              </a>
              <p style={styles.description}>{item.description}</p>
              <div style={{...styles.iconArea, fontSize: '18px', color:'#999'}}>
                <div style={{display:'inline-block', float:'left'}}>
                  { item.essence == 0 ? null : essence }
                </div>
                <div style={{display:'inline-block', float:'right'}}>
                  <Icon type="heart" />
                  <span>       {item.likeNum}</span>
                </div>
              </div>
            </div>
          </div>
        )
      }
    });
    return(
      <div>
        { articles ? articles : null }
      </div>
    )
  }
}

function mapStateToProps(store){
  return{
    data: store.discoverListData.data
  }
}

module.exports = connect(mapStateToProps)(ArticleList)
