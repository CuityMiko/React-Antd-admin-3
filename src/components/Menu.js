/*
** sider.js 左侧菜单栏
** auth:whr
** time:2017.4.6
*/

import React from 'react';
import { Link , IndexLink} from 'react-router'
import { Menu, Icon} from 'antd';
const { SubMenu } = Menu;

class CusMenu extends React.Component {
  constructor(props){
    super(props);
    if(location.pathname === '/user/about/mylog'){ //如果初始化进入的是我的记录，则菜单栏-我的记录为选中状态
      this.state = {
        current: location.pathname,
        openKeys: ['/user','/user/about']
      }
    }else{
      this.state = { //通过es6类的继承实现时 state的初始化要在constructor中声明
        current: '0', // 初始默认打开的末级菜单的key
        openKeys: [], //初始默认打开的菜单，如果是3级菜单，要把2级、3级菜单按序填写 ['sub2','sub3']
      }
    }
    this.keysMap = {}; //二级菜单下如果还有三级菜单，要在map中写上，用于触发openChange时使用
    this.MenuChildRender = [];
  }
  handleClick = (e) => { //点击根菜单时的事件
    this.setState({ current: e.key });
  }
  onOpenChange = (openKeys) => { //打开菜单时的事件
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1)); 
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1)); 
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys = (key) => { //获取当前一级、二级菜单的所属关系，二级菜单为key，一级菜单为value
    return this.keysMap[key] || [];
  }
  renderMenu(){
    const repeatRender = ({path,label,icon,child},i) => { //遍历菜单list对象，拼装菜单组件
      if(!child || !child.length){
        if(path === '/business/list'){// 对业务监控-->列表组进行参数处理
          path += '/1234567'
        }
        return (<Menu.Item key={path}><Link to={path}>{icon && <Icon type={icon} />}{label}</Link></Menu.Item>)
      }
      // 此处if判断是为了处理this.keysMap的值，从而达到：打开当前菜单，关闭其他非父级菜单
      if(icon){ //只有一级菜单才有icon，处理一级菜单,this.turnoverPath用来暂存一级菜单的key
        this.turnoverPath = [path];
      }else{//存在二级child的情况下
        this.keysMap[path] = this.turnoverPath;
      }
      return (<SubMenu key={path} title={<span>{icon && <Icon type={icon} />}<span>{label}</span></span>}>
            {child.map(repeatRender)}
          </SubMenu>)
    }
    const {menuList} = this.props;
    this.MenuChildRender = menuList.map(repeatRender); //缓存左侧菜单栏，避免每次都重新计算组合Menu组件
  }
  render() {
    if(!this.MenuChildRender.length){
      this.renderMenu();
    }
    return (
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          selectedKeys={[this.state.current]}
          style={{ height: '100%' }}
          onOpenChange={this.onOpenChange}
          onClick={this.handleClick}
        >
          <Menu.Item key="0">
            <IndexLink to="/"><Icon type="home" />首页</IndexLink>
          </Menu.Item>
          {this.MenuChildRender}
        </Menu>
    );
  }
}

export default CusMenu


