import React from 'react'
import { Icon } from 'antd'

export default React.createClass({
  contextTypes: { //只要没有在 contextTypes 中声明的属性一律不准加入 context
    router: React.PropTypes.object.isRequired
  },
  goCtrPath(){
    // this.context.router.push('/business/ctr'); //手动路由跳转
    location.href = '/#/business/ctr';
  },
  goChannelPath(){
    // this.context.router.push('/business/channel'); //手动路由跳转
    location.href = '/#/business/channel';
  },
  render() {
    console.log(this.context);
    console.log(this.props);
    return (
      <div style={{fontSize: '14px'}}>
        <p>我是首页，目前没有内容，我还在开发当中<Icon style={{fontSize: '30px',color:'#3db8c1',marginLeft:'5px'}} type="tool" />...</p>
        <br />
        <p>查看&nbsp;<span onClick={this.goCtrPath} style={{fontSize:'16px',color:'#3db8c1',cursor:'pointer'}}>高CTR数据统计</span>，请点击左侧菜单 业务监控 --> 高CTR</p>
        <p>查看&nbsp;<span onClick={this.goChannelPath} style={{fontSize:'16px',color:'#3db8c1',cursor:'pointer'}}>频道/类目内容条数</span>，请点击左侧菜单 业务监控 --> 频道/类目内容</p>
      </div>
    )
  }
})
