import React, { Component } from 'react';
import ReactDom from "react-dom";
import { connect } from 'react-redux';
import { getUserInfo, uploadImageToQiniu, postUserAvatar, updateUserNickName ,SetUserDes} from '../../../vendor/connection';
import { browserHistory } from 'react-router';
import { Form, Input, Button, Checkbox, Icon, message, Modal, Slider,Tabs } from 'antd';
import AvatarEditor from "react-avatar-editor";
import style from './profileHomeComponents.css';
import Cookies from 'js-cookie';

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
      user: null,
      img: null,
      ModalVisible: false,
      ModalLoading: false,
      AvatarSliderValue: 1,
      userAvatar:null,
      nickName:null,
      nickNameError: null,
      userSign:null,
      userSignError:null,
      editingName: false,
    };
    this.handleNickName = this.handleNickName.bind(this);
    this.handleUserSign = this.handleUserSign.bind(this);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
    this.handleModalCancel = this.handleModalCancel.bind(this);
    this.showNickNameEditor = this.showNickNameEditor.bind(this);
    this.hideNickNameEditor = this.hideNickNameEditor.bind(this);
    this.hideUserSignEditor = this.hideUserSignEditor.bind(this);
    this.showUserSignEditor = this.showUserSignEditor.bind(this);
  }

  componentWillMount(){
    this.props.startLoading();
  }

  componentDidMount(){
    getUserInfo(this.props.userinfo.userid,(err,data)=>{
      if(err){console.log(err)} else {
        console.log(data);
        this.setState({
          user: data
        })
      }
      this.props.stopLoading()
    })
  }

  handleNickName(e){
    //如果不写preventDefault，页面可能会重新刷新
    e.preventDefault();
    if(!this.state.nickName){
      message.warning('请填写用户名');
      this.setState({nickNameError: '请填写用户名'})
    } else {
      updateUserNickName(this.props.userinfo.userid, this.state.nickName, (err,data)=>{
        this.setState({
          editingName: false
        })
        if(err){
          console.log(err);
          message.warning(err);
        } else {
          this.props.login(this.props.userinfo.userid, {...this.props.userinfo.userdata, nickName: this.state.nickName})
          this.hideNickNameEditor();
          message.success('昵称更新成功');
        }
      })
    }
  }
  showNickNameEditor(){
    this.setState({
      editingName: true
    })
  }

  hideNickNameEditor(){
    this.refs.nickName.style.display = 'inline';
    this.refs.nickNameForm.style.display = 'none';
    this.refs.nickNameFormButton.style.display = 'none';
  }

  handleUserSign(e){
    //如果不写preventDefault，页面可能会重新刷新
    e.preventDefault();
    if(!this.state.userSign){
      message.warning('请填写自我介绍');
      this.setState({nickNameError: '请填写自我介绍'})
    } else {
      SetUserDes(this.props.userinfo.userid, this.state.userSign, (err,data)=>{
        if(err){
          message.warning(err);
        } else {
          this.props.login(this.props.userinfo.userid, {...this.props.userinfo.userdata, userDesc: this.state.userSign})
          this.hideUserSignEditor();
          message.success('更新成功');
        }
      })
      console.log(this.state.userSign)
    }
  }
  showUserSignEditor(){
    this.refs.userSign.style.display = 'none';
    this.refs.userSignForm.style.display = 'inline';
    this.refs.userSignFormButton.style.display = 'inline';
    document.getElementById('desInput').focus();
  }

  hideUserSignEditor(){
    this.refs.userSign.style.display = 'inline';
    this.refs.userSignForm.style.display = 'none';
    this.refs.userSignFormButton.style.display = 'none';
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
          ModalVisible: false,
        },()=>{message.warning(err);});
      } else {
        this.setState({
          ModalLoading: false,
          ModalVisible: false,
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
  /*  uploadImageToQiniu(croppedAvatar.replace('data:image/png;base64,',''), (err,data)=>{
      if(err){console.log(err)} else {
        postUserAvatar(this.props.userinfo.userid, data, (err,data)=>{
          if(err){console.log(err)} else {
            console.log(data)
          }
        })
      }
    })*/
  }
  handleAvatarChange(data){
    this.setState({
      img: data,
      ModalVisible: true,
    });
  }
  handleModalCancel(){
    this.setState({
      ModalVisible: false,
      ModalLoading: false,
    })
  }
  logout(){
    Cookies.remove('UserID');
    this.props.logout();
    browserHistory.push('/');
  }

  render(){
    const { getFieldProps } = this.props.form;
    if(!this.state.user){
      return(
        <div>loading...</div>
      )
    } else {
      let avatar    = this.state.user.ZUT_HEADIMG,
          nickName  = this.state.user.ZUT_NICKNAME,
          des       = this.state.user.UserDes,
          phone     = this.state.user.ZUT_PHONE;
      return(
        <div style={{maxWidth:'500px', margin:'30px auto 30px 30px'}}>
          <h2>个人资料</h2>
          <hr style={{marginBottom:'30px', marginTop:'30px'}}/>
          <Form inline onSubmit={this.handleNickName.bind(this)}>
            <FormItem label="昵称">
              <div ref="nickName" style={{display: this.state.editingName ? 'none' : 'inline'}}>
                <p id="nickName" name="nickName" style={{display:'inline'}}>{this.props.userinfo.userdata.nickName}</p>
                <Icon type="edit" style={{marginLeft:'20px'}} onClick={this.showNickNameEditor} />
              </div>
              <div ref="nickNameForm" style={{display: this.state.editingName ? 'inline' : 'none'}}>
                <Input
                  id="NickInput"
                  placeholder={nickName}
                  onChange={(e)=>{this.setState({nickName: e.target.value})}}
                />
              </div>
            </FormItem>
            <div ref="nickNameFormButton" style={{display: this.state.editingName ? 'inline' : 'none'}}>
              <Button type="primary" htmlType="submit">确认</Button>
            </div>
          </Form>
          <Form inline onSubmit={this.handleUserSign} style={{marginTop:'20px'}}>
            <FormItem label="介绍你自己">
              <div ref="userSign">
                <p id="userSign" name="userSign" style={{display:'inline'}}>{this.props.userinfo.userdata.userDesc}</p>
                <Icon type="edit" style={{marginLeft:'20px'}} onClick={this.showUserSignEditor} />
              </div>
              <div ref="userSignForm" style={{display: 'none'}}>
                <Input
                  id="desInput"
                  placeholder={des}
                  onChange={(e)=>{this.setState({userSign: e.target.value})}}
                />
              </div>
            </FormItem>
            <div ref="userSignFormButton" style={{display: 'none'}}>
              <Button type="primary" htmlType="submit">确认</Button>
            </div>
          </Form>
          <div style={{marginTop:'20px'}}>
            <p style={{display: 'inline'}}>头像：</p>
            <img src={avatar} style={{width:'50px',height:'50px',borderRadius:'50%'}}/>
            <FileUpload handleAvatarChange={this.handleAvatarChange} />
            <Modal ref="modal"
              visible={this.state.ModalVisible}
              title="上传头像"
              onOk={this.handleModalCancel}
              onCancel={this.handleModalCancel}
              footer={[
                <Button key="back" type="ghost" size="large" onClick={this.handleModalCancel}>返 回</Button>,
                <Button key="submit" type="primary" size="large" loading={this.state.ModalLoading} onClick={this.handleUploadAvatar}>
                  提 交
                </Button>,
              ]}
            >
              <AvatarEditor
                image={this.state.img}
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
          <div style={{marginTop:'20px'}}>
            <Button type="ghost" onClick={this.logout.bind(this)}>登出</Button>
          </div>
        </div>
      )
    }
  }

}

Setting = Form.create()(Setting);

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