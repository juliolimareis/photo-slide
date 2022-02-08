import React from 'react'

export default class Header extends React.Component<{name: string}, {}>{
	render() {
		return (
			<span className='title'>{this.props.name}</span>
		)
	}
}