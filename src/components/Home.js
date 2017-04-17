import React from 'react'
import { Icon } from 'antd'

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
        <p>我是首页，目前没有内容，我还在开发当中
          <Icon style={{fontSize: '30px',color:'#3db8c1',marginLeft:'5px'}} type="tool" />...
        </p>
      </div>
    )
  }
})