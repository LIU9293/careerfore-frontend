import React,{Component} from 'react';
import ReactDom from "react-dom";
import SimpEditor from './PostArticle';
import { connect } from 'react-redux';
import { Upload, message, Button, Icon} from 'antd';
import style from './SubmitPost.css';
import { PostsChannel,uploadImageToQiniu,postDiscoverArticle ,postImage} from '../../vendor/connection';
import { browserHistory } from 'react-router';
import Cookies from 'js-cookie';

class SubmitPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImage:null,
      channelSelect:null,
    }
    this.handleFile = this.handleFile.bind(this);
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
      this.setState({channelSelect:tmpList})
    }
  })
}

handleFile(e) {
    var reader = new FileReader();
    var file = e.target.files[0];
    console.log(file);
    reader.readAsDataURL(file);
    reader.onload = function(img){
        postImage(img.currentTarget.result,(err,data)=>{
          if(err)
          {
            console.log(err);
          }else {
            // console.log(data)
            document.getElementById('previewDiv').style.display = "block";
            document.getElementById('close').style.display = "block";
            document.getElementById('previewimg').src = data.ImgName;
          }
        })

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
  }

  //发帖
  SubmitPost(){
    if(this.props.userinfo.userid === undefined){
      browserHistory.push(`/login`);
    }else {
      let uid = this.props.userinfo.userid;
      console.log(this.props.editor[uid])
      if(document.getElementById('txtinput').value.replace(" ","")==="")
      {
        alert("请输入标题");return;
      }
      if(document.getElementById('previewimg').src === "")
      {
        alert("没有封面图");return;
      }
      console.log(this.props.editor[uid])
      if(this.props.editor[uid]=== ""){
        alert("没有内容");return;
      }
      if(document.getElementById('channel').value === "-1" || document.getElementById('channel').value === null){
        alert("请选择频道");return;
      }
      postDiscoverArticle(
        uid, document.getElementById('txtinput').value,
        document.getElementById('previewimg').src, document.getElementById('channel').value,
        this.props.editor[uid], 1, "", "",
        (err,data)=>{
        if(err){console.log(err)}else {
          alert("发帖成功");
          Cookies.set("commentContent","");
          this.props.UPDATE(this.props.userinfo.userid,"");
        }
      })
    }
  }

  render(){
    let channelView;
    if(this.state.channelSelect){
      let options =[];
      let holder = "请选择频道";
      options.push(<option value = {-1}>{holder}</option>);
      this.state.channelSelect.map((item,index) =>{
          options.push(<option value = {item.value}>{item.key}</option>)
      })
      channelView = <select id = "channel" className = "form-control">{options}</select>
    }
    return(
      <div className = "SubmitPost">
          <div className="submittitle">
            <label className = "titlediv">帖子标题</label>
              <input id="txtinput" type="text" maxLength = "60" className="posttitle" placeholder = "请输入标题"/>
          </div>
          <div className="submittitle" >
              <label className = "titlediv">&nbsp;&nbsp;&nbsp;封面图</label>
              <a className="inputWapperS"><label>上传封面图</label>
                <input ref="in" type="file" className = "inputButton" accept="image/*" onChange={this.handleFile} />
              </a>
              <div className="preview" style={{display:'none'}} id = "previewDiv">
                <img id = "previewimg" src = {this.state.previewImage} className="previewImage" />
                <Icon id = "close" type="delete" style = {{color:'red',display:'none'}} />
              </div>
          </div>
          <div className = "submittitle" >
            <label className = "titlediv"> 选择频道</label>
              {channelView}
          </div>
          <div className = "submittitle">
            <SimpEditor />
          </div>
          <div className = "submittitle" style = {{textAlign:'right'}}>
            <Button type="primary" onClick = {this.SubmitPost.bind(this)}>发帖</Button>
          </div>
      </div>
    )
  }
}

function mapStateToProps(store){
  return {
    userinfo: store.user,
    editor: store.editorOperate
  }
}

function mapDispatchToProps(dispatch){
  return {
    UPDATE: (userid,editorcomment) => {dispatch({type:'UPDATE_EDITOR', userid:userid, editorcomment:editorcomment})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(SubmitPosts)
