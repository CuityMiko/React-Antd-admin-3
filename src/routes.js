/*
** routes
** auth:whr
** time:2017.4.6
*/
import NotFound from './components/NotFound'
import App from './App.js' 
import Home from './components/Home.js'

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
	  				  cb(null, require('./components/CTR.js').default)
	  				}, 'business')
	  			}
	  		},
	  		{
	  			path: 'channel',
	  			getComponent(nextState,cb){
	  				require.ensure([], (require) => {
	  				  cb(null, require('./components/ChannelInfo.js').default)
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