import { Album } from '../models/Album'
import React, { ChangeEvent, useState } from 'react'
import { ProfileProvider } from '../provider/ProfileProvider'
import { Input, Text, Button, Grid, GridItem, Textarea, CircularProgress } from '@chakra-ui/react'

const FormAddAlbum = (props: { onSend(): void }) => {
  const mbText: string = '8px'
  const profileProvider = new ProfileProvider()

  const [album, setAlbum] = useState<Album>({
    title: '',
    coverUrl: '',
    description: '',
  })
  const [isLoading, setLoading] = useState<boolean>(false)

  const dispatchAlbum = async () => {
    setLoading(true)

    await profileProvider.addAlbum(album).then(
      () => {
        setAlbum({
          title: '',
          description: '',
          coverUrl: ''
        })
        props.onSend()
      },
      error => {
        console.log(error);
      }
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
