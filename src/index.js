﻿/*
** index.js 入口JS文件 
** auth:whr
** time:2017.3.23
*/
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'
import routes from './routes';
import './index.less';

render(
	<Router history={ browserHistory } routes={routes}></Router>,
	document.getElementById('root')
);
