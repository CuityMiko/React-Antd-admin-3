#### 特别说明
```bash
-   v3版本特性: 添加了 react-router-redux , 并实例应用
-   v4正在开发：对echart、table、select等组件进行了进一步封装，封装成高度可复用的组件
```

# React-Antd-admin 
by:   wanghairong@btime.com
time: 2017.3.3

## 介绍
-   基于[react](https://github.com/facebook/react)，[ant-design](https://github.com/ant-design/ant-design) 后台管理系统纯净版
-   基于Antd UI 设计语言，可按需引入模块
-   基于[react-router](https://github.com/ReactTraining/react-router)进行路由控制，实现单页应用
-   基于[react-router-redux](https://github.com/reactjs/react-router-redux)进行路由和redux管理
-   基于[mockjs](https://github.com/nuysoft/Mock/wiki),[mockjs官网](http://mockjs.com/)脱离后端，生成随机数据进行数据模拟测试
-   浅度响应式设计
-   动态加载路由对应内容组件js文件

### 其他介绍
-   [echarts-for-react](https://github.com/hustcc/echarts-for-react) 一个简单的 echarts(v3.0) 的 react 封装

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
│ │ └── utils.js     # 工具函数
│ ├── routes.js      # 路由配置
│ ├── actions.js     # redux 的 actions管理
│ ├── reducers.js    # redux 的 reducers管理
│ ├── store.js       # redux 的 store管理
│ ├── app.js         # 整体布局控制
│ ├── mock.js        # 脱离后端进行数据模拟测试
│ ├── index.less     # index样式文件
│ └── index.js        # 入口js文件
└── package.json     # 项目信息
```

#### 文件命名说明:

-   components：组件（方法）为单位以文件夹保存，文件夹名组件首字母大写，方法首字母小写,文件夹内主文件与文件夹同名，多文件以`index.js`导出对象


#### 快速开始

安装依赖：

npm install 或者 yarn install


任务文件替换：

用/assets文件夹里的webpack.config.*.js文件替换 /node_modules/react-scripts/config目录下对应文件，解决两个问题：
    1，antd框架引用模块问题；
    2，自定义主题
    
开发：

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
    
    A：在node_modules/react-scripts/config/webpack.config.*.js文件中,在module.loaders对象中做相应增加test和loader配置，
       然后在module.loaders[0].exclude对象中增加/\.less$/

-   Q:  怎么自定义主题颜色？

    A：在node_modules/react-scripts/config/webpack.config.*.js文件中，module.loaders中，找到less项，修改loader为
        ```javascript
        'style!css!postcss!less?{modifyVars:{"@primary-color":"#00a2ae"}}'
        ```
      按需修改颜色值即可

## 其他

-   修改了安装目录下，react-scripts文件夹中的 webpack.config.*.js，

    ![](assets/react-scripts.png)


