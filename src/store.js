/*
** store.js 进行redux的 store 管理
** auth:whr
** time:2017.4.27
*/
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import * as reducers from './reducers'
// import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
	...reducers,
	routing: routerReducer
}), applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(rootSaga);

store.subscribe(() => {  //设置监听函数，一旦 State 发生变化，就自动执行这个函数
	console.log('store-change',store.getState());
});

export default store