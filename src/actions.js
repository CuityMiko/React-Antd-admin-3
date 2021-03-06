/*
** action.js 进行redux的 action 管理
** auth:whr
** time:2017.4.27
*/

// action书写格式：
// let action = {
//     type: 'ACTION_NAME',
//     payload: // <bool | number | string | object>, //action的负载，可以是数据或 error 对象
//     error: // <bool>  指明该action是否是一个以 error 为负载的action
//     meta: // <string>  action元数据， 包含解释该action含义的信息
// }
import { countLatsetDate } from './common/utils'

const loginAction = {
	type: 'LOGIN', 
	payload: 'in'
}

const channelFormAction = {
	type: 'CHANNEL_FORM',
	payload: {
		ranks: {
			rank0: '0', //频道 标记当前选择的是第几个，0代表第一个
			rank1: '0', //1级类目 标记当前选择的是第几个，0代表第一个，null表示未选择
			rank2: '0', //2级类目 
		},
		channelList: [], //分类列表
		channelPicker: countLatsetDate(10) //时间，默认获取最近10天的开始、结束日期
	}
}

export {
	loginAction,
	channelFormAction
}