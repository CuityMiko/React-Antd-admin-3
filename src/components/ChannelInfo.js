/*
** 
** auth:whr
** time:2017.3.23
*/
import React from 'react'
import Mock from 'mockjs'
import { message } from 'antd'
import ReactEcharts from 'echarts-for-react'
import ChannelForm from './ChannelForm.js'
import Table from './Table'
import { chartInit, getChartOption } from './setEcharts'
import { config, getOption } from '../models/channelInfo-config'

export default class ChannelInfo extends React.Component{
  constructor(){
    super();
    this.state = {
      chartOption: chartInit(config),
      tableColumns: [],
      tableDataSource: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setChartOption = this.setChartOption.bind(this)
  }
  handleSubmit(){
    this.setChartOption()
  }
  setChartOption(){
    const loading = message.loading('加载中...');
    let that = this;
    let initOption = getOption();
    const props = initOption.series.props;
    const dataLen = props.length;

    setTimeout(() => {  // 模拟ajax数据
      const mockData = Mock.mock({
        "error": 0,
        "msg": "",
        "data|11-22": [
          {
            "time": /2017-((0[1-9])|(1[012]))-((0[1-9])|([12]\d)|(3[01]))/,
            "total|400-1000": 800,
            "newadd|200-400": 300,
          }
        ]
      });
      if(mockData.error !== 0)return;
      let data = mockData.data;
      data.forEach((v,ii) => {
        initOption.xAxisData.push(v.time);
        for(let i=0; i<dataLen; i++){
          initOption.series.datas[i].push(v[props[i]])
        }
      })
      that.setState((preState,props) => {
        return {
          chartOption: getChartOption(preState,initOption).option,
          tableColumns: initOption,
          tableDataSource: data
        }
      })
      loading();
    },300)
  }
  componentDidMount(){
    setTimeout(() => {
      this.setChartOption()
    },400)
  }
  render(){
    return (
      <ChannelForm option={this.state.chartOption} onSubmit={this.handleSubmit}>
        <div style={{marginTop:30}}>
          <ReactEcharts
            option={this.state.chartOption} 
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
          />
          <Table columns={this.state.tableColumns} dataSource={this.state.tableDataSource} />
        </div>
      </ChannelForm>    )
  }
}


