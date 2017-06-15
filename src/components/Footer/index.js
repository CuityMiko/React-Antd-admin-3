/*
** Footer
** auth:whr
** time:2017.4.6
*/
import React from 'react'
import { Layout } from 'antd';
import { projectInfo } from '../../models/config'
const { Footer } = Layout;

export default class Foot extends React.Component{
  render() {
    return (
    	<Footer className="footer text-center">
        { projectInfo.describe }
      </Footer>
    )
  }
}
