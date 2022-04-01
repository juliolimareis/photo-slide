import Link from 'next/link'
import Router from 'next/router'
import { AxiosError } from 'axios'
import Title from '../components/Title'
import { Message } from '../core/Messages'
import React, { ChangeEvent } from 'react'
import { isEmail, isEmpty } from '../utils'
import useAlert from '../core/hooks/useAlert'
import { Register } from '../models/Register'
import GridImages from '../components/GrisImages'
import { UserRepository } from '../provider/UserRepository'
import { Container, Input, Text, Button, Grid, GridItem, CircularProgress, Box } from '@chakra-ui/react'

const RegisterPage = () => {
	const alert = useAlert()

	const [register, setRegister] = React.useState<Register>({
		name: '',
		email: '',
		password: ''
	})

	const [isLoading, setLoading] = React.useState<boolean>(false)

	const mbText: string = '8px'
	const marginElement: string = '10px'
	const userRepository = new UserRepository()

	const handleRegister = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		setRegister({
			...register,
			[e.target.name]: e.target.value
		})
	}

	const onRegister = async (): Promise<void> => {
		setLoading(true)
		await userRepository.create(register).then(
			() => {
				alert('success', Message.REGISTER_SUCCESS)
				Router.replace('/')
			},
			(error: AxiosError) => {
				handleRequestError(error)
			}
		).finally(() => {
			setLoading(false)
		})
	}

	const validate = (): boolean => {
		if (isEmpty(register.name) || register.name.length < 4) {
			alert('warning', Message.INVALID_USERNAME)
			return false
		}

		if (isEmpty(register.email) || !isEmail(register.email)) {
			alert('warning', Message.INVALID_EMAIL)
			return false
		}

		if (isEmpty(register.password) || register.password.length < 6) {
			alert('warning', Message.INVALID_PASSWORD)
			return false
		}

		onRegister()
		return true
	}

	const handleRequestError = (error: AxiosError): void => {
		if (error.response?.status === 500) {
			alert('warning', Message.REQUEST_REGISTER_500)
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
				p="1"
				marginTop='20'
				border='2px solid rgba(0, 0, 0, 0.05)'
				onKeyDown={onPressEnter}
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
					<GridItem>
						<Box className='text-center'>
							<Title name='Photo Slide'></Title>
						</Box>
					</GridItem>

					<GridItem>
						<Text className='text-center'>É rápido e fácil.</Text>
					</GridItem>

					<GridItem rowSpan={4}>
						<Text mb={mbText}>Nome:</Text>
						<Input
							name='name'
							value={register.name}
							onChange={handleRegister}
							placeholder='nome'
							size='sm'
						/>
					</GridItem>

					<GridItem rowSpan={4}>
						<Text mb={mbText}>E-mail:</Text>
						<Input
							name='email'
							value={register.email}
							onChange={handleRegister}
							placeholder='E-mail'
							type='email'
							size='sm'
						/>
					</GridItem>

					<GridItem rowSpan={4}>
						<Text mb={mbText}>Senha:</Text>
						<Input
							name='password'
							value={register.password}
							onChange={handleRegister}
							placeholder='Senha'
							type='password'
							size='sm'
						/>
					</GridItem>

					<GridItem className='text-center' mt='30px'>
						<Link href="/">
							<a className='link'>Já tem uma conta?</a>
						</Link>
					</GridItem>

					<GridItem className='text-center' mt='20px'>
						{isLoading ?
							<CircularProgress isIndeterminate />
							:
							<Button colorScheme='blue' w='200px' onClick={validate}>
								Cadastrar
							</Button>}
					</GridItem>

					{/* <GridItem className='text-center' mt='20px'>
						<a className="link" target="_blank" href="https://github.com/juliolimareishttps://github.com/juliolimareis/photo-slide" data-size="large" aria-label="Follow @juliolimareis on GitHub">By @juliolimareis</a>
					</GridItem> */}

				</Grid>
			</Container>
		</Box>
	)
}


export default RegisterPage