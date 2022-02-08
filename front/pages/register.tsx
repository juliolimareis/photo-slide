import Link from 'next/link'

import Router from 'next/router'

import { AxiosError } from 'axios'

import Title from '../components/Title'

import React, { ChangeEvent } from 'react'

import { isEmail, isEmpty } from '../utils'

import { Register } from '../models/Register'

import { UserProvider } from '../provider/UserProvider'

import { Container, Input, Text, Button, Grid, GridItem, CircularProgress } from '@chakra-ui/react'

export default class RegisterPage extends React.Component
	<{}, {
		register: Register, 
		messages: string[], 
		isError: boolean, 
		isLoading: boolean
	}>{
	
	mbText: string = '8px'
	marginElement: string = '10px'
	userProvider = new UserProvider()

	constructor(props: any) {
		super(props);
		this.state = {
			messages: [],
			isError: false,
			isLoading: false,
			register: {
				name: '',
				email: '',
				password: ''
			}
		}
	}

	setResgiter = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string): void => {
		const register: any = this.state.register
		register[fieldName] = e.target.value
		
		this.setState({
			register: register
		})
	}

	onRegister = async (): Promise<void> => {
		this.setLoading(true)
		await this.userProvider.create(this.state.register).then(
			() => {
				Router.replace('/')
			},
			(error: AxiosError) => {
				this.setMessageRequestError(error)
			}
		)
		this.setLoading(false)
	}

	setLoading = (isLoading: boolean): void => {
		this.setState({isLoading: isLoading})
	}

	validate = (): void => {
		let messages = []

		if(isEmpty(this.state.register.name) || this.state.register.name.length < 4) {
			messages.push('* nome deve conter pelo menos 4 caracteres')
		}
		
		if(isEmpty(this.state.register.email) || !isEmail(this.state.register.email)) {
			messages.push('* e-mail inválido')
		}
		
		if(isEmpty(this.state.register.password) || this.state.register.password.length < 6) {
			messages.push('* senha deve conter pelo menos 6 caracteres')
		}

		if(messages.length > 0) {
			this.setMessage(messages, true)
		}else{
			this.onRegister()
		}

	}

	setMessage = (messages: string[], isError: boolean): void => {
		this.setState({
			messages: messages,
			isError: isError
		})
	}

	setMessageRequestError = (error: AxiosError): void => {
		let message = ''

		if(error.response?.status === 500) {
			message = 'Email já cadastrado'
		}

		this.setMessage([message], true)

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
					<GridItem>
						<div className='text-center'>
							<Title name='Photo Slide'></Title>
						</div>
					</GridItem>
					
					<GridItem>
						<Text className='text-center'>É rápido e fácil.</Text>
					</GridItem>

					<GridItem rowSpan={4}>
						<Text mb={this.mbText}>Nome:</Text>
						<Input
							value={this.state.register.name}
							onChange={(e) => this.setResgiter(e, 'name')}
							placeholder='nome'
							size='sm'
						/>
					</GridItem>

					<GridItem rowSpan={4}>
						<Text mb={this.mbText}>E-mail:</Text>
						<Input
							value={this.state.register.email}
							onChange={(e) => this.setResgiter(e, 'email')}
							placeholder='E-mail'
							type='email'
							size='sm'
						/>
					</GridItem>
				
					<GridItem rowSpan={4}>
						<Text mb={this.mbText}>Senha:</Text>
						<Input
							value={this.state.register.password}
							onChange={(e) => this.setResgiter(e, 'password')}
							placeholder='Senha'
							type='password'
							size='sm'
						/>
					</GridItem>

					<GridItem className={this.state.isError ? 'text-center' : 'hidden'} mt='30px'>
						{messages}
					</GridItem>

					<GridItem className='text-center' mt='30px'>
						<Link href="/">
							<a className='link'>Já tem uma conta?</a>
						</Link>
					</GridItem>

					<GridItem className='text-center' mt='20px'>
						{ this.state.isLoading ? <CircularProgress isIndeterminate/> : <Button colorScheme='blue' w='200px' onClick={this.validate}>Cadastrar</Button>}
					</GridItem>

					{/* <GridItem className='text-center' mt='20px'>
						<a className="link" target="_blank" href="https://github.com/juliolimareishttps://github.com/juliolimareis/photo-slide" data-size="large" aria-label="Follow @juliolimareis on GitHub">By @juliolimareis</a>
					</GridItem> */}

				</Grid>
			</Container>
		)
	}
}