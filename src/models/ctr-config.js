/*
** ctr-config 高ctr数据量统计-配置项
** ！！数据格式的更改必须要综合考虑每个使用此数据格式的组件，并做修改
** auth:whr
** time:2017.4.24
*/
import { fillDataSite, getInitOption, mapDataToOption as initMapDataToOption } from './initEchartsConfig'

const option = { //图表配置项，不配置则不显示
  title:'高CTR数据量统计',
  subtext:'不同时间段，不同长度的标题数量',
  axis: ['时间','数量']
}

export const config = fillDataSite({
	xAxisProp: {
		prop: 'time', //后端返回数据中，x轴数据的属性名
		name: option.axis[0]
	}, 
	xAxisData: [],
	series: {
	  props: ['total','pass30','pass25','pass22'], //不是用来渲染echarts用的数据，而是用来从返回值中取数据的属性名
	  names: ['内容总量','标题数超30','标题数超25','标题数超22'],
	  datas: []
	}
});

export function mapDataToOption(preOption, newData){
	return initMapDataToOption(preOption, newData, Object.assign({}, config))
}

export const getOption = (opt = {}) => getInitOption(Object.assign({}, option, opt))

