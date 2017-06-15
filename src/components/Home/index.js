import React from 'react'
import PropTypes from 'prop-types'
import CoolEcharts from './CoolEcharts'

const aStyle = {
  fontSize:'16px',
  color:'#3db8c1',
  cursor:'pointer'
}

class Home extends React.Component{
  goCtrPath(){
    // this.context.router.push('/business/ctr'); //手动路由跳转
    location.href = '/#/business/ctr';
  }
  goChannelPath(){
    // this.context.router.push('/business/channel'); //手动路由跳转
    location.href = '/#/business/channel';
  }
  render() {
    return (
      <div style={{fontSize: '14px'}}>
        <p>查看&nbsp;<span onClick={this.goCtrPath} style={ aStyle }>高CTR数据统计</span>，请点击左侧菜单 业务监控 --> 高CTR</p>
        <p>查看&nbsp;<span onClick={this.goChannelPath} style={ aStyle }>频道/类目内容条数</span>，请点击左侧菜单 业务监控 --> 频道/类目内容</p>
        <br/><br/>
        <CoolEcharts />
      </div>
    )
  }
}

Home.contextTypes = {
  router: PropTypes.object.isRequired
}
 export default Home