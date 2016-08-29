import React, { Component } from 'react';
import { getActivitySignUp } from '../../vendor/connection';


class ActivitySignUps extends Component{

  constructor(props){
    super(props);
    this.state={
      data: null,

    }
  }



  componentDidMount(){
    getSignUp(this.props.UserID,this.props.ActivityID,(err,data)=>{
      if (err) {
        console.log(err)
      }else {
        console.log(data);
      }
    })

  }



  render(){
    return(
      <div></div>
    )
  }
}
module.exports = ActivitySignUps
