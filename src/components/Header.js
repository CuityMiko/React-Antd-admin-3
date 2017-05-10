/*
** Header
** auth:whr
** time:2017.4.6
*/
import React from 'react'
import { Layout, Icon } from 'antd';
const { Header } = Layout;

export default React.createClass({
  toUserInfo(){
    location.href = '/user/about/mylog';
    // location.href = '/#/user/about/mylog';
  },
  render() {
    return (
    	<Header className="header">
    	  <div className="logo mt-15 fl">
    	    数据展示平台
    	  </div>
    	  <div className="user fr mt-15">
    	  	<span className="user-name" onClick={this.toUserInfo}>wanghairong</span>
    	    <div className="icon-logout ml-15">
    	    	<Icon type="logout" style={{color:'#fff',fontSize:'22px'}}/>
    	    </div>
    	  </div>
    	</Header>
    )
  }
})
