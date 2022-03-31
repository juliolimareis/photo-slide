import Router, { useRouter } from 'next/router'
import { getUrl } from '../config/api'
import { Photo } from '../models/Photo'
import { Album } from '../models/Album'
import { withAuth } from '../config/withAuth'
import CardPhoto from '../components/CardImage'
import ModalComponent from '../components/Modal'
import { ArrowBackIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import FormAddPhoto from '../components/FormAddPhoto'
import HeaderPrivate from '../components/HeaderPrivate'
import ImageComponent from '../components/ImageComponent'
import { ProfileProvider } from '../provider/ProfileProvider'
import { Container, Text, Button, Grid, GridItem, Table, Tr, Thead, Th, Tbody, Td, CircularProgress, Box} from '@chakra-ui/react'
import useAlert from '../core/useAlert'
import useAlertRequest from '../core/useErrorRequest'

const urlImage = `${getUrl()}/image`

const Collection = () => {
	const errorRequest = useAlertRequest()

	const [album, setAlbum] = useState<Album>({})
	const [photos, setPhotos] = useState<Photo[]>([])
	const [isTable, setTable] = useState<boolean>(false)
	const [isLoading, setLoading] = useState<boolean>(false)
	const [photoSelected, setPhotoSelected] = useState<Photo>({})
	const [isOpenModalPhoto, setOpenModalPhoto] = useState<boolean>(false)
	const [isOpenModalAddPhoto, setOpenModalAddPhoto] = useState<boolean>(false)

	const profileProvider = new ProfileProvider()

	const router = useRouter()
  const { id } = router.query

	useEffect(() => {
		withAuth().then(isAuth => {
			if (isAuth){
				getPhotos()
				getAlbum()
			}else{
				Router.replace('/home')
			}
		})
	},[])

	const getAlbum = () => {
		profileProvider.fetchAlbum(id as string).then(
			res => {
				setAlbum(res.data)
			},
			err => {
				errorRequest(err)
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
				errorRequest(err)
				console.log(err);
			}
		)
	}
	
	const deleteAlbum = () => {
		profileProvider.deleteAlbum(id as string).then(
			() => {
				Router.replace('/home')
			},
			err => {
				errorRequest(err)
				console.log(err);
			}
		)
	}

	const getPhotos = () => {		
		profileProvider.fetchPhotos(id as string).then(
			res => {
				setPhotos(res.data)
			},
			err => {
				errorRequest(err)
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
				<Container className={isLoading ? 'text-center' : 'hidden'}>
					<CircularProgress isIndeterminate/>	
				</Container>

				<GridItem mb={15} className={isLoading ? 'hidden': 'm-a'}>
					{
						isTable ? <TablePhoto photos={photos} setPhotoSelected={handlePhotoSelected}/>	
						: <CardsPhoto photos={photos} setPhotoSelected={handlePhotoSelected}/>
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
						onClick={()=> deletePhoto(photoSelected.idPhoto ?? 0)}
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