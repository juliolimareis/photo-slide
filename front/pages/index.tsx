import React, { ChangeEvent } from 'react'
import Router from 'next/router'

import Link from 'next/link'

import { Auth } from '../models/Auth'
import { AuthProvider } from '../provider/AuthProvider'

import { Container, Input, Text, Button, Grid, GridItem, CircularProgress } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { isEmail, isEmpty } from '../utils'

export default class LoginPage extends React.Component<{}, {auth: Auth, isLoading: boolean, messages: string[]}>{
	mbText: string = '8px'
	marginElement: string = '10px'

	authProvider: AuthProvider = new AuthProvider()

	constructor(props: any) {
		super(props);
		
		this.state = {
			messages: [],
			isLoading: false,
			auth: {
				username: '',
				password: ''
			}
		}
	}

	onLogin = (): void => {
		this.authProvider.auth(this.state.auth).then(
			response => {
				localStorage.setItem('token-api', response.data.token)
				Router.replace('/home')
			},
			(error: AxiosError) => {
				this.setMessageRequestError(error)
				console.log(error);
			}
		)
	}

	setAuth = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string): void => {
		const auth: any = this.state.auth
		auth[fieldName] = e.target.value
		
		this.setState({
			auth: auth
		})
	}

	validate = (): void => {
		let messages = []
		
		if(isEmpty(this.state.auth.username) || !isEmail(this.state.auth.username)) {
			messages.push('* e-mail inválido')
		}
		
		if(isEmpty(this.state.auth.password) || this.state.auth.password.length < 6) {
			messages.push('* senha deve conter pelo menos 6 caracteres')
		}

		if(messages.length > 0) {
			this.setMessage(messages)
		}else{
			this.onLogin()
		}

	}

	setMessage = (messages: string[]): void => {
		this.setState({
			messages: messages,
		})
	}

	setMessageRequestError = (error: AxiosError): void => {
		let message = ''

		if(error.response?.status === 500) {
			message = 'Erro desconhecido'
		}
		
		if(error.response?.status === 403) {
			message = 'Usuário ou senha inválidos'
		}

		this.setMessage([message])

	}

	onPressEnter = (e: any): void => {
		if(e.key == 'Enter'){
			this.validate()
		}
	}

	render() {
		let messages = []

		for (let i = 0; i < this.state.messages.length; i++) {
			messages.push(<Text key={i} color="orange">{this.state.messages[i]}</Text>)
		}

		return (
			<Container 
				p="1" 
				marginTop='20' 
				border='2px solid rgba(0, 0, 0, 0.05)'
				onKeyDown={this.onPressEnter}
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
						<Text mb={this.mbText}>Login</Text>
						<Input
							value={this.state.auth.username}
							onChange={(e) => {this.setAuth(e, 'username')}}
							placeholder='Login'
							size='sm'
						/>
					</GridItem>

					<GridItem rowSpan={4}>
						<Text mb={this.mbText}>Senha</Text>
						<Input
							value={this.state.auth.password}
							onChange={(e) => {this.setAuth(e, 'password')}}
							placeholder='senha'
							type='password'
							size='sm'
						/>
					</GridItem>

					<GridItem className='text-center' mt='30px'>
						{messages}
					</GridItem>
					
					<GridItem className='text-center' mt='30px'>
						<Link href="/register">
							<a className='link'>Cadastre-se</a>
						</Link>
					</GridItem>

					<GridItem className='text-center' mt='20px'>
						<Link href='/home'>
							{ this.state.isLoading ? <CircularProgress isIndeterminate/> : <Button colorScheme='blue' w='200px' onClick={this.validate}>Entrar</Button>}
						</Link>
					</GridItem>
					
					<GridItem className='text-center' mt='20px'>
						<Link href='/home'>
							<a className="link" href="https://github.com/juliolimareishttps://github.com/juliolimareis/photo-slide" data-size="large" aria-label="Follow @juliolimareis on GitHub">By @juliolimareis</a>
						</Link>
					</GridItem>

				</Grid>
			</Container>
		)
	}
}