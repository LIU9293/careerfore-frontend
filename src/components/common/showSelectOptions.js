import React, { Component } from 'react';
import { PostsChannel} from '../../vendor/connection';
import styles from './showSelectOptions.css';
import { connect } from 'react-redux';

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelSelect:null,
    }
  }

  optionClick(selectid,selectvalue){
    this.props.UPDATE_SELECTOPTION(selectid,selectvalue,"none");
  }

  componentDidMount(){
    console.log(this.props.userinfo.userid)
    PostsChannel(this.props.userinfo.userid,(err,data)=>{
      if(err){
        console.log(err);
      }else {
        var tmpList;
        tmpList = data.channel.map((item,index)=>{
          var obj ={
            key:item.ZCT_CHANNEL,
            value:item.ZCT_ID
          }
          return obj;
        })
        this.setState({channelSelect:tmpList})
      }
    })
  }

  render(){
    if(this.state.channelSelect){
        let options;
        options = this.state.channelSelect.map((item,index)=>{
          if(item.value === this.props.selectoptions.selectid){
            return <div key = {index} className = "singleDiv" onClick = {this.optionClick.bind(this,item.value,item.key)}>
              <span className = "singleSpan" style = {{color : 'orange'}}>{item.key}</span>
            </div> ;
          }else {
            return <div key = {index} className = "singleDiv" onClick = {this.optionClick.bind(this,item.value,item.key)}>
              <span className = "singleSpan">{item.key}</span>
            </div>
          }
        })
        let holder = "请选择频道"
        let item = <div key = {-1} className = "singleDiv" onClick = {this.optionClick.bind(this,"-1",holder)}>
          <span className = "singleSpan" >{holder}</span>
        </div>
        options.splice(0, 0, item)
        return (
          <div id = "fatherDiv" ref = "fatherDiv" style = {{display :this.props.selectoptions.display || ""}}>
            {options}
          </div>
        )
    }else {
      return (<div />)
    }
  }
}

function mapStateToProps(store){
  return {
    userinfo: store.user,
    selectoptions:store.selectoption,
  }
}

function mapDispatchToProps(dispatch){
  return {
    UPDATE_SELECTOPTION: (selectid,selectvalue,display)=>{dispatch({type:'UPDATE_SELECTOPTION',selectid:selectid,selectvalue:selectvalue,display:display})},

  }
}


module.exports = connect(mapStateToProps,mapDispatchToProps)(Options)
