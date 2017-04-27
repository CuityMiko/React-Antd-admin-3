import React from 'react'
import { Link } from 'react-router'

const activeStyle = {
	color: 'red',
	fontSize: 16
}

const ActiveLink = React.createClass({
	render(){
		return (<Link {...this.props} activeStyle={activeStyle} />)
	}
})

export {
	activeStyle,
	ActiveLink
}
