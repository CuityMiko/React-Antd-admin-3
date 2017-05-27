/*
** reducers.js 进行redux的 reducer 管理
** auth:whr
** time:2017.4.27
*/

import { channelListAction, loginAction } from './actions'

/* 注意： 
** 函数命名时，比如与对应的 State 的属性名 同名
*/

export function login(state = localStorage.getItem('login') || loginAction.payload , action){
	if(action.type !== 'LOGIN') return state;
	return action.payload
}

export function channelState(state = channelListAction.payload, action){
	if(action.type !== 'CHANNEL_LIST') return state;
	return {...state, ...action.payload}
}