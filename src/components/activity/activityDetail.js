import React, { Component } from 'react';
import { getPlaygroundPost } from '../../vendor/connection';

class ActivityPost extends Component{

  constructor(props){
    super(props);
    this.state={
      activityData:{}
    }
  }

  componentDidMount(){
    getPlaygroundPost(this.props.params.activityID, '',(err,data)=>{
      if(err){
        console.log(err);
      } else {
        let image = data.Activity.ActivityPictureUrl;
        let content = data.Activity.ActivityContent;
        let title = data.Activity.ActivityTitle;
        this.setState({
          activityData:{
            image: image,
            content: content,
            title: title,
          }
        })
      };
    })
  }

  render(){
    return(
      <div>
        <img src={this.state.activityData.image || ''}/>
        <h1>{this.state.activityData.title || ''}</h1>
        <p>{this.state.activityData.content || ''}</p>
      </div>
    )
  }
}

module.exports = ActivityPost
