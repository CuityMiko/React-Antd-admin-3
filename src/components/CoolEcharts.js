/*
** CoolEcharts 酷酷的echarts展示，非业务需求组件
** auth:whr
** time:2017.6.6
*/
import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { getOption, mapDataToOption } from '../models/echarts-config'
import { mockHomeEcharts } from '../mock'
import { formatDate } from '../common/utils'

export default class Foot extends React.Component{
	constructor(){
		super();
		this.i = 1;
		this.state = {
			option: getOption()
		}
	}
	getNewNumber(n){
		const r = Math.random();
		return r > 0.5 ? n + r*n/2 : n - r*n/2
	}
	componentWillUnmount(){
		this.showTime && clearInterval(this.showTime)
	}
	componentDidMount(){
		const initMockData = mockHomeEcharts(this.i).data;
		this.showTime = setInterval(() => {
			this.i += 1;
			let newData = mockHomeEcharts(this.i).data;
			initMockData.shift();
			initMockData[initMockData.length] = {
				t1: this.getNewNumber(1400),
				t2: this.getNewNumber(800),
				t3: this.getNewNumber(300),
			};
			for(let [i, v] of newData.entries()){
				v.t1 = initMockData[i].t1;
				v.t2 = initMockData[i].t2;
				v.t3 = initMockData[i].t3;
				v.time = formatDate(v.time);
			}
			this.setState(preState => {
				return {
					option: mapDataToOption(preState.option, newData)
				}
			})
		},1500)
	}
  render() {
    return (
    	<ReactEcharts option={ this.state.option } />
    )
  }
}
