/*
** sagas.js 
** auth:whr
** time:2017.5.11
*/

import { delay } from 'redux-saga'
import { jsonp } from './common/utils'
import { fork, call, put } from 'redux-saga/effects'

const api = 'http://api.btime.com/living/getinfo';

// workder Saga : 将在 LOGIN_FETCH_REQUESTED action 被发起时调用
function* fetchLogin(action){
	try{
		const login = yield call(jsonp(api,{}), action.payload);
		console.log('login',login)
		yield put({type: 'LOGIN_FETCH_SUCCESSED', login: login});
	}catch(e){
		console.log('login-f')
		yield put({type: 'LOGIN_FETCH_FAILED', message: e.message});
	}
}

/*
  在每个 `LOGIN_FETCH_REQUESTED` action 被发起时调用 fetchLogin
  允许并发（译注：即同时处理多个相同的 action）
*/


export default function* rootSaga(){
	console.log('s');
	yield [
		fork(fetchLogin),
	]
	console.log('e');
}






