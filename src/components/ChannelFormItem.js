/*
** auth:whr
** time:2017.4.6
*/
import React from 'react'
import { Form, Select } from 'antd'
const { Item: FormItem} = Form;
const {Option} = Select;

export default class ChannelFormItem extends React.Component{
	constructor(){
		super();
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(e){
		this.props.onChangeItem(e);
	}
	render(){
		const {cindex, rankkey, form} = this.props,
				{ getFieldDecorator } = form,
				key = `${cindex}级类目`,
				nodes = this.props.nodes;
		return (
			<FormItem key={key} label={key} >
				{getFieldDecorator('nodes' + cindex + 'Select', {
					// rules: [{ required: true, message: '此项为必选' }],
					initialValue: nodes.length ? `${rankkey}-0-${nodes[0].code}` : ''
				})(
				  <Select showSearch style={{ width: 150 }} notFoundContent={'空值'} onChange={this.handleChange} >
				    {
				    	nodes.map((v,i) => {
				    		return <Option key={`${key}${i}option`} value={`${rankkey}-${i}-${v.code}`}>{v.name}</Option>
				    	})
				    }
				  </Select>
				)}
			</FormItem>
		)
	}
}


