/*
** reducers.js 进行redux的 reducer 管理
** auth:whr
** time:2017.4.27
** 增加reducer时只需2步，第一，从actions引入对应action；第二，在reducers对象里增加对应的方法
*/


import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { channelFormAction, loginAction } from './actions'

/* 注意： 
** 方法名必须与对应的 State 的属性名 同名
*/
const reducers = {
	login(state = localStorage.getItem('login') || loginAction.payload , action){
		if(action.type !== 'LOGIN') return state;
		return action.payload
	},
	channelForm(state = channelFormAction.payload, action){
		if(action.type !== 'CHANNEL_FORM') return state;
		return {...state, ...action.payload}
	}
}

export default function createReducers(){
	return combineReducers({
		...reducers,
		routing: routerReducer
	})
}