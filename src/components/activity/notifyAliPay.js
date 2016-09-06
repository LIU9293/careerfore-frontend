import React, { Component } from 'react';
import { Row, Col, Icon, Button, Carousel, Collapse, Calendar, BackTop, Spin, Tooltip, message,Modal } from 'antd';
import { getPlaygroundPost, getActivitySignUp, getSignUpResult } from '../../vendor/connection';
import { connect } from 'react-redux';
import $ from 'jquery';
import './NotifyCss.css';

const styles = {
  zhang:{
    borderRadius:'50%',
    width: '100px',
    position: 'absolute',
    top: '40px',
    right: '40px',
    display:'none'
  }
}

class Notify extends Component {
  constructor(props) {
    super(props);
    this.state={
      activityData: null,
    }
  }
  componentWillMount(){
    let query = decodeURI(window.location.search.substr(1));
    let queryArr = query.split('&');
    let obj = {};
    queryArr.map(item => {
      let t = item.split('=');
      obj[t[0]] = t[1];
    })
    if(obj["is_success"]==="T"){
      //支付成功后的回调页面
      let acitvityId = obj["body"].split('|')[1];console.log(acitvityId)
      getPlaygroundPost(acitvityId,'',(err,data)=>{
        if(err){
          message.error(err);
        } else {
          let image = data.Activity.ActivityPictureUrl;
          let content = data.Activity.ActivityContent;
          let title = data.Activity.ActivityTitle;
          let Address=data.Activity.ActivityAddress;
          let StartDate=data.Activity.ActivityStartDate;
          let EndDate=data.Activity.ActivityEndDate;
          let CheckPeopleNum=data.Activity.CheckPeopleNum;
          let PeopleNum=data.Activity.PeopleNum;
          let Fee=data.Activity.Fee;
          let Latitude=data.Activity.ActivityLatitude;
          let Longitude=data.Activity.ActivityLongitude;
          let LikeCount=data.Activity.ActivityLikeCount;
          let IsAudit = data.Activity.IsAudit;
          this.setState({
            activityData:{
              image: image,
              content: content,
              title: title,
              Address: Address,
              StartDate: StartDate,
              EndDate: EndDate,
              CheckPeopleNum: CheckPeopleNum,
              PeopleNum: PeopleNum,
              Fee: Fee,
              Latitude: Latitude,
              Longitude: Longitude,
              LikeCount: LikeCount,
              IsAudit:IsAudit
            }
          })
          getSignUpResult(this.props.userinfo.userid, acitvityId, (err, data) => {
            if(err){console.log(err)} else {
              if(data.Type == 1){
                this.showZHang();
                this.success("提示","您已经报名了");
              } else {
                getActivitySignUp(this.props.userinfo.userid, acitvityId, this.state.activityData.IsAudit, 1,obj["total_fee"], obj["out_trade_no"], (err, data) => {
                  if(err){
                    message.error(err);
                  } else {
                    this.showZHang();
                    this.success("支付结果","您已成功支付"+this.state.activityData.Fee+"元");
                  }
                })
              }
            }
          })
        };
      })
    }
    else {
        message.error("页面参数错误");
    }
  }

  showZHang(){
    setTimeout(()=>{
      $("#zhang").css("display","");
      $("#zhang").addClass("run");
    },2000)

  }

  success(title,content) {
    const modal = Modal.success({
      title: title,
      content: content,
    });
    setTimeout(() => modal.destroy(), 2000);
  }

  render(){
    if(this.state.activityData){
      let Fee;
      if (this.state.activityData.Fee==0) {
          Fee='活动免费';
      }else {
          Fee=this.state.activityData.Fee;
      }
      const Panel = Collapse.Panel;
      function callback(key) {
        console.log(key);
      }
      function onPanelChange(value, mode) {
        console.log(value, mode);
      }
      return(
        <div className="width1000" >
          <div id = 'form' style = {{display:'none'}} />
          <Row>
            <Col xs={24}>
              <div className="detail">
                <Col xs={16} sm={16} md={16} lg={16} >
                <div className="Pagecol" style={{position:'relative'}}>
                  <h1>{this.state.activityData.title || ''}</h1>
                  <p><Icon type="clock-circle-o" /><span>{this.state.activityData.StartDate || ''} - {this.state.activityData.EndDate || ''}</span></p>
                  <p><Icon type="team" /><span>{this.state.activityData.PeopleNum || '0'}人(限{this.state.activityData.CheckPeopleNum || ''}人报名)</span></p>
                  <p><Icon type="environment-o" /><span>{this.state.activityData.Address}</span></p>
                  <p><Icon type="pay-circle-o" /><span>{Fee}</span></p>
                  <p><Icon type="tags-o" /><span style={{fontSize:'15px'}}>Careerfore活动俱乐部承办</span><Icon style={{marginLeft:'10px'}} type="phone" /><span style={{fontSize:'15px'}}>025-6667974 (详情咨询)</span></p>
                  <div className="button">
                    <Tooltip title="如需申请退款请于活动开始前24小时外申请。申请方式：登陆careerfore官网—发送电子邮件给我们审核并给予退款。【careerfore】将统一收取原票价的10%作为退票手续费，请知悉。">
                      <span style={{paddingLeft:'50px'}}><Icon type="exclamation-circle-o" />&nbsp;&nbsp;缴费说明</span>
                    </Tooltip>
                    <Button type="ghost" size="large"><Icon type="share-alt" />我要分享</Button>
                    <Button type="ghost" size="large"><Icon type="heart-o" />喜欢{this.state.activityData.LikeCount}</Button>
                  </div>
                  <img id = "zhang" className ="shakestart" src = "http://imageservice.pine-soft.com/16864B19887142E595939EC7015C05C6.jpg" style = {styles.zhang}/>
                </div>
                <div className="contentDt" style={{paddingRight:'10px'}}>
                    <Collapse defaultActiveKey={['1']} onChange={callback}>
                        <Panel header="活动详情" key="1">
                          <div className="FontLg" dangerouslySetInnerHTML={{__html: this.state.activityData.content || ''}}/>
                        </Panel>
                      </Collapse>
                  </div>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8}>
                  <div className="contentDt2">
                      <h2>活动主办方介绍</h2><hr/>
                      <p>careerfor更懂大学生职业规划的平台，旗下活动俱乐部，专门为大学生举办线下关于职业规划的
                         沙龙讲座与交流，参访顶尖券商企业，实地考察体验优质高等职业生涯。
                      </p>
                  </div>
                  <div className="Map">
                  <h2>活动地点</h2><hr/>
                  <p>{this.state.activityData.Address}</p>
                  </div>
                </Col>
              </div>
            </Col>
          </Row>
          <BackTop style={{ bottom: 100 }}>
            <div className="upScroll">UP</div>
          </BackTop>
        </div>
      )
    } else {
      return (
        <div className="load">
          <Spin size="large" />
        </div>
      )
    }
  }
}


function mapStateToProps(store){
  return {
    userinfo: store.user ,
    joinedActivity: store.yibaoming ,
    closedActivity: store.yijieshu ,
  }
}
function mapDispatchToProps(dispatch){
  return {
    baoming: (id) => {dispatch({type:'JOIN_ACTIVITY', id: id})}
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Notify)
