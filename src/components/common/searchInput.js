import React, { Component } from 'react';
import { Input, Button } from 'antd';
import classNames from 'classnames';
import { searchFound } from '../../vendor/connection';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import S from 'string';
import { millseconds2DateDiff } from '../../vendor/helper/timeTransfer';

const InputGroup = Input.Group;

const SearchInput = React.createClass({
  getInitialState() {
    return {
      value: '',
      focus: false,
    };
  },
  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  },
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  },
  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  },
  render() {
    const { style, size, placeholder } = this.props;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    return (
      <div className="ant-search-input-wrapper" style={style}>
        <InputGroup className={searchCls}>
          <Input placeholder={placeholder} value={this.state.value} onChange={this.handleInputChange}
            onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch}
          />
          <div className="ant-input-group-wrap">
            <Button icon="search" className={btnCls} size={size} onClick={this.handleSearch} />
          </div>
        </InputGroup>
      </div>
    );
  },
});

class Search extends Component{
  constructor(props){
    super(props);
    this._search = this._search.bind(this);
  }
  _search(key){
    this.props.updateSearchKey(key);
    searchFound(key, 1, 10, (err,data)=>{
      if(err){console.log(err)} else {
        console.log(data);
        if(data.SearchFoundList){
          let discoverData =  data.SearchFoundList.map((item, ii)=>{
            let des = S(item.Content).decodeHTMLEntities().stripTags().s;
            if (des.length > 72) {
    					des = des.substr(0, 72) + '...';
    				}
            return(
              {
                avatar: null,
                category: item.ChannelName,
                description: des,
                nickName: item.ReleasePerson,
                cover: item.CoverImg,
                title: item.Title,
                time: millseconds2DateDiff(item.Date),
                viewNum: 0,
                likeNum: 0,
                essence: 0,
                top: 0,
                recommand: 0,
                id: item.ID,
              }
            )
          });
          this.props.updateDiscoverData(discoverData);
          this.props.updatePage(1, data.SearchFoundList.length == 10 ? true : false);
        }
      }
    })
    browserHistory.push('/search');
  }
  render(){
    return(
      <SearchInput placeholder="搜索职前..."
        onSearch={value => this._search(value)} style={{ width: 200 }}
      />
    )
  }
}

function mapStateToProps(store){
  return{
    searchContent: store.search
  }
}
function mapDispatchToProps(dispatch){
  return{
    updateSearchKey: (key) => {dispatch({type:'UPDATE_SEARCH_KEY', key: key})} ,
    updatePage: (page,haveMore) => {dispatch({type:'UPDATE_SEARCH_PAGE', page: page, haveMore: haveMore, })} ,
    updateDiscoverData: (data) => {dispatch({type:'UPDATE_DISCOVER_LIST_DATA', data: data})} ,
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Search)
