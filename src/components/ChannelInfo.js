/*
** 
** auth:whr
** time:2017.3.23
*/

import React from 'react'
import { message } from 'antd'
import { mockChannelData } from '../mock'
import ReactEcharts from 'echarts-for-react'
import ChannelForm from './ChannelForm.js'
import Table from './Table'
import { chartInit, getChartOption } from './setEcharts'
import { config, getOption } from '../models/channelInfo-config'

export default React.createClass({
  getInitialState(){
    return {
      chartOption: chartInit(config),
      tableColumns: [],
      tableDataSource: []
    }
  },
  handleSubmit(){
    this.setChartOption()
  },
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

  },
  componentDidMount(){
    setTimeout(() => {
      this.setChartOption()
    },400)
  },
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
})


