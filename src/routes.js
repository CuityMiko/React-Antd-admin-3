/*
** routes
** auth:whr
** time:2017.4.6
*/
import NotFound from './components/NotFound'
import App from './App' 
import Home from './components/Home'

export default {
	path: '/',
	component: App,
	indexRoute: { component: Home },
	childRoutes: [
	  { 
	  	path: 'business', 
	  	childRoutes: [
	  		{
	  			path: 'ctr',
	  			getComponent(nextState,cb){
	  				require.ensure([], (require) => {
	  				  cb(null, require('./components/CTR').default)
	  				}, 'business')
	  			}
	  		},
	  		{
	  			path: 'channel',
	  			getComponent(nextState,cb){
	  				require.ensure([], (require) => {
	  				  cb(null, require('./components/Channel').default)
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
	  						  cb(null, require('./components/About').default)
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
	  						  cb(null, require('./components/Seting').default)
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
