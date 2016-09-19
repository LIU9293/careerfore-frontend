import React, { Component } from 'react';
import { getPlaygroundPost, getActivitySignUp, getSignUpResult,returnReqString } from '../../vendor/connection';
import { Row, Col, Icon, Button, Carousel, Collapse, Calendar, BackTop, Spin, Tooltip, message } from 'antd';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styles from './activity.css';
import ActivityComment from './activityComment';
import ActivityMapView from './mapview';

const Stycom ={
  comments:{
    margin: '20px 15px 0px 0px',
    padding: '15px',
    position: 'relative',
    boxShadow: '0 1px 7px #bcbcbc',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    padding: '8px',
  }
}

class ActivityPost extends Component{

  constructor(props){
    super(props);
    this.state={
      activityData: null,
      show: true,
      joinActivityError: null,
    }
    this.joinActivity = this.joinActivity.bind(this);
  }

  componentDidMount(){

    getPlaygroundPost(this.props.params.activityID, '',(err,data)=>{
      if(err){
        console.log(err)
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

        document.head.innerHTML+="<script type=\"text/javascript\">window._bd_share_config = {common : {bdText : 'dsadadhk',bdDesc : 'dksfksfjsnkvnskjvnsknvdks',bdUrl : 'http://4.bp.blogspot.com/-gKMIOgeaEBY/UWHsOA382oI/AAAAAAAABpI/5GdyRTAeKII/s1600/share_core_square.jpg',bdPic : 'http://4.bp.blogspot.com/-gKMIOgeaEBY/UWHsOA382oI/AAAAAAAABpI/5GdyRTAeKII/s1600/share_core_square.jpg'}}</script>"
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
      };
    })
  }
  bodyclick(){
    this.props.UPDATE_QUEPARAM("","","","");
  }
  joinActivity(){
    if(!this.props.userinfo.login){
      browserHistory.push('/login');
    } else {
      if(this.state.activityData.Fee > 0){
        let DDBH = new Date().getTime()+'';
        returnReqString(DDBH,this.state.activityData.title+"支付费用",this.state.activityData.Fee,this.state.activityData.title+"支付费用|"+this.props.params.activityID,"http://www.careerfore.com",(res)=>{
          var a = res;
          document.getElementById('form').innerHTML = a;
          setTimeout(()=>{
            document.getElementById('alipaysubmit').submit();
          },500)
        })
      }else {
          getActivitySignUp(this.props.userinfo.userid, this.props.params.activityID, this.state.activityData.IsAudit, 0, '', '', (err, data) => {
            if(err){
              console.log(err);
              this.setState({joinActivityError: err});
            } else {
              getSignUpResult(this.props.userinfo.userid, this.props.params.activityID, (err, data) => {
                if(err){console.log(err)} else {
                  if(data.Type == 1){
                    this.props.baoming(this.props.params.activityID);
                    message.success('活动报名成功');
                  } else {
                    message.warning('活动报名失败');
                  }
                }
              })
            }
          })
      }
    }
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
              <div className="Img">
              <img src={this.state.activityData.image || ''}/>
              </div>
              <div className="detail">
                <Col xs={16} sm={16} md={16} lg={16} >
                <div className="Pagecol" onClick={this.bodyclick.bind(this)}>
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
                  <Button type="primary" size="large"
                    disabled={this.props.joinedActivity[this.props.params.activityID] || this.props.closedActivity[this.props.params.activityID] || false } onClick={this.joinActivity} >
                    {this.props.joinedActivity[this.props.params.activityID] || this.props.closedActivity[this.props.params.activityID] || '我要报名'}
                  </Button>
                  <div className="bdsharebuttonbox" data-tag="share_1" style={{float:'right'}}>
                      <a className="bds_weixin" data-cmd="weixin"></a>
                      <a className="bds_tsina" data-cmd="tsina"></a>
                      <a className="bds_tqq" data-cmd="tqq"></a>
                      <a className="bds_qzone" data-cmd="qzone"></a>
                      <a className="bds_linkedin" data-cmd="linkedin"></a>
                      <a className="bds_renren" data-cmd="renren"></a>
                      <a className="bds_tieba" data-cmd="tieba"></a>
                  </div>
                  <span style={{float:'right'}}><Icon type="share-alt" />分享至</span>
                  {/*<Button type="ghost" size="large"><Icon type="heart-o" />喜欢&nbsp;({this.state.activityData.LikeCount})</Button>*/}
                  </div>
                  </div>
                  <div className="contentDt" style={{paddingRight:'10px'}} onClick={this.bodyclick.bind(this)}>
                      <Collapse defaultActiveKey={['1']} onChange={callback}>
                          <Panel header="活动详情" key="1">
                            <div className="FontLg" dangerouslySetInnerHTML={{__html: this.state.activityData.content || ''}}/>
                          </Panel>
                      </Collapse>
                  </div>
                  <div style={Stycom.comments}>
                  <ActivityComment  activityid={this.props.params.activityID} />
                  </div>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8}>
                  <div className="contentDt2">
                      <h2>活动主办方介绍</h2><hr/>
                      <p>careerfor更懂大学生职业规划的平台，旗下活动俱乐部，专门为大学生举办线下关于职业规划的
                         沙龙讲座与交流，参访顶尖券商企业，实地考察体验优质高等职业生涯。
                      </p>
                  </div>
                  {/*<div className="carousle">
                    <ActivityCarousels arerid={this.props.areaID} />
                  </div>*/}
                  <div className="Map">
                  <h2>活动地点</h2><hr/>
                  <p>{this.state.activityData.Address}</p>
                  <ActivityMapView Latitude={this.state.activityData.Latitude} Longitude={this.state.activityData.Longitude} />
                  </div>
                  <div className="Calendar">
                  <h2>活动日历</h2><hr/>
                  <div style={{ width: 330, borderRadius: 4,marginTop:10}}>
                    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                  </div>
                  </div>
                </Col>
              </div>
            </Col>
          </Row>


          <BackTop style={{ bottom: 230 }}>
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
    baoming: (id) => {dispatch({type:'JOIN_ACTIVITY', id: id})},
    UPDATE_QUEPARAM:(userName,objFatherid,objid,fatherName)=>{dispatch({type:'UPDATE_QUEPARAM',userName:userName,objFatherid:objFatherid,objid:objid,fatherName:fatherName})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(ActivityPost)
