/*
** ChannelInfo.js 包含图表和表格子组件的频道/类目内容组件
** auth:whr
** time:2017.3.23
*/
import React from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import jsonp from 'jsonp'
import ReactEcharts from 'echarts-for-react'
import api from '../models/api'
import ChannelForm from './ChannelForm.js'
import Table from './Table'
import { chartInit, getChartOption } from './setEcharts'
import { config, getOption } from '../models/channelInfo-config'

class ChannelInfo extends React.Component{
  constructor(){
    super();
    this.state = {
      chartOption: chartInit(config),
      tableColumns: [],
      tableDataSource: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setChartOption = this.setChartOption.bind(this);
    this.getParmes = this.getParmes.bind(this);
  }
  handleSubmit(){// values为 提交所选频道、分类表单的值
    this.setChartOption();
  }
  getParmes(){
    const { channelForm } = this.props,
        { channelPicker, channelRanks, channelList } = channelForm,
        { rank, rank1, rank2 } = channelRanks,
        channelid = channelList[rank].code || '',
        categoryid = channelList[rank].nodes[rank1].nodes[rank2].code || '';
    return `?channelid=${channelid}&category=${categoryid}&start_date=${channelPicker[0] || ''}&end_date=${channelPicker[1] || ''}`
  }
  setChartOption(){
    this.isFirstRequest = false;
    let that = this,
        unloading = message.loading('加载中...'),
        initOption = getOption();
    const props = initOption.series.props,
        dataLen = props.length;
    jsonp(api.requestChannelinfoDataApi + this.getParmes(), {}, (err,data) => {
      if(data.code !== 0)return;
      data = data.data;
      data = data.list;
      data.forEach((v,ii) => {
        initOption.xAxisData.push(v.date);
        for(let i=0; i<dataLen; i++){
          initOption.series.datas[i].push(v[props[i]])
        }
      })
      that.setState((preState) => {
        return {
          chartOption: getChartOption(preState,initOption).option,
          tableColumns: initOption,
          tableDataSource: data
        }
      })
      unloading();
    })
  }
  defaultFirstRequest(){
    const { channelForm } = this.props,
        { channelList } = channelForm;
    if(channelList.length && this.isFirstRequest !== false){
      this.setChartOption();
      return true
    }
  }
  componentDidMount(){
    let i = 0;
    let isFirstRequest = setInterval(() => {
      i++;
      if(this.defaultFirstRequest() || i > 10){
        clearInterval(isFirstRequest)
      }
    }, 200)
  }
  render(){
    return (
      <ChannelForm option={this.state.chartOption} onSubmit={this.handleSubmit}>
        <div style={{marginTop:30}}>
          <ReactEcharts option={this.state.chartOption}  notMerge={true} lazyUpdate={true} />
          <Table columns={this.state.tableColumns} dataSource={this.state.tableDataSource} />
        </div>
      </ChannelForm>    
    )
  }
}

function mapStateToProps(state){
  return {
    channelForm: state.channelForm
  }
}
export default connect(mapStateToProps)(ChannelInfo)