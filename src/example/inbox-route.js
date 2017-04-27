export default {
	path: 'list', 
	getComponent(nextState,cb){
		require.ensure([],(require) => {
			cb(null,require('./List').default)
		},'List')
	}
	// component: List
}
