import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search } from '../../vendor/connection';
import ArticleList from './articleList';

const styles = {
  wapper: {
    maxWidth: '1000px',
    margin: 'auto',
    paddingTop: '30px',
    paddingBottom: '30px',
  }
}

class SearchPage extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  render(){
    return(
      <div style={styles.wapper}>
        <ArticleList />
      </div>
    )
  }

}

function mapStateToProps(store){
  return{
    searchContent: store.search ,

  }
}
function mapDispatchToProps(dispatch){
  return{
    search: (key) => {dispatch({type:'UPDATE_SEARCH', key: key})}
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(SearchPage)
