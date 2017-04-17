/*
** router ·��
** auth:whr
** time:2017.4.6
*/
import NotFound from './components/NotFound'
import App from './App.js' //ҳ�����岼��
import Home from './components/Home.js' //��ҳ

// routes��һ��д����
export default {
	path: '/',
	component: App,
	indexRoute: { component: Home },
	childRoutes: [
	  { 
	  	path: 'business', 
	  	childRoutes: [
	  		{
	  			path: 'list/:tid',
	  			getComponent(nextState,cb){
	  				require.ensure([], (require) => {
	  				  cb(null, require('./components/BsnList.js').default)
	  				}, 'business')
	  			}
	  		}
	  	]
	  },
	  { 
	  	path: 'user',
	  	childRoutes: [
	  		{
	  			path: 'about',
	  			childRoutes: [
	  				{
	  					path: 'mylog',
	  					getComponent(nextState,cb){
	  						require.ensure([], (require) => {
	  						  cb(null, require('./components/About.js').default)
	  						}, 'about')
	  					}
	  				}
	  			]
	  		},
	  		{
	  			path: 'seting',
	  			childRoutes: [
	  				{
	  					path: 'info',
	  					getComponent(nextState,cb){
	  						require.ensure([], (require) => {
	  						  cb(null, require('./components/Seting-info.js').default)
	  						}, 'seting')
	  					}
	  				}
	  			]
	  		}
	  	]
	  },
	  {
	  	path: '*',
	  	component: NotFound
	  }
	]
}