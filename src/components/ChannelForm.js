/*
** auth:whr
** time:2017.4.6 
*/
import React from 'react'
import jsonp from 'jsonp'
import { connect } from 'react-redux'
import { Button, Form, Select, message, DatePicker } from 'antd'
import { channelFormAction } from '../actions'
import api from '../models/api'
import { dateFormat } from '../models/config'
import MyFormItem from './ChannelFormItem'
import moment from 'moment' // for DatePicker 
const { Item: FormItem} = Form;
const { RangePicker } = DatePicker;
const {Option} = Select;

class SearchFormCpt extends React.Component{
	constructor(){
		super();
		this.isChange = false; //判断选择框是否有改变，如果当前没有改变选择框，则不可重复 提交表单
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.setRanksState = this.setRanksState.bind(this);
		this.renderEachFormItem = this.renderEachFormItem.bind(this); 
		this.onChangePicker = this.onChangePicker.bind(this);
	}
	handleChange(e){
		this.setRanksState(e);
		this.isChange = true;
	}
	setRanksState(e){ //根据用户选择的类目，设置对应的rank
		if(!e)return;
		const values = e.split('-');
		values.pop();
		const index = values.length - 1,
				rank = values[0] || '0';
		let rank1 = '0', 
				rank2 = '0';
		this.props.form.resetFields(['nodes2Select']);//重新渲染类目之前需要清除该类目的输入值
		switch(index){ //根据不同类目选择框触发的事件，分别执行不同代码
			case 2:
				rank1 = values[1];
				rank2 = values[2];
				break;
			case 1: //1级类目触发的事件
				rank1 = values[1];
				break;
			default: //频道触发事件
				this.props.form.resetFields(['nodes1Select']);//重新渲染类目之前需要清除该类目的输入值
		}
		this.props.dispatchChangeRanks({rank, rank1, rank2});
	}
	handleSubmit(e){
		e.preventDefault();
		if(!this.isChange){ //如果当前没有改变选择框，则不可重复 提交表单
			message.warning('请更改"筛选项"后再进行搜索');
			return;
		}
		this.props.form.validateFields((err,values) => { //验证表单通过后的回调，第二个参数是当前表单的值
			if(err){
				console.warn(err);
				return false
			}
			this.props.onSubmit();
			this.isChange = false;
			console.log(values);
		})
	}
	onChangePicker(date, dateString){
		this.isChange = true;
		this.props.dispatchChangePicker(dateString);
	}
	renderEachFormItem(){
		let items = [];
		const { channelForm } = this.props,
				{ channelList, channelRanks } = channelForm,
				{rank, rank1, rank2} = channelRanks;
		if(!channelList.length)return items;
		const getCate1 = () => {
			const rank1Category = channelList[rank].nodes;
			if(!(rank1Category && rank1Category.length))return;
			items.push(<MyFormItem form={this.props.form} nodes={rank1Category} curIndex={rank1} rankkey={rank} cindex={1} onChangeItem={this.handleChange} key={'1cate'} />);
		}
		const getCate2 = () => {
			let rank2Category = rank1 && channelList[rank].nodes[rank1].nodes;
			if(!(rank2Category && rank2Category.length))return;
			let rank2_key = rank1 && rank + '-' + rank1;
			items.push(<MyFormItem form={this.props.form} nodes={rank2Category} curIndex={rank2} rankkey={rank2_key || '2not'} cindex={2} onChangeItem={this.handleChange} key={'2cate'} />)
		}
		getCate1();
		getCate2();
		return items;
	}
	componentDidMount(){
		const { channelForm } = this.props,
				{ channelList } = channelForm; 
		if(channelList.length){
			this.props.requestChannelList(channelList);
		}else{
			jsonp(api.channelListApi, {}, (err, data) => {
				if(!err){
					const list = (data && data.data && data.data.list) || [];
					this.props.requestChannelList(list);
				}
			})
		}
	}
	render(){
		const { getFieldDecorator } = this.props.form,
				{ channelForm } = this.props,
				{ channelList, channelPicker, channelRanks } = channelForm,
				{ rank } = channelRanks;
		return (
			<div>
				<Form layout='inline'>
					<FormItem label="日期">
						<RangePicker defaultValue={[moment(channelPicker[0], dateFormat), moment(channelPicker[1], dateFormat)]} 
							format={dateFormat} onChange={this.onChangePicker} />
					</FormItem>
				</Form>
				<Form className="mt-10" layout='inline' onSubmit={this.handleSubmit}>
					<FormItem  label="频道" >
						{getFieldDecorator('channelSelect', {
						  // rules: [{ required: true, message: '此项为必选' }],
						  initialValue: channelList.length ? `${rank}-${channelList[rank].code}` : ''
						})(
						  <Select showSearch style={{ width: 150 }} onChange={this.handleChange} >
						  	{
						  		channelList.map((v,i) => {
						  			return <Option key={v.code} value={`${i}-${v.code}`}>{v.name}</Option>
						  		})
						  	}
						  </Select>
						)}
					</FormItem>
					{ this.renderEachFormItem() }
					<FormItem>
						<Button type="primary" icon="search" htmlType="submit">搜索</Button>
					</FormItem>
					{this.props.children}
				</Form>
			</div>
		)
	}
}

function mapStateToProps(state, ownProps){ //负责输入逻辑
  return {
    channelForm: state.channelForm
  }
}
function mapDispatchToProps(dispatch){ //负责输出逻辑，即将用户对 UI 组件的操作映射成 Action,即发送action
  return {
    dispatchChangeRanks(ranks){
    	channelFormAction.payload.channelRanks = ranks;
    	dispatch(channelFormAction)
    },
    requestChannelList(list){
    	channelFormAction.payload.channelList = list;
    	dispatch(channelFormAction)
    },
    dispatchChangePicker(picker){
    	channelFormAction.payload.channelPicker = picker;
    	dispatch(channelFormAction)
    }
  }
}
const SearchForm = connect(mapStateToProps,mapDispatchToProps)(Form.create()(SearchFormCpt))

export default SearchForm

