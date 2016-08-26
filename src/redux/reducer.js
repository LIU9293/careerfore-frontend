/*
 * this is the file that contains whole reducers for app
 */
import { combineReducers } from 'redux';

var initUserState = {login: false, userid: null, userdata:null}

//user Reducer存放了用户的登录信息，已登录的用户可以获取到昵称、电话、头像
function user(state = initUserState, action){
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        login: true,
        userid: action.userid,
        userdata: action.userdata,
      }
    case 'LOG_OUT':
      return {
        ...state,
        login: false,
        userid: null,
        userdata: null,
      }
    default:
      return state
  }
}

//点赞Reducer存放了在APP生命周期中的点赞内容
function dianzan(state = {}, action) {
  switch (action.type) {
    case 'LIKE_TOGGLE':
      if(state[action.commentID] == true){
        delete state[action.commentID];
        console.log({...state})
        return {...state}
      } else {
        console.log({
          ...state,
          [action.commentID]:true
        })
        return{
          ...state,
          [action.commentID]:true
        }
      }
    default:
      return state
  }
}

//这个Reducer会在APP刚开始的时候或者用户登录的时候更新，获取到用户所有已经报名的活动列表
function yibaoming( state = {}, action ){
  switch (action.type) {
    case 'JOIN_ACTIVITY':
      return {
        ...state,
        [action.id]: '已报名',
      }
    case 'CANCEL_ACTIVITY':
      if(state[action.id]){
        delete state[action.id];
      }
      return {...state}
    default:
      return state
  }
}

//这个Reducer会在APP一开始的时候更新，获取所有已结束的活动列表
function yijieshu( state = {}, action ){
  switch (action.type) {
    case 'ADD_CLOSED':
      return {
        ...state,
        [action.id]: '已结束',
      }
    default:
      return state
  }
}

//这个Reducer会存放搜索的关键字和数据
function search( state = { text: '', result: [] }, action ){
  switch (action.type) {
    case 'UPDATE_SEARCH':
      return {
        ...state,
        text: action.key
      }
    case 'UPDATE_RESULT':
      return {
        ...state,
        result: action.result
      }
    default:
      return search
  }
}

//这个Reducer存放所有发现页列表，任何需要展示发现文章列表地方可以直接用
function discoverListData( state = {data: []}, action ){
    switch (action.type) {
      case 'UPDATE_DISCOVER_LIST_DATA':
        return{
          ...state,
          data: action.data
        }
      default:
        return state
    }
}


export default combineReducers({user,dianzan,yibaoming,yijieshu,search,discoverListData})
