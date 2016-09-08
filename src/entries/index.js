import './index.html';
import './index.less';
import ReactDOM from 'react-dom';
import React from 'react';
import Routes from '../routes/index';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { browserHistory } from 'react-router';

ReactDOM.render(
  <Provider store={store}>
    <Routes history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
