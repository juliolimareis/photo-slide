import { getUrl } from '../config/api'

import { AxiosError } from 'axios'

import { Photo } from '../models/Photo'
import { Album } from '../models/Album'

import { Message } from '../core/Messages'

import { withAuth } from '../config/withAuth'

import { ArrowBackIcon } from '@chakra-ui/icons'

import Router, { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'

import CardPhoto from '../components/CardImage'
import ModalComponent from '../components/Modal'
import FormAddPhoto from '../components/FormAddPhoto'
import HeaderPrivate from '../components/HeaderPrivate'
import ImageComponent from '../components/ImageComponent'
import { ProfileRepository } from '../provider/ProfileRepository'

import useAlert from '../core/hooks/useAlert'
import UserContext from '../core/UserContext'
import useAlertRequest from '../core/hooks/useErrorRequest'

import { Container, Text, Button, Grid, GridItem, Table, Tr, Thead, Th, Tbody, Td, CircularProgress, Box} from '@chakra-ui/react'

const urlImage = `${getUrl()}/image`

const Collection = () => {
	const {photos, getPhotos, loaderPhotos} = useContext(UserContext)

	const alert = useAlert()
	const errorRequest = useAlertRequest()

	const [album, setAlbum] = useState<Album>({})
	const [isTable, setTable] = useState<boolean>(false)
	const [photoSelected, setPhotoSelected] = useState<Photo>({})
	const [isOpenModalPhoto, setOpenModalPhoto] = useState<boolean>(false)
	const [isOpenModalAddPhoto, setOpenModalAddPhoto] = useState<boolean>(false)

	const profileRepository = new ProfileRepository()

	const router = useRouter()
  const { id } = router.query

	useEffect(() => {
		withAuth().then(isAuth => {
			if (isAuth && id) {
				getPhotos(id as string)
				getAlbum()
			}else{
				Router.replace('/home')
			}
		})
	},[])

	const requestError = (err: AxiosError) => {
		errorRequest(err)
	} 

	const getAlbum = () => {		
		profileRepository.fetchAlbum(id as string).then(
			res => setAlbum(res.data),
			err => requestError(err)
		)
	}
	
	const deletePhoto = () => {
		profileRepository.deletePhoto(photoSelected.idPhoto as number).then(
			() => {
				getPhotos(id as string)
				onClosePhoto()
				alert('success', Message.PHOTO_DELETE.replace('{photo}', photoSelected.title ?? ''))
			},
			err => requestError(err)
		)
	}
	
	const deleteAlbum = () => {
		profileRepository.deleteAlbum(id as string).then(
			() => {
				alert('success', Message.ALBUM_DELETE)
				Router.replace('/home')
			},
			err => requestError(err)
		)
	}
	
	const handlePhotoSelected = (_photo: Photo) => {
		setPhotoSelected(_photo)
		setOpenModalPhoto(true)
	}

	const onOpen = (): void => {
		setOpenModalAddPhoto(true)
	}

	const onCloseAddPhoto = (): void => {
		setOpenModalAddPhoto(false)
	}
	
	const onClosePhoto = (): void => {
		setOpenModalPhoto(false)
	}

	const onBack = () => {
		Router.back()
	}

	return (
		<Box p={"20px"}>
			<ArrowBackIcon className='click' w={6} h={6} onClick={onBack}/> 
			<HeaderPrivate title='Meus álbuns de fotos'></HeaderPrivate>

			<Box mb="15px">
				<Text fontSize='24px'>{album.title}</Text>
				
				<Box as='span' mr="5px" >{album.description}</Box> 

				<Box className='float-right'>
					<Box as='span'>
						Visualizar como:
						<Box as='span' className='link' onClick={() => setTable(false)}> Miniatura </Box>
						/
						<Box as='span' className='link' onClick={() => setTable(true)}> Tabela </Box>
					</Box>
				</Box>
				
			</Box>

			<Grid
				mt='30px'
				templateRows='repeat(1, 1fr)'
				templateColumns='repeat(1, 1fr)'
			>
				<Container className={loaderPhotos ? 'text-center' : 'hidden'}>
					<CircularProgress isIndeterminate/>	
				</Container>

				<GridItem mb={15} className={loaderPhotos ? 'hidden': 'm-a'}>
					{
						isTable ? 
							<TablePhoto photos={photos} setPhotoSelected={handlePhotoSelected}/>	
						: 
							<CardsPhoto photos={photos} setPhotoSelected={handlePhotoSelected}/>
					}
				</GridItem>

				<GridItem className='footer' mb={15}>
					<Box as='span'>
						<Box as='span' className='float-left p-20'>
							<Button
								w={200}
								colorScheme='red'
								onClick={deleteAlbum}
							>Excluir album
							</Button>
						</Box>				
						
						<Box as='span' className='float-right p-20'>
							<Button
								colorScheme='blue'
								w={200}
								onClick={onOpen}
							>Adicionar Fotos
							</Button>		
						</Box>
					</Box>
				</GridItem>
			</Grid>

			<ModalComponent 
				title="Adicionar Fotos"
				onClose={onCloseAddPhoto}
				isOpen={isOpenModalAddPhoto}
				body={<FormAddPhoto beforeSend={onCloseAddPhoto} />}
			/>
			
			<ModalComponent 
				size='5xl'
				onClose={onClosePhoto}
				isOpen={isOpenModalPhoto}
				title={photoSelected.title}
				body={<ImageComponent photo={photoSelected}/>}
				footer={ 
					<Button 
						w='200px' 
						colorScheme='red' 
						onClick={()=> deletePhoto()}
					>
						Excluir foto 
					</Button> 
				}
				/>
		</Box>
		
	)
}

const CardsPhoto = (props: { photos: Photo[], setPhotoSelected(photo: Photo): void }) => (
	<Box>
		{props.photos.map((photo, i) => 
			<Box as='span' key={i} onClick={() => props.setPhotoSelected(photo)}>
				<CardPhoto 
					title={photo.title}
					desc={photo.description}
					url={`${urlImage}/${photo.serverName}`}
				></CardPhoto>
			</Box>
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