import React, { ChangeEvent } from 'react'

import Router from 'next/router'

import { Photo } from '../models/Photo'

import { ProfileProvider } from '../provider/ProfileProvider'

import { Input, Text, Button, Grid, GridItem, Textarea, CircularProgress} from '@chakra-ui/react'
import { AxiosError } from 'axios'

export default class FormAddPhoto extends React.Component
	<{beforeSend(): void}, 
	{
		photos: any[],
		isLoading: boolean,
		files: FileList | null,
		messages: string[],
		isError: boolean,
	}>{

	mbText: string = '8px'
	marginElement: string = '10px'
	profileProvider = new ProfileProvider()
	idAlbum = ""

	constructor(props: any) {
		super(props);
		this.state = {
			isError: false,
			messages: [],
			files: null,
			isLoading: false,
			photos: []
		}
	}

	componentDidMount(){
		this.idAlbum = `${Router.query.id}`
	}

	setPhoto = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, fieldName: string, index: number) => {

		let photo: any = {}
		
		if(this.state.photos[index]){
			photo = this.state.photos[index]
		}
		
		photo[fieldName] = e.target.value

		const photos: any = this.state.photos

		if(!this.state.photos[index]){
			photos.push(photo)
		}
		
		this.setState({
			photos: photos
		})
	}

	setLoading = (isLoading: boolean) => {
		this.setState({
			isLoading: isLoading
		})
	}

	setError = (value: boolean): void => {
		if(value){
			this.setState({isError: value})
		}else{
			this.setState({
				isError: false,
				messages: []
			})
		}
	} 

	setFiles = (e: ChangeEvent<HTMLInputElement>): void => {
		const photos = []
		this.setError(false)
		
		if(e.target.files) {
			for (let i = 0; i < e.target.files.length; i++) {
				photos.push({
					title: e.target.files[i].name.split('.')[0],
				})
			}
		}

		this.setState({
			files: e.target.files,
			photos: photos
		})
	}
	
	uploadPhotos = async () => {
		if(!this.idAlbum){
			Router.replace('/home')
		}

		this.setLoading(true)

		let continueUpload = true
		if(this.state.files) {
			for (let i = 0; i < this.state.files.length && continueUpload; i++) {
				let file = this.state.files[i];
				let formData = new FormData();
				formData.append("file", file);
				
				await this.profileProvider.uploadPhoto(this.idAlbum, formData).then(
					res => {
						this.updatePhoto(res.data, i)
					},
					(error: AxiosError) => {
						let fileName = ''
						if (this.state.files){
							fileName = this.state.files[i].name
						}
						this.setMessageRequestError(error, fileName)
					}
				)
			}
		}

		this.setLoading(false)

		if(!this.state.isError){
			this.props.beforeSend()
		}

	}

	updatePhoto = async (photo: Photo, index: number): Promise<boolean> => {
		let isUpdate = true

		photo.title = this.state.photos[index].title
    photo.color = this.state.photos[index].color,
    photo.description = this.state.photos[index].description,
    photo.datetimeCreation = this.state.photos[index].datetimeCreation

		await this.profileProvider
		.updatePhoto(photo.idPhoto ?? 0, photo)
		.catch(
			(error: AxiosError) => {
				isUpdate = false
				this.setMessageRequestError(error, photo.fileName)
			}
		)
		return isUpdate
	}
			
	setMessageRequestError = (error: AxiosError, photoName?: string): void => {
		let message = 'Erro desconhecido.'
		
		if(error.response?.status == 400) {
			message = `${photoName} não pode ser enviada. O tamanho excede o limite de 1MB.`
		}
		
		this.setMessage([message])
		this.setError(true)
		console.log(error);

	}

	setMessage = (messages: string[]): void => {
		this.setState({
			messages: messages,
		})
	}
	
	getValue = (fieldName: string, index: number): string => {
		if (this.state.photos[index] && this.state.photos[index][fieldName]){
			return this.state.photos[index][fieldName]
		}
		return ''
	}

	render() {
		let messages = []

		for (let i = 0; i < this.state.messages.length; i++) {
			messages.push(<Text key={i} color="orange">{this.state.messages[i]}</Text>)
		}

		const gridForms: any = [];

		for (let i = 0; i < this.state.photos.length; i++) {
			gridForms.push(
				<Grid key={i}
					p='20px'
					templateRows='repeat(2, 1fr)'
					templateColumns='repeat(1, 1fr)'
					gap={2}
				>
					<GridItem rowSpan={4}>
						<Text mb={this.mbText}>Titulo:</Text>
						<Input
							value={this.getValue('title', i)}
							onChange={(e) => {this.setPhoto(e, 'title', i)}}
							placeholder='titulo'
							size='sm'
						/>
					</GridItem>

					<GridItem rowSpan={4}>
						<Text mb={this.mbText}>Descrição:</Text>
						<Textarea
							value={this.getValue('description', i)}
							onChange={(e) => {this.setPhoto(e, 'description', i)}}
							placeholder='descrição'
							type='textarea'
							size='sm'
						/>
					</GridItem>

					<GridItem rowSpan={4}>
						<Text mb={this.mbText}>Data/Hora de aquisição:</Text>
						<Input
							value={this.getValue('dateTimeCreation', i)}
							onChange={(e) => {this.setPhoto(e, 'dateTimeCreation', i)}}
							placeholder='dd/mm/aaaa hh:mm:ss'
							size='sm'
							// type='datetime-local'
						/>
					</GridItem>
					
					<GridItem rowSpan={4}>
						<Text mb={this.mbText}>Cor predominante:</Text>
						<Input
							value={this.getValue('color', i)}
							onChange={(e) => {this.setPhoto(e, 'color', i)}}
							placeholder='#00000'
							size='sm'
						/>
					</GridItem>

					<GridItem>
						<hr className="mt-20"/>
					</GridItem>

				</Grid>
			)
		}

		return (
			<div>
				<GridItem rowSpan={4}>
					<Text mb={this.mbText}>Escolher fotos:</Text>
					<Input
						onChange={(e) => {this.setFiles(e)}}
						size='sm'
						type='file'
						multiple
						accept=".jpg,.jpeg,.png"
					/>
				</GridItem>

				<GridItem rowSpan={4}>
					{messages}
				</GridItem>

				{gridForms}
			
				<GridItem className='text-center' mt='20px'>
					{
						this.state.isLoading ? <CircularProgress isIndeterminate/>	:
						this.state.photos.length > 0 ? <Button colorScheme='blue' w='200px' onClick={this.uploadPhotos}>Criar</Button> : <div></div>
					}
				</GridItem>

			</div>
		)
	}
}
