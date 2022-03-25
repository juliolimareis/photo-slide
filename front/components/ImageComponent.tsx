import React from "react"
import { Photo } from "../models/Photo"

import { getUrl } from "../config/api"
import { Grid, GridItem, Text, Center } from "@chakra-ui/react"

export default function ImageComponent(props: {photo: Photo}) {
	const urlImage = `${getUrl()}/image`

	return (
		<Grid
			mt='30px'
			templateRows='repeat(1, 1fr)'
			templateColumns='repeat(1, 1fr)'
		>
			<GridItem w='100%' h='100%'>
				<Center>
					<img src={`${urlImage}/${props.photo.serverName}`} alt={props.photo.title} />
				</Center>
			</GridItem>

			<GridItem w='100%' h='100%' justifySelf='center' alignSelf='center' alignContent='center'>
				<Text className="text-center" mt='3'>{props.photo.description}</Text>
			</GridItem>
		</Grid>
	)
}