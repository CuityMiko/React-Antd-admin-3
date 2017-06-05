#### v3版本特性
```bash
-   添加了 react-router-redux , 并实例应用
```

# React-Antd-admin 
by:   j-wanghairong@btime.com
time: 2017.5.9

## 特别说明
-   v0版本是基础框架，react + react-router + antd，方便clone直接应用；方便根据实际项目需求拓展；
-   查看react + react-router + antd + mockjs 应用实例，请查看[v2版本](https://github.com/whrweb/React-Antd-admin/tree/v2) 
-   查看react + react-router + antd + mockjs + react-router-redux 应用实例， 请查看[v3版本](https://github.com/whrweb/React-Antd-admin/tree/v3) 
-   v4版本正在开发，将会加入saga/fetch，敬请期待...

## 介绍
-   基于[react](https://github.com/facebook/react)，[ant-design](https://github.com/ant-design/ant-design) 后台管理系统纯净版
-   基于Antd UI 设计语言，可按需引入模块
-   基于[react-router](https://github.com/ReactTraining/react-router)进行路由控制，实现单页应用
-   基于[react-router-redux](https://github.com/reactjs/react-router-redux)进行路由和redux管理
-   基于[mockjs](https://github.com/nuysoft/Mock/wiki),[mockjs官网](http://mockjs.com/)脱离后端，生成随机数据进行数据模拟测试
-   浅度响应式设计
-   动态加载路由对应内容组件js文件


## 开发构建

#### 目录结构
```bash
├── /dist/           # 项目输出目录
├── /public/         # 
| └── index.html     # 入口html文件
├── /src/            # 项目源码目录
│ ├── /components/   # UI组件及UI相关方法
│ │ ├── Header.js    # 跨域请求
│ │ └── Menu.js      # 左侧菜单组件
│ ├── /models/       # 数据模型
│ ├── /common/       # 通用函数
│ │ ├── jsonp.js     # 跨域请求
│ │ └── utils.js     # 工具函数
│ ├── routes.js      # 路由配置
│ ├── actions.js     # redux 的 actions管理
│ ├── reducers.js    # redux 的 reducers管理
│ ├── store.js       # redux 的 store管理
│ ├── app.js         # 整体布局控制
│ ├── mock.js        # 脱离后端进行数据模拟测试
│ ├── index.less     # index样式文件
│ └──index.js        # 入口js文件
└── package.json     # 项目信息
```

#### 文件命名说明:

-   components：组件（方法）为单位以文件夹保存，文件夹名组件首字母大写，方法首字母小写,文件夹内主文件与文件夹同名，多文件以`index.js`导出对象


#### 快速开始

安装依赖

    npm install 或者 yarn install
    
开发

```bash
npm start    

打开 http://localhost:3000
```


构建：

```bash
npm run build

将会生成dist目录
```
    
## 如何从零配置环境

#### 配置过程
-   create-react-app 命令 构建基础环境
-   npm install 所需插件等，例如 antd  react-router 
-   自定义react-scripts文件目录下的webpack.config.*.js文件,改为antd运行less的环境
-   安装babel-plugin-import，修改antd下的相关less文件，自定义颜色等样式

#### 环境配置中遇到的问题
-   Q：用import {Layout} from 'antd' ,只是加载了js，没有加载进样式
    
    A：在node_modules/react-scripts/config/webpack.config.dev.js文件中，在module.loaders[1].query对象中增加
    ```javascript
          plugins: [
            ['import', [{ libraryName: "antd", style: 'css' }]]
          ]
    ```
-   Q：怎么使用less加载器加载.less文件
    
    A：在node_modules/react-scripts/config/webpack.config.dev.js文件中,在module.loaders对象中做相应增加test和loader配置，
       然后在module.loaders[0].exclude对象中增加/\.less$/


## 其他

-   修改了安装目录下，react-scripts文件夹中的 webpack.config.dev.js 和 webpack.config.prod.js,(看下图)(见根目录下assets文件夹),达到使用import引入antd模块，即可同时引入antd对应模块的组件和样式文件。另，可通过修改安装目录下antd/lib文件夹下对应的文件，完成自定义样式的需求。

    ![](assets/react-scripts.png)


