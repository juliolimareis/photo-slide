import React from 'react'
import { Text } from '@chakra-ui/react'

import style from '../styles/Global.module.scss'

export default class CardImage extends React.Component<{ url?: string, title?: string, desc?: string }, {}>{

	render() {
		return (
			<div className='float-left'>
				<img
					className={style.card} 
					src={this.props.url}
					alt={this.props.desc} />

				<Text className='text-center'><b>{this.props.title}</b></Text>
				<Text className='text-center'><i>{this.props.desc}</i></Text>
			</div>
		)
	}
}
