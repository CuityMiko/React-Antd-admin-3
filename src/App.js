/*
** App.js 页面整体布局
** auth:whr
** time:2017.4.6
*/ 
import React from 'react';
import { connect } from 'react-redux'
import { Layout } from 'antd'
const { Content, Sider } = Layout;
import Menu from './components/Menu'; //左侧菜单栏 
import Header from './components/Header'; // 公共头部
import Footer from './components/Footer'; // 公共底部
import menuList from './models/menuList'; //左侧菜单栏的菜单数据
import Login from './components/Login'

class AppCpt extends React.Component{
  render(){
    const { login } = this.props;
    return (
      login === 'in'
      ?
      <Layout>
        <Header/>
        <Layout>
          <Sider width={200} collapsible={false} collapsedWidth={0} style={{background:'#fff', borderRight: '1px solid #e9e9e9'}} >
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
      <Login />
    )
  }
}

function mapStateToProps({login}, ownProps){ //负责输入逻辑 
  // console.log('ownProps:',ownProps); //ownProps是一个对象，包裹params、location等属性 （使用react-router-redux包的情况下）
  return {login}
}

export default connect(mapStateToProps)(AppCpt)
