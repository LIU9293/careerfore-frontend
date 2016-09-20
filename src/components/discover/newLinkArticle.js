import React, { Component } from 'react';
import { Form, Input, Button ,Icon,message} from 'antd';
import Cookies from 'js-cookie';
import { postDiscoverArticle, uploadImageToQiniu,postImage} from '../../vendor/connection';
import {base64encode,base64decode} from '../../vendor/connection/basis';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Options from '../common/showSelectOptions';
import style from './SubmitPost.css';
import SimpEditor from './PostArticle';
import {getHolderByChannelId} from '../../vendor/helper/commonHelper';

const FormItem = Form.Item;

class NewLinkArticle extends Component{

  constructor(props){
    super(props);
    this.state = {
      channelSelect:null,
      limitLength:60,
      coverFlag:true,
      bgcover:"",
      limitLength:60,
    }
    this.maxLength = 60;
    this.handleFile = this.handleFile.bind(this);
    this.deleteCover = this.deleteCover.bind(this);
  }

  componentDidMount(){
    if(!this.props.user.login){
      browserHistory.push('/login');
    }
  }

  showToggle(){
    this.props.TOGGLE_SELECTOPTION();
  }

  deleteCover(){
    this.setState({
      coverFlag : true,
      bgcover : ""
    })
  }
  //上传图片
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
    }

  SubmitPost(){
    // console.log(this.refs.textArea.value)
    // // alert(this.refs.textArea.value)
    // return;
    let title = this.refs.txtinput.value;
    if(title.replace(" ","")===""){
      message.warn("请输入链接标题");
      return;
    }
    let outline = this.refs.outLine.value;
    if(outline.replace(" ","") === ""){
      message.warn("请输入链接");
      return;
    }
    if(!IsURL(outline)){//网址正则
      message.warn("输入的链接地址不合法");
      return;
    }
    let channelid = this.props.selects.selectid; //获取选择的频道ID
    if(channelid === "-1"){
      message.warn("请选择频道");
      return;
    }
    let cover = this.state.bgcover === "" ? getHolderByChannelId(channelid) :this.state.bgcover.replace("url(","").replace(")","").replace("'","");//封面图
    let con = this.refs.textArea.value;
    if(con === "" || con === undefined){
      message.warn('请输入内容');return;
    }
    let content = {
      link: outline, //连接
      vendor: "", //来源
      image: cover, //封面图
      intro: con //用户的推荐语
    }
    postDiscoverArticle(this.props.user.userid, title, cover, channelid, JSON.stringify(content), 1, '', '', 3, (err,data)=> {
      if(err){ console.log(err) } else {
        message.success("发表成功");
        browserHistory.push('/discover/'+data.PostsId);
      }
    })
  }

  deleteCover(){
    this.setState({
      coverFlag : true,
      bgcover : ""
    })
  }

  txtChanged(e){
    //剩余可输入的字数
    this.setState({
      limitLength: this.maxLength - e.target.value.length
    })
  }

  // keyPress(e){
  //   var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
  //   console.log(keyCode)
  // }

  render() {
    return (
      <div className = "SubmitPost">
        <div className="submittitle" style = {{borderBottom:'1px solid #f0f0f0',paddingBottom:'5px',width:'100%',overflow:'hidden'}}>
          <div style = {{color:'#666',fontSize:'20px',paddingBottom: '10px'}}>发链接</div>
          <div style = {{float:'left',width:'100%'}}>
            <Icon type="bars" style = {{fontSize:'15px'}}/>
            <span style = {styles.spanstyle} onClick = {this.showToggle.bind(this)}>{this.props.selects.selectvalue}</span>
              <div className = "posttitleDiv">
              <input type="text" maxLength = {this.maxLength} className="posttitle" placeholder = "请输入标题" ref = "txtinput"
              onChange ={this.txtChanged.bind(this)}/>
                <span className = "titleAlert">还能输入{this.state.limitLength}字</span>
              </div>
          </div>
          <div className = "fixstyle">
               <Options />
          </div>
        </div>
        <div style = {{padding: '5px 10px',margin: '10px 0',border: '1px solid lightgray',borderRadius: '5px'}}>
        <input type = "text" placeholder = "再次输入外部链接" ref = "outLine"
        style = {{background: 'transparent',outline: 'none',border: 'none',fontSize: '15px',color: '#ccc',width: '100%'}}/>
        </div>
        <div className="submittitle" ref = "cover">
          {
            this.state.coverFlag
            ?
            <div className = "uploadcoverDivs" >
                <input ref="in" type="file" className = "inputButtons" accept="image/*" onChange={this.handleFile} />
            </div>
            :
            <div className = "showcoverDiv" style = {{backgroundImage:this.state.bgcover}}>
                <Icon type="cross" title = "点击删除封面图" style = {styles.CloseBtn} onClick = {this.deleteCover}/>
            </div>
          }
        </div>

        <div className = "submittitle">
          <div style = {{color:'#666',fontSize:'20px',paddingBottom: '10px'}}>输入您的推荐词</div>
          <div style = {{ padding: '7px 14px',border: '1px solid #eee', borderRadius: '5px', textAlign: 'center', background: '#fff'}}>
            <textarea style = {{width: '100%',height: '150px',outline: 'none',border: 'none',fontSize: '16px',resize: 'none'}} ref = "textArea"
            placeholder = "输入您的心得"></textarea>
          </div>
          {/*<Input ref = "inputs" type="textarea" placeholder="输入您的心得" rows={6} />
          <SimpEditor />*/}
        </div>
        <div className = "submittitle" style = {{textAlign:'right'}}>
          <Button type="primary" onClick = {this.SubmitPost.bind(this)}>发帖</Button>
        </div>

      </div>

    )
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

function IsURL(str_url){
        var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        var re=new RegExp(strRegex);
        //re.test()
        if (re.test(str_url)){
            return (true);
        }else{
            return (false);
        }
}

function mapStateToProps(store){
  return {
    user: store.user,
    selects: store.selectoption,
    editor: store.editorOperate,
  }
}
function mapDispatchToProps(dispatch){
  return {
    TOGGLE_SELECTOPTION: ()=>{dispatch({type:'TOGGLE_SELECTOPTION'})},
    UPDATE: (userid,editorcomment) => {dispatch({type:'UPDATE_EDITOR', userid:userid, editorcomment:editorcomment})},
  }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(NewLinkArticle)
