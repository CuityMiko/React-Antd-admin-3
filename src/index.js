/*
** index.js 入口JS文件 
** auth:whr
** time:2017.3.23
*/
import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router'
import routes from './routes';
import './index.less';

render(
	<Router history={ hashHistory } routes={routes}></Router>,
	document.getElementById('root')
);
