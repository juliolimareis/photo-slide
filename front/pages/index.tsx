import Link from 'next/link'
import Router from 'next/router'
import { AxiosError } from 'axios'
import { Auth } from '../models/Auth'
import useAlert from '../core/useAlert'
import React, { ChangeEvent } from 'react'
import { isEmail, isEmpty } from '../utils'
import { AuthProvider } from '../provider/AuthProvider'
import { Container, Input, Text, Button, Grid, GridItem, CircularProgress, Box, useToast } from '@chakra-ui/react'
import { Message } from '../core/Messages'


const LoginPage = () => {
	const mbText: string = '8px'
	const marginElement: string = '10px'
	const alert = useAlert()

	const authProvider: AuthProvider = new AuthProvider()

	const [auth, setAuth] = React.useState<Auth>({
		username: '',
		password: ''
	})

	const [isLoading, setLoading] = React.useState<boolean>(false)

	const onLogin = (): void => {
		setLoading(true)
		authProvider.auth(auth).then(
			response => {
				alert('success', Message.REGISTER_SUCCESS)
				localStorage.setItem('token-api', response.data.token)
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
		<Container
			p="1"
			marginTop='20'
			border='2px solid rgba(0, 0, 0, 0.05)'
			onKeyDown={onPressEnter}
		>
			<Grid
				p='20px'
				templateRows='repeat(2, 1fr)'
				templateColumns='repeat(1, 1fr)'
				gap={2}
			>
				<GridItem mb="15px">
					<h1 className='title text-center'>Photo Slide</h1>
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

				<GridItem className='text-center' mt='30px'>
					<Link href="/register">
						<a className='link'>Cadastre-se</a>
					</Link>
				</GridItem>

				<GridItem className='text-center' mt='20px'>
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

				<GridItem className='text-center' mt='20px'>
					<Link href='/home'>
						<a 
							className="link" 
							href="https://github.com/juliolimareishttps://github.com/juliolimareis/photo-slide" 
							data-size="large"
							aria-label="Follow @juliolimareis on GitHub"
						>
							By @juliolimareis
						</a>
					</Link>
				</GridItem>

			</Grid>
		</Container>
	)
}

export default LoginPage

