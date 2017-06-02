/*
** api.js 接口
** auth:whr
** time:2017.3.23
*/

export default {
    channelListApi: 'http://dev.api.stat.btime.com/build/category_list.php', //频道/内容 -- 频道、类目列表 by 陆旭
    requestChannelinfoDataApi: 'http://dev.api.stat.btime.com/build/category_index.php', //频道/内容 -- 频道、类目内容 by 陆旭 接收4个参数 频道ID：channelid 分类ID：category 开始日期：start_date 结束日期：end_date 如2017-05-20
    ctr: 'http://review.btime.cn:8360/index.php?ro=Highctrdata&ra=hctrs', //高CTR -- 图表数据 by 赵亮
}

