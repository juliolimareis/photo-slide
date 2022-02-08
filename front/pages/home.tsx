import React from 'react'

import Router from 'next/router'

import { Album } from '../models/Album'

import { withAuth } from '../config/withAuth'

import CardImage from '../components/CardImage'

import { getUrl } from '../config/api'

import ModalComponent from '../components/Modal'

import FormNewAlbum from '../components/FormAddAlbum'

import HeaderPrivate from '../components/HeaderPrivate'

import { ProfileProvider } from '../provider/ProfileProvider'

import { Button, Grid, GridItem, CircularProgress } from '@chakra-ui/react'


export default class HomePage extends React.Component<{}, { albuns: Album[], isOpenNewAlbum: boolean, isLoading: boolean }> {

	urlImage = `${getUrl()}/image`
	profileProvider = new ProfileProvider()

	constructor(props: any) {
		super(props);
		this.state = {
			isLoading: true,
			isOpenNewAlbum: false,
			albuns: []
		}
	}

	async componentDidMount(){
		withAuth().then(res => {
			if (res) this.getAlbums()
		})
	}

	getAlbums = () => {		
		this.profileProvider.fetchAlbums().then(
			res => {
				this.setState({ 
					albuns: res.data,
					isLoading: false 
				})
				
			},
			error => {
				console.log(error);
			}
		)
	}

	setOpenNewAlbum = (value: boolean): void => {
		this.setState({
			isOpenNewAlbum: value
		}, () => { })
	}

	onOpen = (): void => {
		this.setOpenNewAlbum(true)
	}
	
	onClose = (): void => {
		this.setOpenNewAlbum(false)
		this.getAlbums()
	}

	goToCollection = (album: Album): void => {
		// Router.push('/collection/[idAlbum]', `/collection/${album.idAlbum}`);
		Router.push(
			{
				pathname: `/collection`,
				query: {id: album.idAlbum}
			}
		);
	}

	render() {
		let albuns = []
		for (let i = 0; i < this.state.albuns.length; i++) {
			albuns.push(
				<span key={i} onClick={() => this.goToCollection(this.state.albuns[i])}>
					<CardImage
						title={this.state.albuns[i].title}
						desc={this.state.albuns[i].description}
						url={`${this.urlImage}/${this.state.albuns[i].coverUrl}`}>
					</CardImage>
				</span>
			)			
		}

		return (
			<div className='p-20'>
				<HeaderPrivate title='Meus álbuns de fotos'></HeaderPrivate>
				<Grid
					p='0px'
					templateRows='repeat(1, 1fr)'
					templateColumns='repeat(1, 1fr)'
				>
					<GridItem className='m-a' mb="15px">
						{ this.state.isLoading ? <CircularProgress isIndeterminate/> : albuns}					
					</GridItem>

					<GridItem className='footer' mb="15px">
						<span className='float-right p-20'>
							<Button
								colorScheme='blue'
								w='200px'
								onClick={this.onOpen}
							>Criar novo álbum
							</Button>

							<ModalComponent onClose={this.onClose}
								isOpen={this.state.isOpenNewAlbum}
								title="Criar Novo álbum"
								body={<FormNewAlbum></FormNewAlbum>}>
							</ModalComponent>
							
						</span>
					</GridItem>

				</Grid>
			</div>
		)
	}
}