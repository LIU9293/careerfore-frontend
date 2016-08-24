import React ,{ Component } from 'react';

class Loading extends Component{
  render(){
    return(
      <div style={{height:'100%', width:'100%', textAlign:'center',marginTop:'-50px',position:'fixed'}}>
        <img src="http://img.careerfore.com/loading4.gif" style={{display:'table-cell', verticalAlign:'middle', height:'150px', width: '150px'}}/>
      </div>
    )
  }
}

module.exports = Loading
