import React,{Component} from 'react';
import Simditor from 'simditor-custom-img';
import style from './PostArticle.css'
import $ from 'jquery';
import { uploadImageToQiniu } from '../../vendor/connection';

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
        console.log(base64)
        uploadImageToQiniu(base64.split(',')[1],(err,data)=>{
          if(err){
            console.log(err);
            callback(err);
          } else {
            callback(null,data)
          }
        })
      }
    });
    this.editor.on('valuechanged ',(e)=>{
      console.log(e);
    })
  }

  componentWillUnmount () {
    this.editor = null;
  }
  render () {
    let width = this.props.width?this.props.width:"100%";
    let height = this.props.height?this.props.height:"150px";
    return (
      <div style={{width:width,height:height}}>
        <textarea ref="textarea" id="textarea"></textarea>
      </div>
    );
  }

}


export default SimpEditor;
