import React, { Component } from 'react';
import CollectionSingle from './collectionSingle';

class CollectionList extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    let collectionData = this.props.collectionData;
    if(collectionData.length === 0){
      let collections = <img src = "http://imageservice.pine-soft.com/3454AE720B024C86A7CFAA4A089EB51C.jpg"/>
      return (
        <div style ={{padding : '30px 0',textAlign:'center'}}>
          {collections}
        </div>
      )
    }else {
      let collections = collectionData.map((item,index)=>{
        return <CollectionSingle singleData = {item} key = {index}/>
      })
      return (
        <div>
          {collections}
        </div>
      )
    }
  }
}
module.exports = CollectionList
