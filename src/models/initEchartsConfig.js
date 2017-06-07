/*
** 初始化echarts的数据
** auth:whr
** time:2017.4.6
*/
import { deepCopy } from '../common/utils'
const initOption = { 
    title: {
      left:'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend:{
      right: 10,
      orient: 'vertical'
    },
    yAxis: {},
    xAxis: {
        data: [] 
    },
    grid:{
      left:80,
      right:100
    },
    series:[]
};

function fillDataSite(option = {series: {props: [], datas: []}}){ //为config的series.datas 增加跟props相应数量的空数组
  for(let i=0; i<option.series.props.length; i++){ 
    option.series.datas.push([])
  }
  return option
}

const getInitOption = ({ title = '', subtext = '', axis = [] }) => {//initOption是本模块里的局部变量
  let _initOption = Object.assign({}, initOption);
  _initOption.title.text = title;
  _initOption.title.subtext = subtext;
  _initOption.xAxis.name = axis[0];
  _initOption.yAxis.name = axis[1];
  return _initOption
}

//第一个参数为preOption，第二个参数为 新data(数据格式参看echarts-config里的config对象)
function mapDataToOption(preOption = {}, newData = [], config = {}){ 
  let option = deepCopy(preOption);
  let newConfig = mapDataToConfig(newData, clearConfigData(config))
  const { xAxisData, series } = newConfig;
  option.xAxis.data = xAxisData;
  option.series = setSeries(series);
  option.legend.data = series.names;
  return option
}
function clearConfigData(config){ //清空之前数据
  config.xAxisData.length = 0; 
  for(let v of config.series.datas){
    v.length = 0;
  }
  return config
}

function mapDataToConfig(newData, config){
  let newConfig = Object.assign({}, config),
      { xAxisData, series, xAxisProp } = newConfig;
  const { props } = series,
        xprop = xAxisProp.prop,
        len = props.length;
  for (let v of newData){
    xAxisData.push(v[xprop]);
    for(let i=0; i<len; i++){
      series.datas[i].push(v[props[i]])
    }
  }
  return newConfig
}

function setSeries(series){
  let arr = [];
  let names = series.names;
  let datas = series.datas;
  for(let i in names){
    arr.push({
      name: names[i],
      type: 'line',
      smooth:true, //折线是否平滑
      data: datas[i]
    })
  }
  return arr
}



export{
  mapDataToOption,
  getInitOption,
  fillDataSite,
}