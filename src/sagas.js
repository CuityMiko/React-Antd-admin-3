/*
** sagas.js 
** auth:whr
** time:2017.5.11
*/

import { delay } from 'redux-saga'
import { fork, call, put, take } from 'redux-saga/effects'
import { testAction } from './actions'

const api = 'http://api.btime.com/living/getinfo';

// workder Saga : 将在 LOGIN_FETCH_REQUESTED action 被发起时调用
function* fetchLogin(action){
	try{
		testAction.payload = 'test1002';
		yield put(testAction);
		const login = yield call(fetch, api);
		console.log('login',login);
		const data = yield login.json();
		yield put({type: 'TEST_ACTION', payload: data});
	}catch(e){
		console.log('login-f')
		yield put({type: 'TEST_ACTION', message: e.message});
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






