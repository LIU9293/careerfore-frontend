import React, { Component } from 'react';
import { browerHistory } from 'react-router';
import { Row, Col } from 'antd';

const styles = {
  wapper: {
    backgroundColor: '#5f5f5f',
    color: 'white',
  },
  container: {
    maxWidth: '750px',
    margin: 'auto',
    paddingTop: '50px',
    paddingBottom: '50px',
  },
  cell: {
    textAlign: 'center',
    fontSize: '15px',
    height: '40px',
    lineHeight: '40px',
  }
}

class Footer extends Component{
  render(){
    return(
      <div style={styles.wapper}>
        <div style={styles.container}>
          <Row>
            <Col style={styles.cell} xs={24} md={4}>
              <a style={{color:'#fff'}} onClick={()=> browerHistory.push('/')}>关于</a>
            </Col>
            <Col style={styles.cell} xs={24} md={4}>
              <a style={{color:'#fff'}} onClick={()=> browerHistory.push('/')}>招聘</a>
            </Col>
            <Col style={styles.cell} xs={24} md={4}>
              <a style={{color:'#fff'}} onClick={()=> browerHistory.push('/')}>故事</a>
            </Col>
            <Col style={styles.cell} xs={24} md={4}>
              <a style={{color:'#fff'}} onClick={()=> browerHistory.push('/')}>微信</a>
            </Col>
            <Col style={styles.cell} xs={24} md={4}>
              <a style={{color:'#fff'}} onClick={()=> browerHistory.push('/')}>☹️</a>
            </Col>
            <Col style={styles.cell} xs={24} md={4}>
              <a style={{color:'#fff'}} onClick={()=> browerHistory.push('/')}>开源</a>
            </Col>
          </Row>
          <Row>
            <Col xs={24} style={{textAlign: 'center', marginTop:'50px', marginBottom: '30px'}}>
              南京职行网络科技有限公司 © 2016
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

module.exports = Footer
