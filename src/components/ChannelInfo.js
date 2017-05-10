/*
** ChannelInfo.js 包含图表和表格子组件的频道/类目内容组件
** auth:whr
** time:2017.3.23
*/
import React from 'react'
import { message } from 'antd'
import ReactEcharts from 'echarts-for-react'
import { mockChannelData } from '../mock'
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
      let data = mockChannelData();
      if(data.error !== 0)return;
      data = data.data;
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


