/*
** channelInfo-config  频道、类目内容配置项
** ！！数据格式的更改必须要综合考虑每个使用此数据格式的组件，并做修改
** auth:whr
** time:2017.4.24
*/
import { deepCopy } from '../common/utils'

export const config = {//配置项
  title: '频道/类目内容条数',
  subtext: '分别展示每天总条数和新增条数',
  axis: ['时间','条数'], //必须是数组，第一个是X轴名称，第二个是Y轴名称
}

const option = {
	xAxisProp: {
		prop: 'date', //后端返回数据中，x轴数据的属性名
		name: config.axis[0]
	}, 
	xAxisData: [],
	series: {
	  props: ['total','new_count'], //不是用来渲染echarts用的数据，而是用来从返回值中取数据的属性名
	  names: ['总条数','新增条数'],
	  datas: []
	}
};
for(let i=0; i<option.series.props.length; i++){ //为option的series.datas 增加跟props相应数量的空数组
  option.series.datas.push([])
}
export const getOption = (opt = {}) => deepCopy(option,opt)