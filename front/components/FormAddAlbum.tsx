import { Album } from '../models/Album'

import React, { ChangeEvent, useContext, useState } from 'react'

import { Message } from '../core/Messages'

import { ProfileRepository } from '../provider/ProfileRepository'

import useAlert from '../core/hooks/useAlert'
import useErrorRequest from '../core/hooks/useErrorRequest'

import { Input, Text, Button, Grid, GridItem, Textarea, CircularProgress } from '@chakra-ui/react'
import UserContext from '../core/UserContext'

const FormAddAlbum = (props: { onSend(): void }) => {
	const {getAlbums} = useContext(UserContext)


	const alert = useAlert()
	const errorRequest = useErrorRequest()

  const mbText: string = '8px'
  const profileRepository = new ProfileRepository()
	
	const [isLoading, setLoading] = useState<boolean>(false)

  const [album, setAlbum] = useState<Album>({
    title: '',
    coverUrl: '',
    description: '',
  })
	

  const dispatchAlbum = () => {
    setLoading(true)
    profileRepository.addAlbum(album).then(
      () => {
        setAlbum({
          title: '',
          description: '',
          coverUrl: ''
        })
				getAlbums()
				alert('success', Message.ALBUM_ADD.replace('{album}', album.title as string))
        props.onSend()
      },
      err => errorRequest(err)
    ).finally(() => setLoading(false))
  }

  const handleAlbum = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAlbum({
			...album,
			[e.target.name]: e.target.value
		})
  }

  return (
    <Grid
      p='20px'
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(1, 1fr)'
      gap={2}
    >
      <GridItem rowSpan={4}>
        <Text mb={mbText}>Titulo:</Text>
        <Input
          name='title'
          value={album.title}
          onChange={handleAlbum}
          placeholder='titulo'
          size='sm'
        />
      </GridItem>

      <GridItem rowSpan={4}>
        <Text mb={mbText}>Descrição:</Text>
        <Textarea
          name='description'
          value={album.description}
          onChange={handleAlbum}
          placeholder='descrição'
          type='textarea'
          size='sm'
        />
      </GridItem>

      <GridItem className='text-center' mt='20px'>
        {isLoading ? <CircularProgress isIndeterminate /> : <Button colorScheme='blue' w='200px' onClick={dispatchAlbum}>Criar</Button>}
      </GridItem>

    </Grid>
  )
}
export default FormAddAlbum
