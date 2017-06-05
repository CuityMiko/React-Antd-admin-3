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
import { config, getOption } from '../models/ctr-config'
import { chartInit, getChartOption, setSeriesData } from './setEcharts'
import jsonp from 'jsonp'

export default class CTR extends React.Component{
  constructor(){
    super();
    this.state = {
      chartOption: chartInit(config),
      tableColumns: [],
      tableDataSource: []
    }
  }
  setChartOption(){
    let that = this,
        initOption = getOption();
    const loading = message.loading('加载中...');
    jsonp(api.ctr, {}, function(err,data){
      if(!err){
        loading();
        if(data.error !== 0) return;
        data = data.data;
        data.forEach((v,ii) => {
          setSeriesData({initOption, v});
        })
        that.setState((preState,props) => {
          let chartOption = getChartOption(preState,initOption).option;
          return {
            chartOption: chartOption,
            tableColumns: initOption,
            tableDataSource: data
          }
        });
      }
    });
  }
  componentDidMount(){
    this.setChartOption();
  }
  addScale(_this){
    const columns = _this.columns,
        dataSource = _this.dataSource;
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
    dataSource.forEach((v,i) => {
      let total = v.total;
      for(let p in v){
        if(/pass/i.test(p)){
          v[p+'Scale'] = setScale(v[p]/total)
        }
      }
    })
    function setScale(val) {
      return (val*100).toFixed(0) + '%';
    }
  }
  render(){
    return (
      <div>
        <ReactEcharts option={this.state.chartOption}  notMerge={true} lazyUpdate={true} theme={"theme_name"} />
        <Table willMount={this.addScale} columns={this.state.tableColumns} dataSource={this.state.tableDataSource} />
      </div>
    )
  }
}
