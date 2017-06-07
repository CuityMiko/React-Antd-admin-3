/*
** EchartsAndTable.js 图表和表格JS
** auth:whr
** 实现图表和表格的类，实例化后即渲染基础框架，通过showData方法传入数据后渲染
** time:2017.3.23
*/
import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { message } from 'antd'
import Table from './Table'
import api from '../models/api'
import { config, getOption, mapDataToOption } from '../models/ctr-config'
import { getTableColumns } from './setEcharts'
import jsonp from 'jsonp'

export default class CTR extends React.Component{
  constructor(){
    super();
    this.state = {
      chartOption: getOption(),
      columns: getTableColumns(config),
      dataSource: []
    }
  }
  setChartOption(){
    const loading = message.loading('加载中...');
    jsonp(api.ctr, {}, (err,data) => {
      if(!err){
        loading();
        if(data.error !== 0) return;
        data = data.data;
        this.setState((preState,props) => {
          let chartOption = mapDataToOption(preState.chartOption, data);
          return {
            chartOption,
            dataSource: data
          }
        });
      }
    });
  }
  componentDidMount(){
    this.setChartOption();
  }
  addScale({ columns, dataSource }){
    let len = columns.length-1;
    for(let i=len; i>1; i--){
      let key = columns[i].key + 'Scale',
          title = columns[i].title + '占比';
      columns.splice(i+1,0,{
        dataIndex: key,
        key,
        title
      })
    }
    for(let v of dataSource){
      let total = v.total;
      for(let p in v){
        if(/pass/i.test(p)){
          v[p+'Scale'] = setScale(v[p]/total)
        }
      }
    }
    function setScale(val) {
      return (val*100).toFixed(0) + '%';
    }
  }
  render(){
    return (
      <div>
        <ReactEcharts option={this.state.chartOption}  notMerge={true} lazyUpdate={true} theme={"theme_name"} />
        <Table willMount={this.addScale} columns={this.state.columns} dataSource={this.state.dataSource} />
      </div>
    )
  }
}
