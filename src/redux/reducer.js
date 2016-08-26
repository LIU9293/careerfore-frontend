/*
 * this is the file that contains whole reducers for app
 */
import { combineReducers } from 'redux';

var initUserState = {login: false, userid: null, userdata:null}

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

function dianzan(state = {}, action) {
  switch (action.type) {
    case 'LIKE_TOGGLE':
      if(state[action.commentID] == true){
        delete state[action.commentID];
        return {...state}
      } else {
        return{
          ...state,
          [action.commentID]:true
        }
      }
    default:
      return state
  }
}

function editorOperate(state = {},action) {
  console.log("enter")
  switch (action.type) {
    case 'UPDATE_EDITOR':
      return{
        ...state,
        [action.userid]:action.editorcomment
      }
    default:
      return state
  }
}

function commentOperate(state = {},action) {
    switch (action.type) {
      case 'UPDATE_COMMENT':
        return{
          ...state,
          [action.postID]: action.commentData
        }
      case 'INSERT_TOP_LEVEL_COMMENT':
        state[action.postID].push(action.commentData);
        return {...state}
      case 'INSERT_SECOND_LEVEL_COMMENT':
        let newState = state[action.postID].map((item,ii)=>{
          if(item.ID == action.ID){
            item.ChildList.push(action.commentData)
          };
          return item
        })
        return {
          ...state,
          [action.postID]: newState
        }
      default:
        return state
    }
}

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

export default combineReducers({user,dianzan,yibaoming,yijieshu,commentOperate,editorOperate})
