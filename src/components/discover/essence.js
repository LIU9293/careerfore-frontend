import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { getnicepostlist } from '../../vendor/connection'

 const styles={
          container:{
            width: '150px',
            height: '500px',
            padding: '15px',
            marginLeft: '20px',
            marginTop: '20px',
            postion:'relative',
            textAlgin:'center',
            overflow: 'scroll',
          },
          box:{
            width: '120px',
            height: '80px',
            overflow: 'hidden',
            color: '#fff',
            positionSize:'cover',
          }
        }
class Essence extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data:[]
    }
  }
  componentDidMount(){
  getnicepostlist(1, 10, (err, data ) => {
    if (err) {
      console.log(err);
    }else {
      console.log(data);
      let NicePostList = data.NickPostList.map((item, ii) => {
        let cover = 'http://imageservice.pine-soft.com/' + item.ZPT_COVER,
            title = item.ZPT_TITLE;
        return (
          <div key={ii}>
            <div style={styles.box}>
              <img src={cover} style={{width:'100% ',height:'80px'}}/>
              <h3>{title}</h3>
            </div>
          </div>
        )
      })
      this.setState({
        data:data.NicePostList
      })
    }
  })
}
  render(){
  return(
    <div style={styles.container}>
      {this.state.data}
    </div>
  )
}
}





module.exports = Essence
