/*
 * this is the file that contains whole reducers for app
 */

import { combineReducers } from 'redux';

function user(state = {login: false,userid: null}, action){
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        login: true,
        userid: action.userid,
      }
    case 'LOG_OUT':
      return {
        ...state,
        login: false,
        userid: null,
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

export default combineReducers({user,dianzan})
