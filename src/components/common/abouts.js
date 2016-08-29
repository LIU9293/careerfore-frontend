import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Row, Col, Icon, Button, Carousel, Collapse, Calendar, BackTop, Spin, Tooltip, message } from 'antd';
import styles from './about.css';
const style={
  pagefore:{
    width: '100%',
    height: '1000px',
  }
}

class About extends Component{

  render(){
      return(
        <div style={styles.pagefore}>
          <div className="imgoverlay"/>
          <div className="career background-cover vertical-center">
            <div className="text">
              <img src="#"/>
              <h3>careerfore｜职前</h3>
              <p>更懂大学生的职业规划</p>
               <div className="btn">
                <a href="www.careerfore.com" className="appbtn">
                  <span>APP下载</span>
                </a>
                <a href="www.careerfore.com" className="appbtn">
                  <span>Web端</span>
                </a>
                </div>
              </div>
            </div>
          <div className="page">
            <div className="container">
              <h3>知识｜视野｜年轻</h3>
              <hr style={{width:'40%'}}/>
              <h2>关于&nbsp;careerfore</h2>
              <p>careerfore|职前是由南京职行网络科技有限公司创建，致力于让大学生能有自己专属的职业规划内容平台，
                同龄人大学学习生活／实习／求职／师兄师姐们的工作经历以及你身边的那个Ta成功转行的的真实经历，她们亲
                笔撰写，真实，专注，专业。</p>
              <p>你也是这个平台的一份子，让我们一起创造属于我们同龄人的职规内容平台。</p>
              <p>在这里，我们提供舞台，让你发现一个不一样的自己。</p>
              <p>在这里，我们创造机会，让你经历一个属于你的精彩。</p>
             </div>
          </div>
          </div>
      )
  }
}




module.exports = { About }
