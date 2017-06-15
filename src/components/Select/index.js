/*
** Select.js
** auth:whr
** time:2017.3.23
*/
import React from 'react';
import { Select } from 'antd'
const {Option} = Select;

export default class Selecter extends React.Component{
  render(){
    const { fieldDecorator, optionData = [], propsName = {}, onChange, width = 150 } = this.props;
    const { id, getFieldDecorator, initialValue = '', rules = {}} = fieldDecorator;
    const { value, text } = propsName;
    return (
      <div>
        {getFieldDecorator(id, {
          rules,
          initialValue
        })(
          <Select style={{ width: width }} onChange={ onChange } >
            {
              optionData.map((v,i) => {
                return <Option key={ v[value] } value={ v[value] }>{ v[text] }</Option>
              })
            }
          </Select>
        )}
      </div>
      
    )
  }
}
