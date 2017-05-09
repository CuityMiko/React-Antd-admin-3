/*
** auth:whr
** time:2017.4.6
*/
import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Select, message } from 'antd'
import { channelListAction } from '../actions'
import MyFormItem from './ChannelFormItem'
const { Item: FormItem} = Form;
const {Option} = Select;

const channelList = [
	{
		name: "直播",
		id: "000100",
		categories: [
			{
				name: "新闻",
				id: "000110",
				categories: [
					{
						name: "国内",
						id: "000111",
						categories: [
							{
								name: "大咖云集",
								id: "000113",
							},
							{
								name: "菜鸟靠边",
								id: "000114",
							}
						]
					},
					{
						name: "国外",
						id: "040111",
						categories: [
							{
								name: "叙利亚难民",
								id: "040113",
							},
							{
								name: "委内瑞拉",
								id: "040114",
							}
						]
					}
				]
			},
			{
				name: "足球",
				id: "000120",
				categories: [
					{
						name: "英超",
						id: "000121",
						categories: [
							{
								name: "鲁尼",
								id: "000115",
							},
							{
								name: "苏亚雷斯",
								id: "000116",
							},
							{
								name: "范佩西",
								id: "000117",
							}
						]
					},
					{
						name: "世界杯",
						id: "050121",
						categories: [
							{
								name: "C罗",
								id: "050115",
							}
						]
					}
				]
			}
		]
	},
	{
		name: "点播",
		id: "100100",
		categories: [
			{
				name: "娱乐",
				id: "100110",
				categories: [
					{
						name: "国内",
						id: "100111",
						categories: [
							{
								name: "跑男",
								id: "100119",
							},
							{
								name: "钢七连",
								id: "100129",
							}
						]
					},
					{
						name: "国外",
						id: "120111",
						categories: [
							{
								name: "run man",
								id: "120119",
							},
							{
								name: "埃塞俄比亚",
								id: "120129",
							}
						]
					}
				]
			},
			{
				name: "财经",
				id: "130110",
				categories: [
					{
						name: "国内",
						id: "130111",
						categories: [
							{
								name: "股票",
								id: "130119",
							},
							{
								name: "基金",
								id: "130129",
							}
						]
					}
				]
			},
		]
	}
];

class SearchFormCpt extends React.Component{
	constructor(){
		super();
		this._index = 1; //标记 几级类目,1表示1级类目
		this.isChange = false; //判断选择框是否有改变，如果当前没有改变选择框，则不可重复 提交表单
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.setRanksState = this.setRanksState.bind(this);
		this.renderEachFormItem = this.renderEachFormItem.bind(this);
	}
	handleChange(e){
		console.log(e);
		this.setRanksState(e);
		this.isChange = true;
	}
	setRanksState(e){ //根据用户选择的类目，设置对应的state
		if(!e)return;
		const values = e.split('-');
		values.pop();
		const index = values.length - 1;
		this._index = index;
		if(index === 3)return;//3级类目触发的事件
		const rank = values[0] || '0';
		let rank1 = null,rank2 = null;
		this.props.form.resetFields(['category3Select']);//重新渲染类目之前需要清除该类目的输入值
		switch(index){ //根据不同类目选择框触发的事件，分别执行不同代码
			case 2: //2级类目触发的事件
				rank1 = values[1];
				rank2 = values[2];
				break;
			case 1: //1级类目触发的事件
				rank1 = values[1];
				this.props.form.resetFields(['category2Select']);//重新渲染类目之前需要清除该类目的输入值
				break;
			default: //频道触发事件
				this.props.form.resetFields(['category1Select']);//重新渲染类目之前需要清除该类目的输入值
				this.props.form.resetFields(['category21Select']);//重新渲染类目之前需要清除该类目的输入值
		}
		this.props.onChangeList({
			rank,
			rank1,
			rank2
		});
	}
	handleSubmit(e){
		e.preventDefault();
		if(!this.isChange){ //如果当前没有改变选择框，则不可重复 提交表单
			message.warning('请更改"类目"后再提交表单');
			return;
		}
		this.props.form.validateFields((err,values) => {
			if(err){
				console.warn(err);
			}else{
				console.log(values);
				this.props.onSubmit();
				this.isChange = false;
			}
		})
	}
	renderEachFormItem(){
		const index = this._index;
		let items = [];
		const {rank, rank1, rank2} = this.props.channelState;
		const getCate1 = () => {
			const rank1Category = channelList[rank].categories;
			if(!(rank1Category && rank1Category.length))return;
			items.push(<MyFormItem form={this.props.form} category={rank1Category} rankkey={rank} cindex={1} onChange={this.handleChange} key={'1cate'} />);
		}
		const getCate2 = () => {
			let rank2Category = rank1 && channelList[rank].categories[rank1].categories;
			if(!(rank2Category && rank2Category.length))return;
			let rank2_key = rank1 && rank + '-' + rank1;
			items.push(<MyFormItem form={this.props.form} category={rank2Category} rankkey={rank2_key || '2not'} cindex={2} onChange={this.handleChange} key={'2cate'} />)
		}
		const getCate3 = () => {
			let rank3Category = rank1 && rank2 && channelList[rank].categories[rank1].categories[rank2].categories;
			if(!(rank3Category && rank3Category.length))return;
			let rank3_key = rank1 && rank2 && rank + '-' + rank1 + '-' + rank2;
			items.push(<MyFormItem form={this.props.form} category={rank3Category} rankkey={rank3_key || '3not'} cindex={3} onChange={this.handleChange} key={'3cate'} />)
		}
		getCate1();
		if(index === 1){ //根据不同类目选择框触发的事件，分别执行不同代码
			getCate2();
		}else if(index === 2 || index === 3){
			getCate2();
			getCate3();
		}
		return items;
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<Form layout='inline' onSubmit={this.handleSubmit}>
				<FormItem
					label="频道"
				>
					{getFieldDecorator('channelSelect', {
					  rules: [{ required: true, message: '此项为必选' }],
					  initialValue: '0-000100'
					})(
					  <Select
					    showSearch
					    style={{ width: 150 }}
					    onChange={this.handleChange}
					  >
					  	{
					  		channelList.map((v,i) => {
					  			return <Option key={v.id} value={`${i}-${v.id}`}>{v.name}</Option>
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
		)
	}
}

function mapStateToProps(state, ownProps){ //负责输入逻辑
  return {
    channelState: state.channelState || channelListAction.payload
  }
}
function mapDispatchToProps(dispatch){ //负责输出逻辑，即将用户对 UI 组件的操作映射成 Action,即发送action
  return {
    onChangeList(doAction){
    	channelListAction.payload = doAction;
    	dispatch(channelListAction)
    }
  }
}
const SearchForm = connect(mapStateToProps,mapDispatchToProps)(Form.create()(SearchFormCpt))

export default SearchForm

