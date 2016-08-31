import React,{Component} from 'react';
import ReactDom from "react-dom";
import SimpEditor from './PostArticle';
import { connect } from 'react-redux';
import { Upload, message, Button, Icon,Select} from 'antd';
import style from './SubmitPost.css';
import { PostsChannel,uploadImageToQiniu,postDiscoverArticle ,postImage} from '../../vendor/connection';
import { browserHistory } from 'react-router';
import Cookies from 'js-cookie';
import Options from '../common/showSelectOptions';

class SubmitPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelSelect:null,
      limitLength:60,
      coverFlag:true,
      bgcover:""
    }
    this.maxLength = 60;
    this.handleFile = this.handleFile.bind(this);
    this.deleteCover = this.deleteCover.bind(this);
  }

componentDidMount(){
  PostsChannel(this.props.userinfo.userid,(err,data)=>{
    if(err){
      console.log(err);
    }else {
      var tmpList =[];
      data.channel.map((item,index)=>{
        var obj ={
          key:item.ZCT_CHANNEL,
          value:item.ZCT_ID
        }
        tmpList.push(obj);
      })
      this.setState({
        channelSelect : tmpList,
      })
    }
  })
}

deleteCover(){
  this.setState({
    coverFlag : true,
    bgcover : ""
  })
}

handleFile(e){
  var reader = new FileReader();
  var file = e.target.files[0];
  reader.readAsDataURL(file);
  reader.onload = (img)=>{
    postImage(img.currentTarget.result, (err,data)=>{
      if(err){
        console.log(err);
      } else {
        this.setState({
          coverFlag : false,
          bgcover : 'url('+data.ImgName+')'
        })
      }
    })
  };


        // uploadImageToQiniu(img.currentTarget.result.split(',')[1],(err,data)=>{
        //   console.log(err,data)
        //   if(err){
        //     console.log(err);
        //   }else {
        //     console.log(data);
        //     document.getElementById('previewDiv').style.display = "block";
        //     document.getElementById('close').style.display = "block";
        //     document.getElementById('previewimg').src = data;
        //   }
        // })

  }

  showToggle(){
    this.props.TOGGLE_SELECTOPTION();
  }

  //发帖
  SubmitPost(){
    if(this.props.userinfo.userid === undefined){
      browserHistory.push(`/login`);
    }else {
      let uid = this.props.userinfo.userid;
      if(this.refs.txtinput.value.replace(" ","")==="")
      {
        message.error('请输入标题');return;
      }
      // if(this.state.bgcover === "")
      // {
      //   alert("没有封面图");return;
      // }
      if(this.props.editor[uid]=== ""){
        message.error('请输入内容');return;
      }
      if(this.props.selects.selectid === "-1"){
        message.error('请选择频道');return;
      }
      let txt = this.refs.txtinput.value;
      let cover = this.state.bgcover === "" ? "" :this.state.bgcover.replace("url(","").replace(")","").replace("'","");
      let channel = this.props.selects.selectid;
      this.props.startLoading();
      postDiscoverArticle(
        uid,txt,cover,channel,this.props.editor[uid],1,"","",
        (err,data)=>{
          this.props.stopLoading();
        if(err){console.log(err)}else {
          alert("发帖成功");
          browserHistory.push('/discover/'+data.PostsId);
          Cookies.set("commentContent","");
          this.props.UPDATE(this.props.userinfo.userid,"");
        }
      })
    }
  }

  //文本框获取焦点
  txtFocus(){
    console.log("get focus");
    // if(this.refs.txtInput.value === "请输入标题"){
    //
    // }
  }
  txtBlur(){
    console.log("lost focus");
  }
  txtChanged(e){
    //剩余可输入的字数
    // let limitLength ＝ this.maxLength - e.target.value.length;
    this.setState({
      limitLength: this.maxLength - e.target.value.length
    })
  }

  render(){
    return(
      <div className = "SubmitPost">
      <div className="submittitle" style = {{borderBottom:'1px solid lightgray',paddingBottom:'5px',width:'100%',overflow:'hidden'}}>
        <div style = {{float:'left',width:'100%'}}>
          <Icon type="bars" style = {{fontSize:'15px'}}/>
          <span style = {styles.spanstyle} onClick = {this.showToggle.bind(this)}>{this.props.selects.selectvalue}</span>
            <div className = "posttitleDiv">
            <input type="text" maxLength = {this.maxLength} className="posttitle" placeholder = "请输入标题" ref = "txtinput"
            onFocus = {this.txtFocus.bind(this)} onBlur = {this.txtBlur.bind(this)} onChange ={this.txtChanged.bind(this)}/>
              <span className = "titleAlert">还能输入{this.state.limitLength}字</span>
            </div>
        </div>

        <div className = "fixstyle">
             <Options />
        </div>
      </div>
      <div className="submittitle" ref = "cover">
        {
          this.state.coverFlag
          ?
          <div className = "uploadcoverDiv" >
              <input ref="in" type="file" className = "inputButtons" accept="image/*" onChange={this.handleFile} />
          </div>
          :
          <div className = "showcoverDiv" style = {{backgroundImage:this.state.bgcover}}>
              <Icon type="cross" title = "点击删除封面图" style = {styles.CloseBtn} onClick = {this.deleteCover}/>
          </div>
        }
      </div>
          <div className = "submittitle">
            <SimpEditor />
          </div>
          <div className = "submittitle" style = {{textAlign:'right'}}>
            {/* <Button type="ghost" style = {{color:'#2db7f5',marginRight:'10px'}}>预览</Button>*/}
            <Button type="primary" onClick = {this.SubmitPost.bind(this)}>发帖</Button>
          </div>
      </div>
    )
  }
}
// <Button type="ghost" style = {{color:'#2db7f5'}}>保存草稿</Button>
/*
<div className = "uploadcoverDiv">
    <input ref="in" type="file" className = "inputButtons" accept="image/*" onChange={this.handleFile} />
</div>
*/

/*
<div className = "uploadcoverDiv">
    <Icon type="cross" title = "点击删除封面图" style = {styles.CloseBtn} onClick = {this.deleteCover.bind(this)}/>
</div>
*/
function mapStateToProps(store){
  return {
    userinfo: store.user,
    editor: store.editorOperate,
    selects:store.selectoption,
  }
}

function mapDispatchToProps(dispatch){
  return {
    UPDATE: (userid,editorcomment) => {dispatch({type:'UPDATE_EDITOR', userid:userid, editorcomment:editorcomment})},
    TOGGLE_SELECTOPTION: ()=>{dispatch({type:'TOGGLE_SELECTOPTION'})},
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
  }
}

const styles = {
  spanstyle:{
    fontSize: '15px',
    marginLeft: '10px',
    color: '#999',
    cursor: 'pointer',
  },CloseBtn:{
    fontSize: '30px',
    cursor: 'pointer',
    background: 'rgba(0,0,0,.5)',
    color: '#fff',
    padding: '10px',
  }
}

const error = function () {
  message.error('这是一条报错提示');
};

module.exports = connect(mapStateToProps,mapDispatchToProps)(SubmitPosts)
