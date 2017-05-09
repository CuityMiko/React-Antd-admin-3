/*
** Header
** auth:whr
** time:2017.4.6
*/
import React from 'react'
import { Layout, Icon } from 'antd';
import PropTypes from 'prop-types'
const { Header } = Layout;

class Head extends React.Component{
  toUserInfo(){
    this.context.router.push('/user/about/mylog');
    // location.href = '/#/user/about/mylog';
  }
  render() {
    const { onLogout }  = this.props;
    return (
    	<Header className="header">
    	  <div className="logo mt-15 fl">
    	    数据展示平台
    	  </div>
    	  <div className="user fr mt-15">
    	  	<span className="user-name" onClick={this.toUserInfo}>wanghairong</span>
    	    <div className="icon-logout ml-15" onClick={onLogout}>
    	    	<Icon type="logout" style={{color:'#fff',fontSize:'22px'}}/>
    	    </div>
    	  </div>
    	</Header>
    )
  }
}

Head.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Head