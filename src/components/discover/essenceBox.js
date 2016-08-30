import React, { Component } from 'react';
import { essenceArticle } from '../../vendor/connection';
import { millseconds2DateDiff } from '../../vendor/helper/timeTransfer';
import { browserHistory } from 'react-router';
const styles = {
  container: {
    width: '320px',
    height: '400px',
    boxShadow: '0px 1px 6px #BCBCBC',
    backgroundColor: '#fff',
    padding: '15px',
    marginLeft: 'auto',
  },
  scrollView: {
    height: '320px',
    width: '100%',
    overflow: 'scroll',
  },
  box: {
    width: '100%',
    height: '100px',
    marginTop: '5px',
    marginBottom: '5px',
  },
  img: {
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    textAlign: 'center',
    lineHeight: '100px',
    fontSize: '24px',
    color: '#666',
    height: '100px',
  }
}

class EssenceBox extends Component{
    constructor(props){
      super(props);
      this.state = {
        data:[]
      }
  }

 componentDidMount(){
  essenceArticle(1, 10, (err,data)=>{
    if (err) {
      console.log(err)
    }else {
      let essencePostlist=data.NickPostList.map((item,ii) => {
        let cover = 'http://imageservice.pine-soft.com/' + item.ZPT_COVER;
        return (
          <a key={ii} onClick={e=> browserHistory.push('/discover/'+item.ZPT_ID)}>
            <div style={styles.box}>
              <div style={{...styles.img, backgroundImage: 'url(' + cover + ')'}} />
            </div>
          </a>
        )
      });
      this.setState({
        data: essencePostlist
      });
    }
  })
 }

 render(){
     return(
       <div style={styles.container}>
        <h2>职前精选</h2>
        <hr style={{marginTop:'10px',marginBottom:'10px'}} />
        <div style={styles.scrollView}>
          {this.state.data}
        </div>
       </div>
     )
  }
}

module.exports = EssenceBox
