import React, { Component } from 'react';



class BlurImg extends Component{

  constructor(props){
    super(props);
    this.state = {
      style: {
        width:'100%',
        height:'100%',
        backgroundImage: 'url('+this.props.src+'-small)',
        backgroundSize:'cover',
        backgroundPosition:'center center',
        WebkitFilter: 'blur(4px)'
      }
    }
  }

  componentDidMount(){
    fetch(this.props.src)
      .then(()=>{
        this.setState({
          style: {
            width:'100%',
            height:'100%',
            backgroundImage: 'url('+this.props.src+')',
            backgroundSize:'cover',
            backgroundPosition:'center center',
            WebkitFilter: ""
          }
        })
      })
  }

  render(){
    return(
      <div style={this.state.style} ref='pic'>
      </div>
    )
  }

}

module.exports = BlurImg
