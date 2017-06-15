/*
** Echarts.js 图表和表格JS
** auth:whr
** 通过 option 属性注入数据来渲染此组件
** time:2017.3.23
*/
import React from 'react';
import ReactEcharts from 'echarts-for-react'

export default class Echarts extends React.Component{
  render(){
    const { option } = this.props;
    return (
      <ReactEcharts option={option}  notMerge={true} lazyUpdate={true} theme={"theme_name"} />
    )
  }
}
