import React , { Component } from 'react';
import { GetCommentList } from '../../vendor/connection';

class ActivityComment extends Component{

  constructor(props){
    super(props);
    this.state = {
      comment: null
    }
  }

  componentDidMount(){
    GetCommentList(this.props.activityID, '', 1, (err,data)=>{
      if (err) {console.log(err)
      } else {
        console.log(data);
       let HeadImg=data.CommentList[i].HeadImg;
       
      }
    })
  }

  render(){
    return(
      <div></div>
    )
  }
}

module.exports = ActivityComment
