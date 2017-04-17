/*
** auth:whr
** time:2017.4.6
*/
import React from 'react'

export default React.createClass({
  render() {
    return (
    	<div>
            <p>我是商品，我的id是:{this.props.params.tid}</p>
            <p>我是商品，我的url的search的type是:{this.props.location.query.type}</p>
            <p>我的id是动态的，试着改变url /list/后的数字信息，按enter查看效果吧</p>
        </div>
    )
  }
})
