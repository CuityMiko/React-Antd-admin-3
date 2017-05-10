/*
** store.js 进行redux的 store 管理
** auth:whr
** time:2017.4.27
*/
import { createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as reducers from './reducers'

export default createStore(combineReducers({
	...reducers,
	routing: routerReducer
}));
