import React from 'react'
import { Text } from '@chakra-ui/react'

import style from '../styles/Global.module.scss'

export default function CardImage(props: { url?: string, title?: string, desc?: string }) {
	return (
		<div className='float-left'>
			<img
				className={style.card} 
				src={props.url}
				alt={props.desc} />

			<Text className='text-center'><b>{props.title}</b></Text>
			<Text className='text-center'><i>{props.desc}</i></Text>
		</div>
	)
}
