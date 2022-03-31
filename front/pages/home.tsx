import Router from 'next/router'
import { getUrl } from '../config/api'
import { Album } from '../models/Album'
import React, { useEffect } from 'react'
import { withAuth } from '../config/withAuth'
import CardImage from '../components/CardImage'
import ModalComponent from '../components/Modal'
import FormNewAlbum from '../components/FormAddAlbum'
import HeaderPrivate from '../components/HeaderPrivate'
import { ProfileProvider } from '../provider/ProfileProvider'
import { Button, Grid, GridItem, CircularProgress, Box } from '@chakra-ui/react'

const HomePage = () => {
	const [albums, setAlbums] = React.useState<Album[]>([])
	const [isLoading, setLoading] = React.useState<boolean>(true)
	const [isOpenNewAlbum, setOpenNewAlbum] = React.useState<boolean>(false)

	const profileProvider = new ProfileProvider()

	useEffect(() => {
		withAuth().then(isAuth => {
			if (isAuth) {
				getAlbums()
			}
		})
	},[])

	const getAlbums = () => {
		profileProvider.fetchAlbums().then(
			res => {
				setAlbums(res.data)
			},
			error => {
				console.log(error);
			}
		).finally(() => setLoading(false))
	}

	const onOpen = (): void => {
		setOpenNewAlbum(true)
	}

	const onClose = (): void => {
		setOpenNewAlbum(false)
		getAlbums()
	}

	return (
		<Box p='20px'>
			<HeaderPrivate title='Meus álbuns de fotos'></HeaderPrivate>
			<Grid
				p='0px'
				templateRows='repeat(1, 1fr)'
				templateColumns='repeat(1, 1fr)'
			>
				<GridItem className='m-a' mb="15px">
					{
						isLoading ?	
							<CircularProgress isIndeterminate/> 
						: <CardsImage albums={albums}/>
					}
				</GridItem>

				<GridItem className='footer' mb="15px">
					<Box p='20px' float='right'>
						<Button
							colorScheme='blue'
							w='200px'
							onClick={onOpen}
						>Criar novo álbum
						</Button>

						<ModalComponent
							onClose={onClose}
							isOpen={isOpenNewAlbum}
							title="Criar Novo álbum"
							body={<FormNewAlbum onSend={onClose} />}
						/>

					</Box>
				</GridItem>

			</Grid>
		</Box>
	)
}

const CardsImage = (props: { albums: Album[] }) => {
	const urlImage = `${getUrl()}/image`

	const goToCollection = (album: Album): void => {
		// Router.push('/collection/[pid]', `/collection/${album.idAlbum}`);
		Router.push(
			{
				pathname: `/collection`,
				query: { id: album.idAlbum }
			}
		);
	}

	return (
		<Box>
			{
				props.albums.map((album: Album, i: number) => (
					<Box key={i} onClick={() => goToCollection(album)}>
						<CardImage
							title={album.title}
							desc={album.description}
							url={`${urlImage}/${album.coverUrl}`}
						/>
					</Box>
				))	
			}
		</Box>
	)
}

export default HomePage
