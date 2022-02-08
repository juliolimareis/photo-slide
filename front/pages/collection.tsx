import React from 'react'
import Router from 'next/router'

import { Photo } from '../models/Photo'
import { Album } from '../models/Album'

import CardPhoto from '../components/CardImage'
import ModalComponent from '../components/Modal'
import FormAddPhoto from '../components/FormAddPhoto'
import HeaderPrivate from '../components/HeaderPrivate'
import ImageComponent from '../components/ImageComponent'

import { ArrowBackIcon } from '@chakra-ui/icons'

import { getUrl } from '../config/api'
import { withAuth } from '../config/withAuth'
import { ProfileProvider } from '../provider/ProfileProvider'

import { Container, Text, Button, Grid, GridItem, Table, Tr, Thead, Th, Tbody, Td, CircularProgress} from '@chakra-ui/react'

export default class CollectionPage extends React.Component
	<{}, 
	{ 
		album: Album, 
		photos: Photo[], 
		isTable: boolean,
		isLoading: boolean,
		photoSelected: Photo,
		isOpenModalPhoto: boolean,
		isOpenModalAddPhoto: boolean,
	}>{

	idAlbum = ''
	profileProvider = new ProfileProvider()
	urlImage = `${getUrl()}/image`
	
	constructor(props: any) {
		super(props);
		this.state = {
			isTable: false,
			isLoading: true,
			photoSelected: {},
			isOpenModalPhoto: false,
			isOpenModalAddPhoto: false,
			photos: [],
			album: {
				title: '',
				description: '',
			}
		}
	}

	componentDidMount() {
		withAuth().then(res => {
			if (res){
				if(Router.query.id){
					this.idAlbum = `${Router.query.id}`
					this.getPhotos()
					this.getAlbum()
				}else{
					Router.replace('/home')
				}
			}
		})

	}

	getAlbum = () => {
		this.profileProvider.fetchAlbum(`${this.idAlbum}`).then(
			res => {
				this.setState({
					album: res.data
				})
			},
			err => {
				console.log(err);
			}
		)
	}
	
	deletePhoto = (id: number) => {
		this.profileProvider.deletePhoto(id).then(
			() => {
				this.onClosePhoto()
			},
			err => {
				console.log(err);
			}
		)
	}
	
	deleteAlbum = () => {
		this.profileProvider.deleteAlbum(this.idAlbum).then(
			() => {
				Router.replace('/home')
			},
			err => {
				console.log(err);
			}
		)
	}

	getPhotos = () => {		
		this.profileProvider.fechPhotos(`${this.idAlbum}`).then(
			res => {
				this.setState({ photos: res.data, isLoading: false })
			},
			err => {
				console.log(err);
			}
		)
	}

	setTable = (value: boolean) => {
		this.setState({
			isTable: value
		})
	}
	
	setPhotoSlected = (photo: Photo) => {
		this.setState({photoSelected: photo, isOpenModalPhoto: true})
	}

	setOpenModalAddPhoto = (value: boolean): void => {
		this.setState({
			isOpenModalAddPhoto: value
		})
	}
	
	setOpenModalPhoto = (value: boolean): void => {
		this.setState({
			isOpenModalPhoto: value
		})
	}

	onOpen = (): void => {
		this.setOpenModalAddPhoto(true)
	}

	onCloseAddPhoto = (): void => {
		this.getPhotos()
		this.setOpenModalAddPhoto(false)
	}
	
	onClosePhoto = (): void => {
		this.getPhotos()
		this.setOpenModalPhoto(false)
	}

	onBack=() => {
		Router.back()
	}

	render() {
		const table = []
		const photos = []

		for (let i = 0; i < this.state.photos.length; i++) {
			photos.push(
				<span key={i} onClick={() => this.setPhotoSlected(this.state.photos[i])}>
					<CardPhoto 
						title={this.state.photos[i].title}
						desc={this.state.photos[i].description}
						url={`${this.urlImage}/${this.state.photos[i].serverName}`}
					></CardPhoto>
				</span>
			)
			
			table.push(
				<Tr key={i} className="click" onClick={() => this.setPhotoSlected(this.state.photos[i])}>
					<Td>{this.state.photos[i].fileName}</Td>
					<Td isNumeric>{this.state.photos[i].size}</Td>
					<Td>{this.state.photos[i].datetimeCreation}</Td>
					<Td>{this.state.photos[i].color}</Td>
				</Tr>
			)
		}

		return (
			<div className='p-20'>
				 <ArrowBackIcon className='click' w='6' h='6' onClick={this.onBack}/> 
				 <HeaderPrivate title='Meus álbuns de fotos'></HeaderPrivate>

				<div className="mb-15">
					<Text fontSize='24px'>{this.state.album.title}</Text>
					
					<span className='mr-5'>{this.state.album.description}</span> 

					<span className='float-right'>
						<span>
							Visualizar como:
							<span className='link' onClick={() => this.setTable(false)}> Miniatura </span>
							/
							<span className='link' onClick={() => this.setTable(true)}> Tabela</span>
						</span>
					</span>
					
				</div>

				<Grid
					mt='30px'
					templateRows='repeat(1, 1fr)'
					templateColumns='repeat(1, 1fr)'
				>

					<Container className={ this.state.isLoading ? 'text-center' : 'hidden'}>
						<CircularProgress isIndeterminate/>	
					</Container>

					<GridItem mb="15px" className={ this.state.isLoading ? 'hidden': 'm-a'}>
						{
							this.state.isTable ? 
								<Table variant='striped' colorScheme='blue'>		
									<Thead>
										<Tr>
											<Th>Foto</Th>
											<Th>Tamanho</Th>
											<Th>Data de aquisição</Th>
											<Th>Cor predominante</Th>
										</Tr>
									</Thead>
									<Tbody>
										{table}
									</Tbody>
								</Table> 
							: photos
						}

					</GridItem>

					<GridItem className='footer' mb="15px">
						<span>
							<span className='float-left p-20'>
								<Button
									colorScheme='red'
									w='200px'
									onClick={this.deleteAlbum}
								>Excluir album
								</Button>
							</span>				
							
							<span className='float-right p-20'>
								<Button
									colorScheme='blue'
									w='200px'
									onClick={this.onOpen}
								>Adicionar Fotos
								</Button>		
							</span>
						</span>
					</GridItem>
				</Grid>

				<ModalComponent 
					onClose={this.onCloseAddPhoto}
					isOpen={this.state.isOpenModalAddPhoto}
					title="Adicionar Fotos"
					body={<FormAddPhoto beforeSend={this.onCloseAddPhoto} ></FormAddPhoto>}>
				</ModalComponent>
				
				<ModalComponent 
					size='5xl'
					onClose={this.onClosePhoto}
					isOpen={this.state.isOpenModalPhoto}
					title={this.state.photoSelected.title}
					body={<ImageComponent photo={this.state.photoSelected}></ImageComponent>}
					footer={ <Button w='200px' colorScheme='red' onClick={()=> this.deletePhoto(this.state.photoSelected.idPhoto ?? 0)}>Excluir foto </Button> }
					></ModalComponent>
			</div>
			
		)
	}
}