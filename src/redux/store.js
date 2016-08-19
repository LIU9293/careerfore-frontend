/*
 * do not modify this file.
 * at very begining of app lifecycle, console will log the inital store values.
 */

import { createStore } from 'redux';
import reducer from './reducer';

let store = createStore(reducer);
console.log(store.getState());

module.exports = store
