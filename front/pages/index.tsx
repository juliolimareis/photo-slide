import Link from 'next/link'
import Router from 'next/router'

import { AxiosError } from 'axios'
import { Auth } from '../models/Auth'
import { Message } from '../core/Messages'
import { isEmail, isEmpty } from '../utils'

import useAlert from '../core/hooks/useAlert'
import UserContext from '../core/UserContext'

import GridImages from '../components/GrisImages'

import React, { ChangeEvent, useContext } from 'react'
import { AuthRepository } from '../provider/AuthRepository'

import { Image, Container, Input, Text, Button, Grid, GridItem, CircularProgress, Box, useToast, SimpleGrid } from '@chakra-ui/react'

const LoginPage = () => {
	const alert = useAlert()
	const { setGetUser } = useContext(UserContext)
	
	const mbText: string = '8px'

	const authRepository = new AuthRepository()

	const [auth, setAuth] = React.useState<Auth>({
		username: '',
		password: ''
	})

	const [isLoading, setLoading] = React.useState<boolean>(false)

	const onLogin = (): void => {
		setLoading(true)
		authRepository.auth(auth).then(
			response => {
				alert('success', Message.LOGIN_SUCCESS)
				localStorage.setItem('token-api', response.data.token)
				//avisa para o contexto que deve pegar os dados do usuário
				setGetUser(true)
				Router.replace('/home')
			},
			(error: AxiosError) => {
				handleRequestError(error)
				console.log(error);
			}
		).finally(() => setLoading(false))
	}

	const handleAuth = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		setAuth({
			...auth,
			[e.target.name]: e.target.value
		})
	}

	const validate = (): boolean => {

		if (isEmpty(auth.username) || !isEmail(auth.username)) {
			alert('warning', Message.INVALID_EMAIL)
			return false
		}
		
		if (isEmpty(auth.password) || auth.password.length < 6) {
			alert('warning', Message.INVALID_PASSWORD)
			return false
		}
		
		onLogin()
		return true
	}

	const handleRequestError = (error: AxiosError): void => {
		if (error.response?.status === 500) {
			alert('error', Message.INTERNAL_SERVER_ERROR)
		}else if (error.response?.status === 403) {
			alert('error', Message.REQUEST_LOGIN_403)
		}else{
			alert('error', Message.ERROR_UNKNOWN)
		}
	}

	const onPressEnter = (e: any): void => {
		if (e.key == 'Enter') {
			validate()
		}
	}

	return (
		<Box>
			<GridImages/> 
			<Container
				p={1}
				border='2px solid rgba(0, 0, 0, 0.05)'
				onKeyDown={onPressEnter}
				zIndex={10}
			>
				
				<Grid
					top={70}
					position='absolute'
					borderRadius={15}
					zIndex={10}
					bg='whiteAlpha.900'
					color='blackAlpha.900'
					w={500}
					p={20}
					templateRows='repeat(2, 1fr)'
					templateColumns='repeat(1, 1fr)'
					gap={2}
				>
					<GridItem mb={15} zIndex={10}>
						<Box as='h1' className='title text-center'>Photo Slide</Box>
					</GridItem>

					<GridItem rowSpan={4}>
						<Text mb={mbText}>Login</Text>
						<Input
							name='username'
							value={auth.username}
							onChange={handleAuth}
							placeholder='Login'
							size='sm'
						/>
					</GridItem>

					<GridItem rowSpan={4}>
						<Text mb={mbText}>Senha</Text>
						<Input
							name='password'
							value={auth.password}
							onChange={handleAuth}
							placeholder='senha'
							type='password'
							size='sm'
						/>
					</GridItem>

					<GridItem className='text-center' mt={30}>
						<Link href="/register">
							<a className='link'>Cadastre-se</a>
						</Link>
					</GridItem>

					<GridItem className='text-center' mt={5}>
						<Link href='/home'>
							{isLoading ? 
								<CircularProgress isIndeterminate /> : 
								<Button 
									colorScheme='blue'
									w='200px'
									onClick={validate}
								>
									Entrar
								</Button>}
						</Link>
					</GridItem>

					<GridItem className='text-center' mt={5}>
						<a
							className="link" 
							href="https://github.com/juliolimareis" 
							data-size="large"
							aria-label="Follow @juliolimareis on GitHub"
							target={'_blank'}
						>
							By @juliolimareis
						</a>
					</GridItem>

				</Grid>
			</Container>
		</Box>
	)
}

export default LoginPage

