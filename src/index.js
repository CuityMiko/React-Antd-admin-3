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
import routes from './routes';
import './index.less';

const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>
		<Router history={ history } routes={routes}></Router>
	</Provider>,
	document.getElementById('root')
);


// whr 2017.4.7
// redux基本使用demo
// 为方便测试，所以将 组件、action、reducer、store、connectApp都放在了一个里面
/*import React,{ Component } from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import { createStore} from 'redux';
import { Provider,connect } from 'react-redux';

// Component.js 
class Count extends Component {
  render() {
    const { value, onAddClick, onCutClidk, onDemoClidk } = this.props;
    return (
      <div>
        <span>{value}</span>
        <button onClick={onAddClick}>add</button>
        <button onClick={onCutClidk}>cut</button>
        <button onClick={onDemoClidk}>demo</button>
      </div>
    )
  }
}
Count.propTypes = {
	value: PropTypes.number.isRequired,
	onAddClick: PropTypes.func.isRequired,
	onCutClidk: PropTypes.func.isRequired,
	onDemoClidk: PropTypes.func.isRequired,
}


// action.js 
const addAction = {
	type: 'add',
	payload: 'add 1'
}
const cutAction = {
	type: 'cut',
	payload: 'cut 1'
}
const demoAction = {
	type: 'demo',
	payload: 'demo-payload'
}

// Reducer.js 
function reducer(state = {count: 0},action){
	const count = state.count;
	switch(action.type){
		case 'add':
			return {count: count + 1}
		case 'cut':
			return {count: count - 1}
		case 'demo':
			return Object.assign({},state,{
				ttt: count
			})
		default:
			return state
	}
}


// store.js 
const store = createStore(reducer);

// connectApp.js
// map redux state to component props
// mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
function mapStateToProps(state){ //负责输入逻辑
	return {
		value:state.count
	}
}
function mapDispatchToProps(dispatch){ //负责输出逻辑，即将用户对 UI 组件的操作映射成 Action,即发送action
	return {
		onAddClick(){
			dispatch(addAction)
		},
		onCutClidk(){
			dispatch(cutAction)
		},
		onDemoClidk(){
			dispatch(demoAction)
		}
	}
}
const App = connect(mapStateToProps,mapDispatchToProps)(Count);

// index.js
ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('root')
);*/
