import React from 'react'
import { render } from 'react-dom'
import { Router, IndexLink, browserHistory } from 'react-router'
import {ActiveLink, activeStyle} from './example/ActiveLink'
import NotFound from './components/NotFound'
import './index.less'

/*
	路由设置大致分为3个部分：
	1，跳转菜单
	2，routes路由设置
	3，render渲染router组件
*/

const App = React.createClass({
  render() {
    return (
      <div style={{backgroundColor:'#eee'}}>
        <ul className="fl border-1 pd-20">
        	{<li><IndexLink to="/" activeStyle={activeStyle} >App -> Home</IndexLink></li>}
        	<li><ActiveLink to="/inbox">App -> Inbox</ActiveLink></li>
          {/*<li><ActiveLink to="/inbox/list">App -> Inbox -> List</ActiveLink></li>*/}
          <li><ActiveLink to={{pathname: '/about/ff', query: {name: 'serach-name'}}}>App -> About</ActiveLink></li>
          <li><ActiveLink to={{pathname: '/apple'}}>App -> Shop -> Apple</ActiveLink></li>
          <li><ActiveLink to="/set/info">App -> Info</ActiveLink></li>
          <li><ActiveLink to="/think">App -> Think</ActiveLink></li>
          {/*<li><ActiveLink to="/everythink">App -> Think -> Everythink</ActiveLink></li>*/}
          <li><ActiveLink to="/not">App -> NotFound</ActiveLink></li>
        </ul>
        <section className="fl ml-20">
        	<h3>我是App</h3>
        	{this.props.children}
        </section>
      </div>
    )
  }
})

let About,Home,Shop,Info,Apple,Think,Everythink;
{//各个组件
	const { createClass } = React;
	About = createClass({
	  render(){
	    return <div>
	      <p>url注入的time是：{this.props.params.time}</p>
	      <p>url注入的search的name是：{this.props.location.query.name}</p>
	    </div>
	  }
	})
	Shop = createClass({
		render(){
			return (
				<div>我是Shop{this.props.children}</div>
			)
		}
	})
	Think = createClass({
		render(){
			// const {router} = this.context;
			// const {location} = this.props;
			// const {pathname} = location;
			// console.log(location)
			return (
					<div>
						<ActiveLink to="/everythink">App -> Think -> Everythink</ActiveLink>
						<br/>
						我是Think，{this.props.children}
					</div>
				)
		}
	})
	Home = () => (<div>我是Home</div>)
	Apple = () => (<div>我是Apple</div>)
	Info = () => (<div>我是Info</div>)
	Everythink = () => (<div>我是Everythink</div>)
}

let routes;
{//routes路由器

	// 路径匹配顺序是由上到下，
	// 匹配过程 Link下的to值 -> url -> routes的path值，匹配成功后展示对应的component

	// routes的path值生成规则：
	// 		前面有 '/' 则为绝对路径
	// 		前面无 '/' 则使用父级路径

	// 特殊符号的路径匹配语法：
	// :paramName 匹配直到下一个的URL段，如：
	// 				<Route path="/hello/:name"> // 匹配 /hello/hr 或 /hello/kk，不匹配/hello
	// () 括号内的部分是可选的
	// *  非贪婪模式匹配所有字符
	// ** 贪婪模式匹配所有字符

	// 第一种routes写法
	// routes = (<Route path="/" component={App}>
	//       <IndexRoute component={Home} />
	//       <Route path="about" component={About} />
	//       <Route path="inbox" component={Inbox} />
	//       <Route path="404" component={NotFound} />
	//       <Redirect from="*" to="/404" />
	//     </Route>);

	// 第二种routes写法
	let thinkRoute = { 
		path: 'think',
		component: Think,
		childRoutes: [
			{
				path: '/everythink',
				component: Everythink 
			}
		]
	};

	routes = {
	  path: '/',
	  component: App,
	  indexRoute: { component: Home },
	  childRoutes: [
	    { path: 'about(/:time)', component: About },
	    { 
	    	path: 'inbox', 
	    	getComponent(nextState,cb){
	    		// @params nextState Object {location,params,routes,...}
	    		/*require.ensure(dependencies, callback, chunkName   , 
	    			这是 webpack 提供的方法，这也是按需加载的核心方法。
	    			第一个参数是依赖，第二个是回调函数，第三个就是上面提到的 chunkName，用来指定这个 chunk file 的 name。
	    			chunkName相同的会放到一个js文件里
	    		*/
	    		require.ensure([], (require) => {
	    		  cb(null, require('./example/Inbox').default)
	    		}, 'Inbox')
	    	},
	    	getChildRoutes(nextState,cb){
	    		// 进入path:inbox 时，不会执行这儿，只有需要匹配inbox里嵌套的路由时才会执行此处
	    		require.ensure([],(require) => {
	    			cb(null,[require('./example/inbox-route').default])
	    		})
	    	},
	    	onEnter(nextState,replace){
	    		// 进入的钩子
	    	},
	    	onLeave({location,params,routes,components}){
	    		//离开的钩子
	    	}
	    	// childRoutes: [require('./example/inbox-route').default]
	    },
	    { 
	    	component: Shop,
	    	childRoutes: [
	    		{
	    			path: 'apple', 
	    			component: Apple
	    		}
	    	]
	    },
	    { 
	    	path: 'set', 
	    	childRoutes: [
	    		{
	    			path: 'info', 
	    			component: Info
	    		}
	    	]
	    },
	    thinkRoute,
	    {
	    	path: '/404',
	    	component: NotFound
	    },
	    {
	    	path: '*',
	    	onEnter(nextState,replace){
	    		//页面跳转，实现 Redirect
	    		replace('/404');
	    	}
	    }
	  ]
	}
}

// 通过router组件，将跳转菜单极其对应组件内容渲染到页面上
render(
  <Router history={ browserHistory } routes={routes} />,
  document.getElementById('root')
);
