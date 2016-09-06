import React, { Component } from 'react';
import ReactDom from "react-dom";
import { connect } from 'react-redux';
import { getUserInfo, uploadImageToQiniu, postUserAvatar, updateUserNickName ,SetUserDes} from '../../../vendor/connection';
import { browserHistory } from 'react-router';
import { Form, Input, Button, Checkbox, Icon, message, Modal, Slider,Tabs } from 'antd';
import AvatarEditor from "react-avatar-editor";
import style from './profileHomeComponents.css';
import Cookies from 'js-cookie';
// import BaseInfo from './settingParam/baseinfo';


const FormItem = Form.Item;

var FileUpload = React.createClass({

  handleFile: function(e) {
    var reader = new FileReader();
    var file = e.target.files[0];

    if (!file) return;

    reader.onload = function(img) {
      ReactDom.findDOMNode(this.refs.in).value = '';
      this.props.handleAvatarChange(img.target.result);
    }.bind(this);
    reader.readAsDataURL(file);
  },

  render: function() {
    return (
      <a className="inputWapper">重新上传
        <input
          ref="in" type="file" className="inputButton" accept="image/*" onChange={this.handleFile}
        />
      </a>
    );
  }
});

class Setting extends Component{

  constructor(props){
    super(props);
    this.state = {
      userimg : "",
      userimgState:false,
      ModalLoading:false,
      nickName:"",
      nickNameState:false,
      userDesc:"",
      userDescState:false,
      AvatarSliderValue:1,
    }
  }

  componentWillMount(){
    this.props.startLoading();
  }

  componentDidMount(){
    getUserInfo(this.props.userinfo.userid,(err,data)=>{
      this.props.stopLoading()
      if(err){console.log(err)} else {
        this.props.login(this.props.userinfo.userid,{...this.props.userinfo.userdata,userDesc:data.UserDes,avatar:data.ZUT_HEADIMG})
      }
    })
  }

  logout(){
    Cookies.remove('UserID');
    this.props.logout();
    browserHistory.push('/');
  }

  SaveData(type){
    switch (type) {
      case 0://昵称保存点击事件
        if(this.state.nickName === ""){
          message.warning("请输入昵称");
        }else {
          updateUserNickName(this.props.userinfo.userid,this.state.nickName,(err,data)=>{
            if(err){
              message.error(err);
            }else {
              message.success("操作成功");
            }
            this.props.login(this.props.userinfo.userid,{...this.props.userinfo.userdata,nickName:this.state.nickName})
            this.setState({
              nickNameState :false,
              nickName:"",
            })
          })
        }
        break;
      case 1://个性签名保存点击事件
        if(this.state.userDesc === ""){
          message.warning("请输入个性签名");
        }else {
          SetUserDes(this.props.userinfo.userid,this.state.userDesc,(err,data)=>{
            if(err){
              message.error(err);
            }else {
              message.success("操作成功");
            }
            this.props.login(this.props.userinfo.userid,{...this.props.userinfo.userdata,userDesc:this.state.userDesc})
            this.setState({
              userDescState :false,
              userDesc:"",
            })
          })
        }
        break;
      default:

    }
  }

  CancelDidClick(type){
    switch (type) {
      case 0://昵称取消点击事件
        this.setState({
          nickNameState :false
        })
        break;
      case 1://个性取消点击事件
      this.setState({
        userDescState :false
      })
        break;
      default:

    }
  }

  EditorDidClick(type){
    switch (type) {
      case 0://昵称编辑点击事件
        this.setState({
          nickNameState :true
        })
        break;
      case 1://个性编辑点击事件
        this.setState({
          userDescState :true
        })
        break;
      default:

    }
  }

  handleModalCancel(){
    this.setState({
      userimgState: false,
      ModalLoading: false
    })
  }

  handleUploadAvatar(){
    this.setState({
      ModalLoading:true,
    });
    var croppedAvatar = this.refs.editor.getImageScaledToCanvas().toDataURL("image/jpeg");
    postUserAvatar(this.props.userinfo.userid, croppedAvatar, (err,data)=>{
      if(err){
        console.log(err);
        this.setState({
          ModalLoading: false,
          userimgState: false,
        },()=>{message.warning(err);});
      } else {
        this.setState({
          ModalLoading: false,
          userimgState: false,
        },()=>{
          message.success('头像上传成功');
          //更新this.state.user, 让本页面上的用户信息刷新
          getUserInfo(this.props.userinfo.userid,(err,data)=>{
            if(err){console.log(err)} else {
              console.log(data);
              let userData = {
                avatar: data.ZUT_HEADIMG,
                nickName: data.ZUT_NICKNAME,
                phone: data.ZUT_PHONE
              }
              this.props.login(this.props.userinfo.userid, userData);
              this.setState({
                user: data
              })
            }
          })
        })
      }
    })
  }

