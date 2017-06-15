/*
** auth:whr
** time:2017.4.6 
*/
import React from 'react'
import jsonp from 'jsonp'
import { connect } from 'react-redux'
import { Button, Form, message } from 'antd'
const { Item } = Form;
import { channelFormAction } from '../../actions'
import api from '../../models/api'
import StepSelect from '../../containers/StepSelect'
import RangePicker from '../RangePicker'
import channelSelectConfig from '../../models/channelSelect-config'

class SearchFormCpt extends React.Component{
	constructor(){
		super();
		this.isChange = false; //判断选择框是否有改变，如果当前没有改变选择框，则不可重复 提交表单
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChangePicker = this.onChangePicker.bind(this);
		this.selectOnChange = this.selectOnChange.bind(this);
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

	componentDidMount(){
		const { channelForm } = this.props,
				{ channelList } = channelForm; 
		if(channelList.length){
			this.props.requestChannelList(channelList);
		}else{
			jsonp(api.channelListApi, {}, (err, data) => {
				if(!err){
					const list = (data && data.data && data.data.list) || [];
					this.props.requestChannelList(this.forOptionAddIndex(list));
				}
			})
		}
	}
	forOptionAddIndex(data){
		for(let [i, v] of data.entries()){
			v.code = `${v.code}-${i}`;
			if(v.nodes && v.nodes.length){
				this.forOptionAddIndex(v.nodes)
			}
		}
		return data;
	}
	selectOnChange(){
		this.isChange = true;
	}
	getPickerData(){
		const { channelPicker } = this.props.channelForm;
		return [channelPicker[0], channelPicker[1]]
	}
	render(){
		const { form, channelForm } = this.props;
		const { channelList } = channelForm;
		return (
			<div>
				<Form layout='inline'>
					<Item label="日期">
						<RangePicker data={ this.getPickerData() } onChange={ this.onChangePicker } />
					</Item>
				</Form>
				<Form className="mt-10" layout='inline' onSubmit={ this.handleSubmit }>
					<StepSelect selectList={ channelList } config={ channelSelectConfig } form={ form } onChange={ this.selectOnChange }/>
					<Item>
						<Button type="primary" icon="search" htmlType="submit">搜索</Button>
					</Item>
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

