# React-Antd-admin
### [点我预览](http://www.baidu.com)

## 介绍
-   基于[react](https://github.com/facebook/react)，[ant-design](https://github.com/ant-design/ant-design) 后台管理系统纯净版
-   基于Antd UI 设计语言，可按需引入模块
-   浅度响应式设计

## 开发构建

### 目录结构
```bash
├── /dist/           # 项目输出目录
├── /public/         # 
| └── index.html     
├── /src/            # 项目源码目录
│ ├── /components/   # UI组件及UI相关方法
│ ├── /models/       # 数据模型
│ ├── /common/       # 通用函数
│ │ ├── jsonp.js     # 跨域请求
│ │ └── utils.js     # 工具函数
│ ├── /containers/   # 容器组件
│ │ └── menu.js      # 左侧菜单组件
│ ├── routes.js      # 路由配置
│ ├── app.js         # 整体布局控制
│ ├── index.less     # index样式文件
│ └──index.js        # 入口文件
├── package.json     # 项目信息
└── proxy.config.js  # 数据mock配置
```

### 快速开始

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
    


## 其他
- 修改了安装目录下，react-scripts文件夹中的 webpack.config.dev.js 和 webpack.config.prod.js,(看下图),达到使用import引入antd模块，即可同时引入antd对应模块的组件和样式文件。另，可通过修改安装目录下antd/lib文件夹下对应的文件，完成自定义样式的需求。
![](assets/1.jpeg)

