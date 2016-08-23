/*
 * this is the file that contains whole reducers for app
 */
import Cookies from 'js-cookie';
import { combineReducers } from 'redux';

let userid = Cookies.get('UserID');
if(userid !== undefined){
  var initUserState = { login: true, userid: userid};
} else {
  var initUserState = {login: false,userid: null}
}

function user(state = initUserState, action){
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
