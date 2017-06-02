/*
** ctr-config 高ctr数据量统计-配置项
** ！！数据格式的更改必须要综合考虑每个使用此数据格式的组件，并做修改
** auth:whr
** time:2017.4.24
*/
import { deepCopy } from '../common/utils'

export const config = { //图表配置项，不配置则不显示
  title:'高CTR数据量统计',
  subtext:'不同时间段，不同长度的标题数量',
  axis: ['时间','数量']
}

const option = {
	xAxisProp: {
		prop: 'time', //后端返回数据中，x轴数据的属性名
		name: config.axis[0]
	}, 
	xAxisData: [],
	series: {
	  props: ['total','pass30','pass25','pass22'], //不是用来渲染echarts用的数据，而是用来从返回值中取数据的属性名
	  names: ['内容总量','标题数超30','标题数超25','标题数超22'],
	  datas: []
	}
};
for(let i=0; i<option.series.props.length; i++){ //为option的series.datas 增加跟props相应数量的空数组
  option.series.datas.push([])
}
export const getOption = (opt = {}) => deepCopy(option,opt)
