/*
** reducers.js 进行redux的 reducer 管理
** auth:whr
** time:2017.4.27
*/

import { channelFormAction, loginAction } from './actions'

/* 注意： 
** 函数命名时，必须与对应的 State 的属性名 同名
*/

export function login(state = localStorage.getItem('login') || loginAction.payload , action){
	if(action.type !== 'LOGIN') return state;
	return action.payload
}

export function channelForm(state = channelFormAction.payload, action){
	if(action.type !== 'CHANNEL_FORM') return state;
	return {...state, ...action.payload}
}
