/*
** Table.js 图表和表格JS
** auth:whr
** 通过 columns, dataSource 属性注入数据来渲染此组件
** time:2017.3.23
*/
import React from 'react'
import { Table } from 'antd'
import './index.less'

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
    let { columns, dataSource } = this.props;
    if(dataSource && dataSource.length){
      if(!dataSource[0].key)this.addPropKey(dataSource);
      this.loading = false;
    }
    return (
      <Table className="clearfix" columns={columns || []} dataSource={dataSource || []} loading={this.loading} />
    )
  }
}
