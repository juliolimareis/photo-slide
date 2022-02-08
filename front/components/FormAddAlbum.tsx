import React, { ChangeEvent } from 'react'

import { Album } from '../models/Album'

import { Input, Text, Button, Grid, GridItem, Textarea, CircularProgress } from '@chakra-ui/react'
import { ProfileProvider } from '../provider/ProfileProvider'

export default class FormAddAlbum extends React.Component<{}, {album: Album, isLoading: boolean}>{
	mbText: string = '8px'
	marginElement: string = '10px'
	profileProvider = new ProfileProvider()

	constructor(props: any) {
		super(props);
		this.state = {
			isLoading: false,
			album: {
				title: '',
				description: '',
				coverUrl: ''
			}
		}
	}

	dispatchAlbum = () => {

		this.setState({
			isLoading: true
		})

		// console.log(this.state.album);
		
		this.profileProvider.addAlbum(this.state.album).then(
			() => {
				this.setState({
					isLoading: false,
					album: {
						title: '',
						description: '',
						coverUrl: ''
					},
				})
			},
			error => {
				console.log(error);
			}
		)
	}

	setValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
		const album: any = this.state.album
		album[fieldName] = e.target.value
		
		this.setState({
			album: album
		})
	}

	// setTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
	// 	this.setState({
	// 		album: {
	// 			title: e.target.value,
	// 		}
	// 	})
	// }
	
	// setDescription = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
	// 	this.setState({
	// 		album: {
	// 			description: e.target.value,
	// 		}
	// 	})
	// }

	render() {
		return (
			<Grid
				p='20px'
				templateRows='repeat(2, 1fr)'
				templateColumns='repeat(1, 1fr)'
				gap={2}
			>
				<GridItem rowSpan={4}>
					<Text mb={this.mbText}>Titulo:</Text>
					<Input
						value={this.state.album.title}
						onChange={(e) => {this.setValue(e, 'title')}}
						placeholder='titulo'
						size='sm'
					/>
				</GridItem>

				<GridItem rowSpan={4}>
					<Text mb={this.mbText}>Descrição:</Text>
					<Textarea
						value={this.state.album.description}
						onChange={(e) => {this.setValue(e, 'description')}}
						placeholder='descrição'
						type='textarea'
						size='sm'
					/>
				</GridItem>

				<GridItem className='text-center' mt='20px'>
					{ this.state.isLoading ? <CircularProgress isIndeterminate/> : <Button colorScheme='blue' w='200px' onClick={this.dispatchAlbum}>Criar</Button> }
				</GridItem>

			</Grid>
		)
	}
}