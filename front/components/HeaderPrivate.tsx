import React, { useEffect } from 'react'
import Title from './Title'
import Router from 'next/router'
import { User } from '../models/User'
import { ProfileProvider } from '../provider/ProfileProvider'
import { Message } from '../core/Messages'
// import useSnackbar from '../core/useSnackbar'
import { Box } from '@chakra-ui/react'

const HeaderPrivate = (props: {title: string}): JSX.Element => {
	// const snackbar = useSnackbar()

	const profileProvider = new ProfileProvider()
	const [user, setUser] = React.useState<User>({})

	// useEffect(() => {
	// 	getUser()
	// })

	const getUser = () => {
		profileProvider.fetchProfile().then(
			(res) => {
				setUser(res.data)
			},
			error => {
				// snackbar({
				// 	id: 'error-get-user',
				// 	title: 'Request Error',
				// 	description: Message.REQUEST_ERROR,
				// })
				console.log(error);
			}
		)
	}

	const logout = async (): Promise<void> => {
		await localStorage.removeItem('token-api')
		Router.replace('/')
	}

	return (
		<Box mb={5}>
			<Title name={props.title}></Title>

			<span className='float-right'>
				<span className='mr-10'> Olá, <b>{user.name}</b></span> 	
				<span className='link' onClick={logout}>[Sair]</span>
			</span>

			<hr />
			
		</Box>
	)
}

export default HeaderPrivate