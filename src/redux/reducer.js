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

export default combineReducers({user})
