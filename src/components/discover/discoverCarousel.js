import React, { Component } from 'react';
import { getCarousel } from '../../vendor/connection';
import style from 'animate.css';
import { browserHistory } from 'react-router';

const styles = {
  wapper: {
    height: '600px',
    width: '1000px',
    margin: 'auto',
    overflow: 'hidden',
  },
  wapperInner: {
    height: '450px',
    width: '100%',
    overflow: 'hidden',
  },
  bottom:{
    height: '148px',
    width: '100%',
    marginTop: '1px',
    marginBottom: '1px',
    overflow: 'hidden'
  },
  chooser:{
    display: 'inline-block',
    border: '1px solid #ddd',
    height: '148px',
    backgroundSize:  'cover',
    backgroundPosition: 'center center',
  },
  slider: {
    width: '1000px',
    height: '450px',
    backgroundSize:  'cover',
    backgroundPosition: 'center center',
    position: 'absolute'
  },
}

class DiscoverCarousel extends Component{

  constructor(props){
    super(props);
    this.state={
      data: null,
      currentSilde: 0,
    }
    this.move = this.move.bind(this);
    this.goToSilde = this.goToSilde.bind(this);
    this.t = null;
  }

  componentDidMount(){
     getCarousel((err,data)=>{
       if (err) {console.log(err)} else {
         this.setState({
           data: data.HomeFigList,
         },()=>{
           this.t = setInterval(()=>{
             this.move(this.state.currentSilde)
           },5000)
         })
       }
     })
   }

   componentWillUnmount(){
     clearInterval(this.t);
   }

   move(thisSlide){
     var nextSlide;
     if(thisSlide == this.state.data.length - 1){
       nextSlide = 0;
       this.setState({
         currentSilde: nextSlide
       })
     } else {
       nextSlide = thisSlide + 1;
       this.setState({
         currentSilde: nextSlide
       })
     }
     this.refs[thisSlide].className = "fadeOut animated";
     this.refs[nextSlide].className = "fadeIn animated z100";
     this.refs['bottom'+thisSlide].className = 'notCurrent';
     this.refs['bottom'+nextSlide].className = '';
   }

   goToSilde(index){
     clearInterval(this.t);
     this.refs[this.state.currentSilde].className = "fadeOut animated";
     this.refs['bottom' + this.state.currentSilde].className = "notCurrent";
     this.refs[index].className = "fadeIn animated z100";
     this.refs['bottom' + index].className = '';
     this.setState({
       currentSilde: index
     });
     this.t = setInterval(()=>{
       this.move(this.state.currentSilde)
     },5000)
   }

  render(){
    if (!this.state.data) {
      return(
        <div></div>
      )
    } else {
      let myHomeFigList=this.state.data.map((item,ii)=>{
        if(ii !== 0){
          return(
            <a key={ii} onClick = {e => browserHistory.push('/discover/'+item.PostsID)}>
              <div
                style={{...styles.slider, backgroundImage: 'url('+item.PictureUrl+')'}}
                ref={ii}
                className = "fadeOut animated"
              />
            </a>
          )
        } else {
          return(
            <a key={ii} onClick = {e => browserHistory.push('/discover/'+item.PostsID)} >
              <div
                style={{...styles.slider, backgroundImage: 'url('+item.PictureUrl+')'}}
                ref={ii}
                className = "fadeIn animated z100"
              />
            </a>
          )
        }
      })

      let bottomImage = this.state.data.map((item, ii)=>{
        let width = 1000/this.state.data.length + 'px';
        if(ii==0){
          return(
            <a onClick = {this.goToSilde.bind(this,ii)} key={ii}>
              <div style={{...styles.chooser, width: width,
                backgroundImage: 'url('+item.PictureUrl+')'}}
                ref={'bottom' + ii}
                className='Current'
              >
                <div className="blackFilter" style={{width: width, height: '148px'}} />
              </div>
            </a>
          )
        } else {
          return(
            <a onClick = {this.goToSilde.bind(this,ii)} key={ii}>
              <div style={{...styles.chooser, width: width,
                backgroundImage: 'url('+item.PictureUrl+')'}}
                ref={'bottom' + ii}
                className='notCurrent'
              >
                <div className="blackFilter" style={{width: width, height: '148px'}} />
              </div>
            </a>
          )
        }
      })

      return(
        <div style={styles.wapper}>
          <div style={styles.wapperInner}>
            {myHomeFigList}
          </div>
          <div style={styles.bottom}>
            {bottomImage}
          </div>
        </div>
      )
    }
  }
}
module.exports = DiscoverCarousel
