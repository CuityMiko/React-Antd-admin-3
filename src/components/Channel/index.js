/*
** ChannelInfo.js 包含图表和表格子组件的频道/类目内容组件
** auth:whr
** time:2017.3.23
*/
import React from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import jsonp from 'jsonp'
import Echarts from '../Echarts'
import api from '../../models/api'
import ChannelForm from './Form'
import Table from '../Table'
import { config, getOption, mapDataToOption } from '../../models/channelInfo-config'
import { getTableColumns } from '../setEcharts'

class ChannelInfo extends React.Component{
  constructor(){
    super();
    this.state = {
      chartOption: getOption(),
      columns: getTableColumns(config),
      dataSource: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setRenderData = this.setRenderData.bind(this);
    this.getParmes = this.getParmes.bind(this);
  }
  handleSubmit(){// values为 提交所选频道、分类表单的值
    this.setRenderData();
  }
  getParmes(){
    const { channelForm } = this.props,
        { channelPicker, ranks, channelList } = channelForm,
        { rank0, rank1, rank2 } = ranks,
        channelid = channelList[rank0].code || '',
        categoryid = channelList[rank0].nodes[rank1].nodes[rank2].code || '';
    return `?channelid=${channelid.split('-')[0]}&category=${categoryid.split('-')[0]}&start_date=${channelPicker[0] || ''}&end_date=${channelPicker[1] || ''}`
  }
  setRenderData(){
    this.isFirstRequest = false;
    let unloading = message.loading('加载中...');
    jsonp(api.requestChannelinfoDataApi + this.getParmes(), {}, (err,data) => {
      if(data.code !== 0)return;
      data = data && data.data && data.data.list;
      if(!data || !data.length)return;
      this.setState((preState) => {
        const chartOption = mapDataToOption(preState.chartOption, data);
        return {
          chartOption,
          dataSource: data
        }
      })
      unloading();
    })
  }
  defaultFirstRequest(){
    const { channelForm } = this.props,
        { channelList } = channelForm;
    if(channelList.length && this.isFirstRequest !== false){
      this.setRenderData();
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
      <ChannelForm onSubmit={this.handleSubmit}>
        <div style={{marginTop:30}}>
          <Echarts option={this.state.chartOption} />
          <Table columns={this.state.columns} dataSource={this.state.dataSource} />
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
