import React, { Component } from 'react';
import { browerHistory } from 'react-router';
import { Row, Col } from 'antd';

const styles = {
  wapper: {
    width:'1000px',
    backgroundColor: 'white',
    color: '#999',
    margin:'auto',
  },
  container: {
    margin: 'auto',
    paddingBottom: '66px',
    paddingTop:'66px',
  },
  about:{
    marginTop: '15px',
    fontSize:'14px',
    textAlign:'right',
    lineHeight: '30px',
    paddingBottom:'10px',
  },
  copy:{
    fontSize:'14px',
    color:'#999',
    textAlign:'right',
  }
}

class Footer extends Component{
  render(){
    return(
      <div style={styles.wapper}>
        <div style={styles.container}>
          <Row>
            <Col style={styles.cell} xs={16} md={16}>
              <img src="https://oa932w8s4.qnssl.com/%E7%BB%84-1@2x.png"/>
            </Col>
            <Col xs={8} md={8} style={{textAlign:'right'}}>
            <div style={styles.about}>
              <a style={{color:'#999'}} href="/about">关于职前   </a>
              <a style={{color:'#999'}}>·</a>
              <a style={{color:'#999'}} href="/join">加入我们   </a>
            </div>
            <a style={styles.copy}>南京职行网络科技有限公司 © 2016</a>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

module.exports = Footer
