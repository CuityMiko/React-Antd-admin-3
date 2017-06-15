/*
** RangePicker.js 图表和表格JS
** auth:whr
** time:2017.3.23
*/
import React from 'react';
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker;
import { dateFormat } from '../../models/config'
import moment from 'moment' // for DatePicker 

export default class MyRangePicker extends React.Component{
  render(){
    const { data = [], onChange } = this.props;
    return (
      <RangePicker 
      	defaultValue={[moment(data[0], dateFormat), moment(data[1], dateFormat)]} 
				format={ dateFormat } 
				onChange={ onChange } 
			/>
    )
  }
}
