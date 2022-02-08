import React from "react"
import { Photo } from "../models/Photo"

import { ProfileProvider } from "../provider/ProfileProvider"
import { Button, Grid, GridItem, Text, ModalOverlay, Center } from "@chakra-ui/react"

export default class ImageComponent extends React.Component
	<{
		photo?: Photo, 
	}, any>{

	profileProvider = new ProfileProvider()
	urlImage = `${process.env.API_URL}/image`

	render() {
		return (
			<Grid
			mt='30px'
			templateRows='repeat(1, 1fr)'
			templateColumns='repeat(1, 1fr)'
			>
				<GridItem w='100%' h='100%'>
					<Center>
						<img src={`${this.urlImage}/${this.props.photo?.serverName}`} alt={this.props.photo?.title} />
					</Center>
				</GridItem>
				
				<GridItem w='100%' h='100%' justifySelf='center' alignSelf='center' alignContent='center'>
					<Text className="text-center" mt='3'>{this.props.photo?.description}</Text>
				</GridItem>
			</Grid>
		)
	}
}