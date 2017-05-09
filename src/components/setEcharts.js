/*
** setEcharts.js 
** auth:whr
** time:2017.3.23
*/

import { deepCopy } from '../common/utils.js'
import initEchartsConfig from '../models/initEchartsConfig';

function chartInit({title,subtext,axis},init = initEchartsConfig){//初始化图表
  let init_option = deepCopy(init,{});
  trueAndDo(title,() => init_option.title.text = title);
  trueAndDo(subtext,() => init_option.title.subtext = subtext);
  trueAndDo(axis,() => {
  	init_option.xAxis.name = axis[0];
  	init_option.yAxis.name = axis[1]
  });
  return init_option
}

function trueAndDo(test,doSomething){
  if(!!test){
    doSomething()
  }
}

function getChartOption(preState,data){ //根据新数据，重绘图表
	let option = preState.chartOption;
	option.xAxis.data = data.xAxisData;
	option.series = setSeries(data.series);
	option.legend.data = data.series.names;
	return {
		option
	}
}

function setSeries(series){
	let arr = [];
	let names = series.names;
	let datas = series.datas;
	let len = names.length;
	for(let i = 0; i<len; i++){
		arr.push({
			name: names[i],
			type: 'line',
			smooth:true, //折线是否平滑
			data: datas[i]
		})
	}
	return arr
}

function setSeriesData({initOption, v}){ //处理charts的渲染数据的函数，option_data必须为指定数据格式
	const props = initOption.series && initOption.series.props;
	if(!props){
		console.warn('setSeriesData方法参数错误！');
		return false;
	}
	const dataLen = props.length;
  initOption.xAxisData.push(v[initOption.xAxisProp.prop]);
  for(let i=0; i<dataLen; i++){
    initOption.series.datas[i].push(v[props[i]])
  }
}

export {
	chartInit,
	getChartOption,
	setSeriesData
}