  handleFile(e){
    console.log(e.target)
    var reader = new FileReader();
    var file = e.target.files[0];
    if (!file) {
      message.warn("没有图片");
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = ()=>{
      this.setState({
        userimg :reader.result,
        userimgState:true,
      })
    }
  }

  render(){
      return(
        <div style={styles.divCover}>
          <h2 style = {styles.divH2}>个人资料</h2>
            <div style = {styles.contents}>

              <div style = {styles.divSingle}>
                <div style = {styles.spanDiv}>头像</div>
                  <div style = {{marginLeft: '22%', marginTop: '-23px'}}>
                    <img src = {this.props.userinfo.userdata.avatar} style = {{width: '100px', borderRadius: '50%'}}/>
                    <div style = {{marginTop: '-40px', marginLeft: '70px', width: '40px', height: '40px'}}>
                      <img src ="http://imageservice.pine-soft.com/188D992C49E5432AB49AF8A5E7C93926.jpg" />
                      <input style = {styles.uploadInput} type = "file" onChange = {this.handleFile.bind(this)}/>

                      <Modal ref="modal"
                        visible={this.state.userimgState}
                        title="上传头像"

                        footer={[
                          <Button key="back" type="ghost" size="large" onClick={this.handleModalCancel}>返 回</Button>,
                          <Button key="submit" type="primary" size="large" loading={this.state.ModalLoading} onClick={this.handleUploadAvatar.bind(this)}>
                            提 交
                          </Button>,
                        ]}
                      >
                      <AvatarEditor
                        image={this.state.userimg}
                        width={200}
                        height={200}
                        style={{margin:'auto', display:'block'}}
                        border={0}
                        ref="editor"
                        borderRadius={100}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={this.state.AvatarSliderValue}
                      />
                      <div style={{margin:'20px 50px 0 50px'}}>
                        <Slider defaultValue={1} min={1} max={2} step={0.01}
                          onChange={(value)=>{this.setState({AvatarSliderValue:value})}}
                          tipFormatter={null}
                        />
                      </div>
                      </Modal>
                    </div>
                  </div>
              </div>

              <div style = {styles.divSingle}>
                <div style = {styles.spanDiv}>昵称</div>
                <div style = {{marginLeft:'20%'}}>
                    <div style = {{display : this.state.nickNameState ? '':'none'}}>
                        <Input style ={{width:'50%'}}  placeholder = {this.props.userinfo.userdata.nickName}
                            onChange = {(e)=>{this.setState({nickName:e.target.value})}} maxLength = "30"/><br/>
                        <Button style = {styles.buttonClass} type="primary" onClick = {this.SaveData.bind(this,0)}>保存</Button>
                        <Button style = {styles.buttonClass} type="ghost" onClick = {this.CancelDidClick.bind(this,0)}>取消</Button>
                    </div>
                    <div style = {{display : this.state.nickNameState ? 'none':''}}>
                      <label style = {{width: '50%', display: 'inline-block'}}>{this.props.userinfo.userdata.nickName}</label>
                      <Icon type="edit" style = {{color:'#2db7f5'}} onClick = {this.EditorDidClick.bind(this,0)}/>
                    </div>
                </div>
              </div>

              <div style = {styles.divSingle}>
                <div style = {styles.spanDiv}>个性签名</div>
                <div style = {{marginLeft:'20%'}}>
                    <div style = {{display : this.state.userDescState ? '':'none'}}>
                        <Input style ={{width:'50%'}}  placeholder = {this.props.userinfo.userdata.userDesc}
                            onChange = {(e)=>{this.setState({userDesc:e.target.value})}} maxLength = "30"/><br/>
                        <Button style = {styles.buttonClass} type="primary" onClick = {this.SaveData.bind(this,1)}>保存</Button>
                        <Button style = {styles.buttonClass} type="ghost" onClick = {this.CancelDidClick.bind(this,1)}>取消</Button>
                    </div>
                    <div style = {{display : this.state.userDescState ? 'none':''}}>
                      <label style = {{width: '50%', display: 'inline-block'}}>{this.props.userinfo.userdata.userDesc}</label>
                      <Icon type="edit" style = {{color:'#2db7f5'}} onClick = {this.EditorDidClick.bind(this,1)}/>
                    </div>
                </div>
              </div>

              <div style={{marginTop:'20px'}}>
                <Button type="ghost" onClick={this.logout.bind(this)}>登出</Button>
              </div>
            </div>
        </div>
      )
    }
  }

const styles = {
  divCover:{
    maxWidth:'500px',
    margin:'30px auto 30px 30px',
  },divH2:{
    paddingBottom: '10px',
    borderBottom: '1px solid lightgray',
  },contents:{
    padding : '10px 0',
    fontSize:'17px',
  },divSingle:{
    // width:'100%',
    marginTop:'20px',
  },uploadInput:{
    opacity: '0',
    marginTop: '-100%',
    width: '100%',
    cursor: 'pointer',
  },spanDiv:{
    display: 'inline-block',
    width: '20%',
    float:'left',
  },buttonClass:{
    margin: '2% 2% 0 0',
  }
}

//tab面板的pane
const TabPane = Tabs.TabPane;

//选项面板的值改变时的回调
function callback(key) {
  console.log(key);
}

function mapStateToProps(store){
  return {
    userinfo: store.user
  }
}
function mapDispatchToProps(dispatch){
  return {
    login: (userid,data) => {dispatch({type:'LOG_IN', userid:userid, userdata:data})} ,
    logout: () => {dispatch({type:'LOG_OUT'})},
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Setting)
