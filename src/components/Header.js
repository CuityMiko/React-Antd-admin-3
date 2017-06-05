/*
** Header
** auth:whr
** time:2017.4.6
*/
import React from 'react'
import { Layout, Icon } from 'antd';
import { projectInfo } from '../models/config'
import PropTypes from 'prop-types'
const { Header } = Layout;

class Head extends React.Component{
  toUserInfo(){
    this.context.router.push('/user/about/mylog');
    // location.href = '/#/user/about/mylog';
  }
  render() {
    const { dispatchLogout }  = this.props;
    return (
    	<Header className="header">
    	  <div className="logo mt-15 fl">
          <img src={ projectInfo.logo } alt="logo" style={{verticalAlign: 'middle', marginRight: '15px', position: 'relative', top: '-2px'}} />
    	    { projectInfo.title }
    	  </div>
    	  <div className="user fr mt-15">
    	  	<span className="user-name" onClick={this.toUserInfo}>{ projectInfo.userName }</span>
    	    <div className="icon-logout ml-15" onClick={ dispatchLogout }>
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