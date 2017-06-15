/*
** StepSelect.js  级联下拉框，最多支持3级级联
** auth:whr
** time:2017.3.23
** 使用该组件时，selectList、config、form 这3个属性是必须提供的
** 对应action格式为: { payload:{ ranks: { rank0, rank1, rank2 }} }
*/
import React from 'react'
import { Form } from 'antd'
const { Item } = Form;
import Select from '../Select'

export default class StepSelect extends React.Component{
  setRanksState(e, n){ //根据用户选择的类目，设置对应的rank
    if(!e)return;
    this.isChange = true;
    const { ranks, config, form } = this.props,
        { resetFields } = form,
        { list: selectList } = config,
        selectListLen = selectList.length;
    let obj = { ...ranks };
    obj['rank' + n] = e.split('-')[1];
    resetFields([selectList[selectListLen-1].id]);//重新渲染类目之前需要清除该类目的输入值
    if(selectListLen === 3){//共3级类目
      if(n === 0){ //根据不同类目选择框触发的事件，分别执行不同代码 0频道 1一级类目
        obj.rank2 = '0';
        obj.rank1 = '0';
        resetFields([selectList[1].id]);//重新渲染类目之前需要清除该类目的输入值
      }else if(n === 1) {
        obj.rank2 = '0';
      }
    }else if(selectListLen === 2){ //共2级类目
      if(n === 0){ //根据不同类目选择框触发的事件，分别执行不同代码 0频道 1一级类目
        obj.rank1 = '0';
      }
    }
    this.props.dispatchRanks(obj);
  }
  changeRanks(e, n){
    this.setRanksState(e, n);
    const { onChange } = this.props;
    onChange && onChange();
  }
  getNodesAndValue(data, { rank0, rank1, rank2 }, n = 0){ 
    let nodes = [];
    if(!data || !data.length){
      return {
        nodes,
        value: '',
        onChange(){}
      }
    }
    const { config } = this.props;
    const { arr, value } = config.dataProps;
    const changeRanks = this.changeRanks.bind(this);
    switch(n){
      case 1:
        nodes = data[rank0][arr];
        return {
          nodes,
          value: nodes[rank1][value],
          onChange(e){
            changeRanks(e, n)
          }
        }
      case 2:
        nodes = data[rank0][arr][rank1][arr];
        return {
          nodes,
          value: nodes[rank2][value],
          onChange(e){
            changeRanks(e, n)
          }
        }
      default:
        return {
          nodes: data,
          value: data[rank0][value],
          onChange(e){
            changeRanks(e, n)
          }
        }
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
  getSelectData(){
    const { ranks, config, selectList } = this.props;
    let _selectList = [];
    for(let [i,v] of config.list.entries()){
      const nodesAndValue = this.getNodesAndValue(selectList, ranks, i);
      _selectList.push({...v});
      _selectList[i].optionData = nodesAndValue.nodes;
      _selectList[i].onChange = nodesAndValue.onChange.bind(this);
      _selectList[i].initialValue = nodesAndValue.value;
    }
    return _selectList;
  }
  render(){
    const { form, config } = this.props;
    const { getFieldDecorator } = form;
    const { value, text } = config.dataProps;
    return (
      <span>
        {this.getSelectData().map((v,i) => 
          <Item  label={v.label} key={i}>
            <Select
              fieldDecorator={{
                getFieldDecorator,
                id: v.id,
                initialValue: v.initialValue
              }}
              onChange={ v.onChange }
              optionData={ v.optionData }
              propsName={{value, text}}
            />
          </Item>
        )}
      </span>
    )
  }
}
