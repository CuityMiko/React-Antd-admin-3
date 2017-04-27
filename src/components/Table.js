/*
** EchartsAndTable.js 图表和表格JS
** auth:whr
** 实现图表和表格的类，实例化后即渲染基础框架，通过showData方法传入数据后渲染
** time:2017.3.23
*/
import React from 'react';
import { Table } from 'antd';

export default React.createClass({
  getTableColumns({xAxisProp,series}){
    if(this.columns){
      return;
    }
    const {name: xName, prop: xProp} = xAxisProp;
    const {names: yNames, props: yProps} = series;
    const columns = [];
    columns.push({
      title: xName,
      dataIndex: xProp,
      key: xProp
    })
    yProps.forEach((v,i) => {
      columns.push({
        title: yNames[i],
        dataIndex: v,
        key: v
      })
    })
    this.columns = columns;
  },
  getTableDataSource(dataSource){
    if(!this.keyNum)this.keyNum = 1;
    for(let v of dataSource){
      v.key = ++this.keyNum
    }
    this.dataSource = dataSource;
  },
  firstLoad: true,
  componentDidMount(){
    this.firstLoad = false;    
  },
  render(){
    this.loading = true;
    const { columns, dataSource, willMount } = this.props;
    if(dataSource && dataSource.length){
      this.loading = false;
      this.getTableColumns(columns); //此处x、y相对的是echart图表的x/y轴
      this.getTableDataSource(dataSource);
      if(this.firstLoad && willMount)willMount(this);//自定义的渲染前的生命周期钩子
    }
    return (
      <div>
        <Table className="clearfix" columns={this.columns || []} dataSource={this.dataSource || []} loading={this.loading} />
      </div>
    )
  }
});
