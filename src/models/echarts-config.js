/*
** channelInfo-config  频道、类目内容配置项
** ！！数据格式的更改必须要综合考虑每个使用此数据格式的组件，并做修改
** auth:whr
** time:2017.4.24
*/

import { fillDataSite, getInitOption, mapDataToOption as initMapDataToOption } from './initEchartsConfig'

export const option = {//配置项
  title: '数据展示DEMO',
  subtext: '动态的添加每一条新增数据',
  axis: ['时间','数量'], //必须是数组，第一个是X轴名称，第二个是Y轴名称
}

export const config = fillDataSite({
	xAxisProp: {
		prop: 'time', //后端返回数据中，x轴数据的属性名
		name: option.axis[0]
	}, 
	xAxisData: [],
	series: {
	  props: ['t1','t2','t3'], //不是用来渲染echarts用的数据，而是用来从返回值中取数据的属性名
	  names: ['第1条数据','第2条数据','第3条数据',],
	  datas: []
	}
});

export function mapDataToOption(preOption, newData){
	return initMapDataToOption(preOption, newData, Object.assign({}, config))
}

export const getOption = (opt = {}) => getInitOption(Object.assign({}, option, opt))