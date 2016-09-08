import React,{Component} from 'react';
import Simditor from 'simditor-custom-img';
import style from './PostArticle.css'
import $ from 'jquery';
import { uploadImageToQiniu } from '../../vendor/connection';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';


class SimpEditor extends Component {
  constructor (props) {
    super(props);
    this.editor = null;
  }
  componentDidMount () {
    this.editor = new Simditor({
      textarea: $('#textarea'),
      upload: {
        url: 'http://www.baidu.com',
        params: { folder: this.props.fileFolder || 'mailbox' },
        fileKey: 'uploadFile', connectionCount: 3,
        leaveConfirm: '正在上传文件中，如果离开页面将自动取消。',
      },
      uploadImage: (base64,callback) => {
        this.props.startLoading();
        uploadImageToQiniu(base64.split(',')[1],(err,data)=>{
            this.props.stopLoading();
          if(err){
            callback(err);
          } else {
            callback(null,data);
            setTimeout(()=>{
              let commentContent = this.editor.getValue();
              Cookies.set('commentContent', commentContent, { expires: 7 });
              this.props.UPDATE(this.props.userinfo.userid,commentContent);
            },500)
          }
        })
      },
    });

    this.editor.on('valuechanged',()=>{
      let commentContent = this.editor.getValue();
      Cookies.set('commentContent', commentContent, { expires: 7 });
      this.props.UPDATE(this.props.userinfo.userid,commentContent);
    })

    if(Cookies.get('commentContent')){
      console.log(Cookies.get('commentContent'))
      this.editor.setValue(Cookies.get('commentContent'));
    }
  }

  componentWillUnmount () {
    this.editor = null;
  }
  render () {
    let width = this.props.width?this.props.width:"100%";
    let height = this.props.height?this.props.height:"";
    return (
      <div style={{width:width,height:height}}>
        <textarea ref="textarea" id="textarea"></textarea>
      </div>
    );
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
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(SimpEditor)
