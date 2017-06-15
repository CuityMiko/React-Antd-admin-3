/*
** selectConfig.config  频道、类目下拉框配置项
** auth:whr
** time:2017.4.24
*/
export default {
  dataProps: {
    arr: 'nodes',
    value: 'code',
    text: 'name'
  },
  list: [
    {
      label: '频道',
      id: 'channelSelect'
    },
    {
      label: '一级类目',
      id: 'rank1Select'
    },
    {
      label: '二级类目',
      id: 'rank2Select'
    }
  ]
};


