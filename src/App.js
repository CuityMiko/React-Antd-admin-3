/*
** App.js 页面整体布局
** auth:whr
** time:2017.4.6
*/ 
import React from 'react';
import { connect } from 'react-redux'
import { Layout } from 'antd'
import PropTypes from 'prop-types'
import Menu from './components/Menu'; //左侧菜单栏 
import Header from './components/Header'; // 公共头部
import Footer from './components/Footer'; // 公共底部
import menuList from './models/menuList'; //左侧菜单栏的菜单数据
import Login from './components/login'
import { loginAction } from './actions'
const { Content, Sider } = Layout;

class AppCpt extends React.Component{
  render(){
    const { dispatchLogin, dispatchLogout, login } = this.props;
    // const { store } = this.context; //子组件拿到store的方法
    return (
      login === 'in'
      ?
      <Layout>
        <Header dispatchLogout={dispatchLogout} />
        <Layout>
          <Sider 
            width={200} 
            collapsible={false} 
            collapsedWidth={0} 
            style={{background:'#fff', borderRight: '1px solid #e9e9e9'}}
          >
            <Menu menuList={menuList} />
          </Sider>
          <Layout>
            <Content style={{ padding: 24, minHeight: 500 }}>
              { this.props.children }
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
      : 
      <Login dispatchLogin={dispatchLogin} />
    )
  }
}

AppCpt.contextTypes = {
  store: PropTypes.object
}

function mapStateToProps({login, saga}, ownProps){ //负责输入逻辑 
  // console.log('ownProps:',ownProps); //ownProps是一个对象，包裹params、location等属性 （使用react-router-redux包的情况下）
  return {login, saga}
}
function mapDispatchToProps(dispatch, ownProps){ //负责输出逻辑，即将用户对 UI 组件的操作映射成 Action,即发送action
  function setStorage(payload){
    localStorage.setItem('login',payload);
  }
  return {
    dispatchLogin(){
      loginAction.payload = 'in';
      setStorage(loginAction.payload);
      dispatch(loginAction)
    },
    dispatchLogout(){
      loginAction.payload = 'out';
      setStorage(loginAction.payload);
      dispatch(loginAction)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppCpt)
