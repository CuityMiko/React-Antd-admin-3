/*
** auth:whr
** time:2017.4.6
*/
import React from 'react'
import { Form, Select } from 'antd'
const { Item: FormItem} = Form;
const {Option} = Select;

export default React.createClass({
	handleChange(e){
		this.props.onChange(e);
	},
	render(){
		const {cindex, rankkey, form} = this.props;
		const { getFieldDecorator } = form;
		const key = `${cindex}级类目`;
		if(!this.props.isShow){
			return <i></i>
		}
		return (
			<FormItem
				key={key}
				label={key}
			>
				{getFieldDecorator('category' + cindex + 'Select')(
				  <Select
				    showSearch
				    style={{ width: 150 }}
				    notFoundContent={'空值'}
				    onChange={this.handleChange}
				  >
				    {
				    	this.props.category.map((v,i) => {
				    		return <Option key={`${key}${i}option`} value={`${rankkey}-${i}-${v.id}`}>{v.name}</Option>
				    	})
				    }
				  </Select>
				)}
			</FormItem>
		)
	}
})


