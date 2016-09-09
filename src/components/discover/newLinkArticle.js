import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import Cookies from 'js-cookie';
import { postDiscoverArticle, uploadImageToQiniu } from '../../vendor/connection';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Options from '../common/showSelectOptions';

const FormItem = Form.Item;

class NewLinkArticle extends Component{

  constructor(props){
    super(props);
    this.state = {
      title: null,
      link: null,
      err: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showToggle = this.showToggle.bind(this);
  }

  componentDidMount(){
    if(!this.props.user.login){
      browserHistory.push('/login');
    }
  }

  showToggle(){
    this.props.TOGGLE_SELECTOPTION();
  }

  handleSubmit(e){
    e.preventDefault();
    if(!this.state.title){
      this.setState({err: '请输入链接标题'});
    } else if (!this.state.link){
      this.setState({err: '请输入链接地址'});
    } else {
      let content = {
        link: this.state.link,
        vendor: null,
        image: null,
      }
      postDiscoverArticle(this.props.user.userid, this.state.title, '', this.props.selects.selectid, JSON.stringify(content), 1, '', '', 2, (err,data)=> {
        if(err){ console.log(err) } else {
          console.log(data);
        }
      })
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="wapper">
        <div className="form-container">
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="类别">
              <span onClick = {this.showToggle}>{this.props.selects.selectvalue}</span><Options />
            </FormItem>
            <FormItem label="标题">
              <Input placeholder="请输入链接标题"
                onChange={(e)=>{this.setState({title: e.target.value})}}
              />
            </FormItem>
            <FormItem label="地址">
              <Input placeholder="请输入链接地址"
                onChange={(e)=>{this.setState({link: e.target.value})}}
              />
            </FormItem>
            <h5 style={{color:'#e33', marginBottom: '20px'}}>{this.state.err || ''}</h5>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form>
        </div>
      </div>
    );
  }
}

NewLinkArticle = Form.create()(NewLinkArticle);

function mapStateToProps(store){
  return {
    user: store.user,
    selects: store.selectoption,
  }
}
function mapDispatchToProps(dispatch){
  return {
    TOGGLE_SELECTOPTION: ()=>{dispatch({type:'TOGGLE_SELECTOPTION'})},
  }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(NewLinkArticle)
