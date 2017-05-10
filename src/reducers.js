/*
** reducers.js 进行redux的 reducer 管理
** auth:whr
** time:2017.4.27
*/
export function reducer(state = {},action){
	switch(action.type){
		case 'LOGIN':
			localStorage.setItem('login',action.payload);
			return Object.assign({},state,{
				login: action.payload
			});
		case 'CHANNEL_LIST':
			return Object.assign({},state,{
				channelState: action.payload
			});
		default:
			return state
	}
}
