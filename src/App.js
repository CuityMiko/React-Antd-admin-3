/*
** App.js 页面整体布局
** auth:whr
** time:2017.4.6
*/ 
import React from 'react';
import { Layout } from 'antd';
import Menu from './components/Menu'; //左侧菜单栏
import Header from './components/Header'; // 公共头部
import Footer from './components/Footer'; // 公共底部
import menuList from './models/menuList'; //左侧菜单栏的菜单数据
const { Content, Sider } = Layout;

export default React.createClass({
  render(){
    return (
      <Layout>
        <Header />
        <Layout>
          <Sider 
            width={200} 
            collapsible={false} 
            collapsedWidth={0} 
            style={{background:'#fff',borderRight: '1px solid #e9e9e9'}}
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
    )
  }
})
