/*
** api.js 接口
** auth:whr
** time:2017.3.23
*/
// 推荐在入口文件全局设置 locale
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn');

export const projectInfo = {
    userName: 'wanghairong',
    logo: 'http://p7.qhimg.com/t018971909fc01a2f0a.png',
    title: '数据展示平台',
    describe: '北京时间 Btime 版权所有 © 2017 由北京时间研发中心支持'
}

export const dateFormat = 'YYYY-MM-DD'; //日期格式

