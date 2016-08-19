import React, { Component } from 'react';
import { getDiscoverList } from '../../vendor/connection';
import { Button } from 'antd';

class DiscoverList extends Component{

  constructor(props){
    super(props);
    this.state = {
      data: [],
      index: 2
    }
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount(){
    getDiscoverList('', 1, this.props.NumPerPage, (err,data)=>{
      if(err){
        console.log(err);
      } else {
        this.setState({
          data: data.PostsList
        })
        console.log(this.state.data)
      }
    })
  }

  loadMore(){
    getDiscoverList('', this.state.index, this.props.NumPerPage, (err,data)=>{
      if(err){
        console.log(err);
      } else {
        this.setState({
          data: this.state.data.concat(data.PostsList),
          index: this.state.index + 1
        })
        console.log(this.state.data)
      }
    })
  }

  render(){
    if(this.state.data.length == 0){
      return(
        <div>
          <h1>加载加载</h1>
        </div>
      )
    } else {
      let myReactComponent = this.state.data.map((item,ii)=>{
        return(
          <h1 key={ii}>
            {item.Title}
          </h1>
        )
      })
      return(
        <div>
          {myReactComponent}
          <Button type="primary" onClick={()=>{this.loadMore()}}>点击加载更多</Button>
        </div>
      )
    }
  }
}

module.exports = DiscoverList
