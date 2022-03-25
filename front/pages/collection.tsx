import React, { useEffect, useState } from 'react'
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

import { Container, Text, Button, Grid, GridItem, Table, Tr, Thead, Th, Tbody, Td, CircularProgress, Box} from '@chakra-ui/react'

const urlImage = `${getUrl()}/image`

const Collection = () => {

	const [album, setAlbum] = useState<Album>({})
	const [photos, setPhotos] = useState<Photo[]>([])
	const [idAlbum, setIdAlbum] = useState<string>("")
	const [isTable, setTable] = useState<boolean>(false)
	const [isLoading, setLoading] = useState<boolean>(false)
	const [photoSelected, setPhotoSelected] = useState<Photo>({})
	const [isOpenModalPhoto, setOpenModalPhoto] = useState<boolean>(false)
	const [isOpenModalAddPhoto, setOpenModalAddPhoto] = useState<boolean>(false)

	const profileProvider = new ProfileProvider()

	// useEffect( () => {
	// 	withAuth().then(res => {
	// 		if (res){
	// 			if(Router.query.id){
	// 				setIdAlbum(`${Router.query.id}`)
	// 				getPhotos()
	// 				getAlbum()
	// 			}else{
	// 				Router.replace('/home')
	// 			}
	// 		}
	// 	})
	// },[])

	const getAlbum = () => {
		profileProvider.fetchAlbum(`${idAlbum}`).then(
			res => {
				setAlbum(res.data)
			},
			err => {
				console.log(err);
			}
		)
	}
	
	const deletePhoto = (id: number) => {
		profileProvider.deletePhoto(id).then(
			() => {
				onClosePhoto()
			},
			err => {
				console.log(err);
			}
		)
	}
	
	const deleteAlbum = () => {
		profileProvider.deleteAlbum(idAlbum).then(
			() => {
				Router.replace('/home')
			},
			err => {
				console.log(err);
			}
		)
	}

	const getPhotos = () => {		
		profileProvider.fechPhotos(`${idAlbum}`).then(
			res => {
				setPhotos(res.data)
			},
			err => {
				console.log(err);
			}
		).finally(() => setLoading(false))
	}
	
	const handlePhotoSelected = (_photo: Photo) => {
		setPhotoSelected(_photo)
		setOpenModalPhoto(true)
	}

	const onOpen = (): void => {
		setOpenModalAddPhoto(true)
	}

	const onCloseAddPhoto = (): void => {
		getPhotos()
		setOpenModalAddPhoto(false)
	}
	
	const onClosePhoto = (): void => {
		getPhotos()
		setOpenModalPhoto(false)
	}

	const onBack = () => {
		Router.back()
	}

	return (
		<div className='p-20'>
			<ArrowBackIcon className='click' w={6} h={6} onClick={onBack}/> 
			<HeaderPrivate title='Meus álbuns de fotos'></HeaderPrivate>

			<div className="mb-15">
				<Text fontSize='24px'>{album.title}</Text>
				
				<span className='mr-5'>{album.description}</span> 

				<span className='float-right'>
					<span>
						Visualizar como:
						<span className='link' onClick={() => setTable(false)}> Miniatura </span>
						/
						<span className='link' onClick={() => setTable(true)}> Tabela </span>
					</span>
				</span>
				
			</div>

			<Grid
				mt='30px'
				templateRows='repeat(1, 1fr)'
				templateColumns='repeat(1, 1fr)'
			>
				<Container className={isLoading ? 'text-center' : 'hidden'}>
					<CircularProgress isIndeterminate/>	
				</Container>

				<GridItem mb={15} className={isLoading ? 'hidden': 'm-a'}>
					{
						isTable ? <TablePhoto photos={photos} setPhotoSelected={setPhotoSelected}/>	
						: <CardsPhoto photos={photos} setPhotoSelected={setPhotoSelected}/>
					}
				</GridItem>

				<GridItem className='footer' mb={15}>
					<span>
						<span className='float-left p-20'>
							<Button
								w={200}
								colorScheme='red'
								onClick={deleteAlbum}
							>Excluir album
							</Button>
						</span>				
						
						<span className='float-right p-20'>
							<Button
								colorScheme='blue'
								w={200}
								onClick={onOpen}
							>Adicionar Fotos
							</Button>		
						</span>
					</span>
				</GridItem>
			</Grid>

			<ModalComponent 
				onClose={onCloseAddPhoto}
				isOpen={isOpenModalAddPhoto}
				title="Adicionar Fotos"
				body={<FormAddPhoto beforeSend={onCloseAddPhoto} ></FormAddPhoto>}>
			</ModalComponent>
			
			<ModalComponent 
				size='5xl'
				onClose={onClosePhoto}
				isOpen={isOpenModalPhoto}
				title={photoSelected.title}
				body={<ImageComponent photo={photoSelected} ></ImageComponent>}
				footer={ <Button w='200px' colorScheme='red' onClick={()=> deletePhoto(photoSelected.idPhoto ?? 0)}>Excluir foto </Button> }
				></ModalComponent>
		</div>
		
	)
}

const CardsPhoto = (props: { photos: Photo[], setPhotoSelected(photo: Photo): void }) => (
	<Box>
		{props.photos.map((photo, i) => 
			<span key={i} onClick={() => props.setPhotoSelected(photo)}>
				<CardPhoto 
					title={photo.title}
					desc={photo.description}
					url={`${urlImage}/${photo.serverName}`}
				></CardPhoto>
			</span>
		)}
	</Box>
)

const TablePhoto = (props: { photos: Photo[], setPhotoSelected(photo: Photo): void }) => (
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
			{props.photos.map((photo, i) => 
				<Tr 
					key={i} 
					className="click" 
					onClick={() => props.setPhotoSelected(photo)}
				>
					<Td>{photo.fileName}</Td>
					<Td isNumeric>{photo.size}</Td>
					<Td>{photo.datetimeCreation}</Td>
					<Td>{photo.color}</Td>
				</Tr>
			)}
		</Tbody>
	</Table> 
)

export default Collection