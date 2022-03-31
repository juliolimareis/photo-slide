import Router from 'next/router'
import { AxiosError } from 'axios'
import { Photo } from '../models/Photo'
import { Message } from '../core/Messages'
// import useSnackbar from '../core/useSnackbar'
import React, { ChangeEvent, useEffect } from 'react'
import { ProfileProvider } from '../provider/ProfileProvider'
import { Input, Text, Button, Grid, GridItem, Textarea, CircularProgress, Box } from '@chakra-ui/react'

const FormAddPhoto = (props: { beforeSend(): void }): JSX.Element => {
	// const snackbar = useSnackbar()

	const mbText: string = '8px'
	const marginElement: string = '10px'
	const profileProvider = new ProfileProvider()

	const [photo, setPhoto] = React.useState<Photo>({})
	const [photos, setPhotos] = React.useState<Photo[] | any>([])
	const [isLoading, setLoading] = React.useState<boolean>(false)
	const [isError, setError] = React.useState<boolean>(false)
	const [files, setFiles] = React.useState<FileList | null>()
	const [messages, setMessages] = React.useState<string[]>([])
	const [message, setMessage] = React.useState<string>("")
	const [idAlbum, setIdAlbum] = React.useState<string>("")

	useEffect(() => {
		setIdAlbum(`${Router.query.id}`)
	}, [])

	useEffect(() => {
		if (!isError) {
			setMessages([])
		}
	}, [isError])

	const handlePhoto = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, index: number
	): void => {

		let photo: any = {}

		if (photos[index]) {
			photo = photos[index]
		}

		photo[e.target.name] = e.target.value

		const _photos: any = photos

		if (!photos[index]) {
			_photos.push(photo)
		}

		setPhotos(_photos)
	}

	const handleFiles = (e: ChangeEvent<HTMLInputElement>): void => {
		const photos = []
		setError(false)

		if (e.target.files) {
			for (let i = 0; i < e.target.files.length; i++) {
				photos.push({
					title: e.target.files[i].name.split('.')[0],
				})
			}
		}

		setPhotos(photos)
		setFiles(e.target.files)
	}

	const uploadPhotos = async () => {
		if (!idAlbum) {
			Router.replace('/home')
		}

		setLoading(true)

		let continueUpload = true

		if (files) {
			for (let i = 0; i < files.length && continueUpload; i++) {
				let file = files[i];
				let formData = new FormData();
				formData.append("file", file);

				await profileProvider.uploadPhoto(idAlbum, formData).then(
					(res: any) => {
						updatePhoto(res.data, i)
					},
					(error: AxiosError) => {
						let fileName = ''
						if (files) {
							fileName = files[i].name
						}
						setMessageRequestError(error, fileName)
					})
			}
		}

		setLoading(false)

		if (!isError) {
			props.beforeSend()
		}

	}

	const updatePhoto = async (photo: Photo, index: number): Promise<boolean> => {
		let isUpdate = true

		photo.title = photos[index].title
		photo.color = photos[index].color,
			photo.description = photos[index].description,
			photo.datetimeCreation = photos[index].datetimeCreation

		await profileProvider.updatePhoto(photo.idPhoto ?? 0, photo)
			.catch((error: AxiosError) => {
				isUpdate = false
				setMessageRequestError(error, photo.fileName)
			})
		return isUpdate
	}

	const setMessageRequestError = (error: AxiosError, photoName?: string): void => {
		let message = 'Erro desconhecido.'

		if (error.response?.status == 400) {
			// snackbar({
			// 	description: Message.PHOTO_ERROR_SIZE.replace('{photoName}', photoName ?? "")
			// })
			message = Message.PHOTO_ERROR_SIZE.replace('{photoName}', photoName ?? "")
		}

		setMessages([message])
		setError(true)
		console.log(error);
	}

	const getValue = (fieldName: string, index: number): string => {
		if (photos[index] && photos[index][fieldName]) {
			return photos[index][fieldName]
		} return ''
	}

	return (
		<Box>
			<GridItem rowSpan={4}>
				<Text mb={mbText}>Selecionar fotos:</Text>
				<Input
					onChange={handleFiles}
					size='sm'
					type='file'
					multiple
					accept=".jpg,.jpeg,.png"
				/>
			</GridItem>

			{/* <GridItem rowSpan={4}>
				{messages}
			</GridItem> */}

			<GridItem rowSpan={4}>
				<FormPhoto 
					mbText={mbText}
					photos={photos}
					handlePhoto={handleFiles}
				/>
			</GridItem>

			{
				photos.length > 0 && (
					<GridItem className='text-center' mt='20px'>
						{
							isLoading ? 
								<CircularProgress isIndeterminate />
							:
								<Button
									colorScheme='blue'
									w='200px'
									onClick={uploadPhotos}
								>
									Enviar
								</Button>
							}
					</GridItem>
				)
			}


		</Box>
	)

}

const MessagesDanger = (props: { messages: string[] }): JSX.Element => (
	<Box>
		{props.messages.map(
			(message: string, index: number) => (
				<Text key={index} color="orange">{message}</Text>
			)
		)}
	</Box>
)

const FormPhoto = (
	props: {
		mbText: string,
		photos: Photo[],
		handlePhoto(e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, index: number): void
	}): JSX.Element => {

	return (
		<Box>
			{
				props.photos.map((photo: Photo, i: number) => (
					<Grid
						key={i}
						p='20px'
						templateRows='repeat(2, 1fr)'
						templateColumns='repeat(1, 1fr)'
						gap={2}
					>
						<GridItem rowSpan={4}>
							<Text className='text-center' mb={props.mbText}>
								<b>{i+1} - {photo.title}</b>
							</Text>
							<Text mb={props.mbText}>Titulo:</Text>
							<Input
								name='title'
								onChange={(e) => { props.handlePhoto(e, i) }}
								placeholder={photo.title}
								size='sm'
							/>
						</GridItem>

						<GridItem rowSpan={4}>
							<Text mb={props.mbText}>Descrição:</Text>
							<Textarea
								name='description'
								onChange={(e) => { props.handlePhoto(e, i) }}
								placeholder='descrição'
								type='textarea'
								size='sm'
							/>
						</GridItem>

						<GridItem rowSpan={4}>
							<Text mb={props.mbText}>Data/Hora de aquisição:</Text>
							<Input
								name='datetimeCreation'
								onChange={(e) => { props.handlePhoto(e, i) }}
								placeholder='dd/mm/aaaa hh:mm:ss'
								size='sm'
							/>
						</GridItem>

						<GridItem rowSpan={4}>
							<Text mb={props.mbText}>Cor predominante:</Text>
							<Input
								name='color'
								onChange={(e) => { props.handlePhoto(e, i) }}
								placeholder='#00000'
								size='sm'
							/>
						</GridItem>

						<GridItem>
							<hr className="mt-20" />
						</GridItem>

					</Grid>
				))
			}
		</Box>
	)
}

export default FormAddPhoto

