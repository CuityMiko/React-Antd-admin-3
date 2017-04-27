/*
** 初始化echarts的数据
** auth:whr
** time:2017.4.6
*/

export default { 
    title: {
      left:'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend:{
      right: 110,
      orient: 'vertical'
    },
    yAxis: {},
    xAxis: {
        data: [] 
    },
    grid:{
      left:80,
      right:100
    },
    series:[]
};

