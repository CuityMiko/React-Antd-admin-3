/*
** index.js 入口JS文件 
** auth:whr
** time:2017.3.23
*/
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './store'
import { Provider } from 'react-redux'
import routes from './routes'
import './index.less'

const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>
		<Router history={ history } routes={routes}></Router>
	</Provider>,
	document.getElementById('root')
);
