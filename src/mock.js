/*
** mock.js 脱离后端进行数据模拟测试
** auth:whr
** time:2017.4.10
*/
import Mock from 'mockjs'

//频道/类目内容数据
const mockChannelData = () => Mock.mock({
  "error": 0,
  "msg": "",
  "data|11-22": [
    {
      "time": /2017-((0[1-9])|(1[012]))-((0[1-9])|([12]\d)|(3[01]))/,
      "total|400-1000": 800,
      "newadd|200-400": 300,
    }
  ]
})

export {
	mockChannelData
}