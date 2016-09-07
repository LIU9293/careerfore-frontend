import React, { Component } from 'react';
import { getCarousel } from '../../vendor/connection';
import style from 'animate.css';
import { browserHistory } from 'react-router';

const styles = {
  bigWapper:{
    width: '100%',
    height: '600px',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    overflow: 'hidden',
    position: 'relative',
  },
  bg:{
    position: 'absolute',
    zIndex: '0',
    height: '600px',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    filter: 'blur(10px)',
    transition: 'all 1s ease'
  },
  wapper: {
    height: '600px',
    width: '1000px',
    margin: 'auto',
    overflow: 'hidden',
    zIndex: '2',
  },
  wapperInner: {
    height: '450px',
    width: '100%',
    overflow: 'hidden',
  },
  bottom:{
    height: '148px',
    marginTop: '1px',
    marginBottom: '1px',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: '999',
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
  bgFilter:{
    backgroundColor: '#000',
    opacity: '0.7',
    position: 'absolute',
    zIndex: '1',
    height: '600px',
    width: '100%',
  },
}

class DiscoverCarousel extends Component{

  constructor(props){
    super(props);
    this.state={
      data: null,
      currentSilde: 0,
      bgImage: '',
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
     let currentImage = this.refs[nextSlide].style.backgroundImage;
     this.setState({bgImage: currentImage})
     if(document.getElementById('bg').className == 'bgIn'){
       document.getElementById('bg').className = 'bgOut';
     } else {
       document.getElementById('bg').className = 'bgIn';
     }
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
     let currentImage = this.refs[index].style.backgroundImage;
     this.setState({bgImage: currentImage});
     if(document.getElementById('bg').className == 'bgIn'){
       document.getElementById('bg').className = 'bgOut';
     } else {
       document.getElementById('bg').className = 'bgIn';
     }
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
      let bg = <div id='bg' className='bgIn' style={{...styles.bg, backgroundImage: ((this.state.bgImage == '') ? 'url('+this.state.data[0].PictureUrl+')' : this.state.bgImage)}} />
      return(
        <div style={styles.bigWapper}>
          {bg}
          <div style={styles.bgFilter} />
          <div style={styles.wapper}>
            <div style={styles.wapperInner}>
              {myHomeFigList}
            </div>
            <div style={styles.bottom}>
              {bottomImage}
            </div>
          </div>
        </div>
      )
    }
  }
}
module.exports = DiscoverCarousel
