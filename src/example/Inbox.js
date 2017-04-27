import React from 'react'
import {ActiveLink} from './ActiveLink'
import { Modal } from 'antd';
const confirm = Modal.confirm;

export default React.createClass({
	contextTypes: {
	  router: React.PropTypes.object.isRequired
	},
	showConfirm({pathname = '/',search = ''}) {
		let that = this;
		let path = pathname + search;
	  confirm({
	    title: '提示',
	    content: '修改项尚未保存，确定要离开吗？',
	    confirmLoading:true,
	    onOk() {
	    	that.context.router.push(path);  //组件内部跳转
	    	// browserHistory.push(path); //组件外部跳转
	    },
	    onCancel() {
	    	that.isConfirm = false;
	    }
	  });
	  return true
	},
	leaveFn(){
		const { route } = this.props
		const { router } = this.context
		router.setRouteLeaveHook(route, this.routerWillLeave);
	},
	componentDidMount() {
	  this.leaveFn();
	},
	routerWillLeave(nextLocation) {
		let pathname = nextLocation.pathname;
		let search = nextLocation.search;
	  if (pathname !== this.props.pathname){
	  	if(!this.isConfirm){
	  		this.isConfirm = this.showConfirm({pathname, search});
	  		return false
	  	}
	  }
	},
  render(){
    return (<div>
    	<ActiveLink to="/inbox/list">App -> Inbox -> List</ActiveLink>
    	<br/>
    	我是Inbox
    	{this.props.children}
    </div>)
  }
});

