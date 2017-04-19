import React from 'react'
import { Icon, Tabs, Rate, Pagination, Cascader, DatePicker, Switch, Slider, Carousel } from 'antd'
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;

const ShowBox = React.createClass({
  render(){
    return (
      <div style={{width: 300, border: '1px solid #eee', margin: '0 15px 15px 0', padding: 10, float:'left'}}>
        <p style={{color:'#0e77ca'}}>{this.props.title}</p>
        {this.props.children}
      </div>
    )
  }
})

// 级联数据
const cascaderOptions = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  goCtrPath(){
    this.context.router.push('/business/ctr'); //手动路由跳转
  },
  render() {
    return (
      <div style={{fontSize: '14px'}}>
        <p>我是首页，我还在开发当中
          <Icon style={{fontSize: '30px',color:'#3db8c1',marginLeft:'5px'}} type="tool" />...
        </p>
        <p>
          以下为antd的部分组件展示：
        </p>
        <ShowBox title='评分系统：'>
          <Rate allowHalf defaultValue={2.5} character="好" />
        </ShowBox>
        <ShowBox title='分页：'>
          <Pagination defaultCurrent={1} total={50} />
        </ShowBox>
        <ShowBox title='Switch开关：'>
          <Switch defaultChecked={true} />
        </ShowBox>
        <ShowBox title='Slider滑动条：'>
          <Slider range defaultValue={[20, 50]}/>
        </ShowBox>
        <ShowBox title='级联选择：'>
          <Cascader options={cascaderOptions} placeholder="请选择" />
        </ShowBox>
        <ShowBox title='日期选择：'>
          <RangePicker/>
        </ShowBox>
        <ShowBox title='走马灯：'>
          <Carousel autoplay>
            <div style={{height: '100', background:'#aaa'}}><h3>1</h3></div>
            <div style={{height: '100', background:'#bbb'}}><h3>2</h3></div>
            <div style={{height: '100', background:'#ccc'}}><h3>3</h3></div>
            <div style={{height: '100', background:'#ddd'}}><h3>4</h3></div>
          </Carousel>
        </ShowBox>
        <ShowBox title='tab切换：'>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1">我是第1块内容</TabPane>
            <TabPane tab="Tab 2" key="2">我是第2块内容</TabPane>
            <TabPane tab="Tab 3" key="3">我是第3块内容</TabPane>
          </Tabs>
        </ShowBox>
      </div>
    )
  }
})