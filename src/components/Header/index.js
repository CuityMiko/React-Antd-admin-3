/*
** Header
** auth:whr
** time:2017.4.6
*/
import React from 'react'
import { Layout, Icon } from 'antd';
import { projectInfo } from '../../models/config'
import PropTypes from 'prop-types'
import { loginAction } from '../../actions'
import './index.less'
const { Header } = Layout;

class Head extends React.Component{
  toUserInfo(){
    // this.context.router.push('/user/about/mylog');
    location.href = '/#/user/about/mylog';
  }
  dispatchLogout(){
    const { store } = this.context;
    localStorage.setItem('login','out');
    loginAction.payload = 'out';
    store.dispatch(loginAction);
  }
  render() {
    return (
    	<Header className="header">
    	  <div className="logo mt-15 fl">
          <img src={ projectInfo.logo } alt="logo" />
    	    { projectInfo.title }
    	  </div>
    	  <div className="user fr mt-15">
    	  	<span className="user-name" onClick={this.toUserInfo}>{ projectInfo.userName }</span>
    	    <div className="icon-logout ml-15" onClick={ this.dispatchLogout }>
    	    	<Icon type="logout" style={{color:'#fff',fontSize:'22px'}}/>
    	    </div>
    	  </div>
    	</Header>
    )
  }
}

Head.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object
}

export default Head