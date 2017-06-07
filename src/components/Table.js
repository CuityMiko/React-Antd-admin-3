/*
** EchartsAndTable.js 图表和表格JS
** auth:whr
** 实现图表和表格的类，实例化后即渲染基础框架，通过showData方法传入数据后渲染
** time:2017.3.23
*/
import React from 'react';
import { Table } from 'antd';

export default class Tabler extends React.Component{
  addPropKey(data){
    if(!this.signNum)this.signNum = 1;
    for(let v of data){
      v.key = ++this.signNum
    }
    return data
  }
  render(){
    this.loading = true;
    let { columns, dataSource, willMount } = this.props;
    if(dataSource && dataSource.length){
      if(!dataSource[0].key){
        this.addPropKey(dataSource)
      }
      this.loading = false;
      if(willMount){
        willMount({ columns, dataSource });//自定义的渲染前的生命周期钩子
      }
    }
    return (
      <div>
        <Table className="clearfix" columns={columns || []} dataSource={dataSource || []} loading={this.loading} />
      </div>
    )
  }
}
