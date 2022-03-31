import React from 'react'
import { Box, Text } from '@chakra-ui/react'

import style from '../styles/Global.module.scss'

const CardImage = (props: { url?: string, title?: string, desc?: string }) => (
  <Box className='float-left' float='left'>
    <img
      className={style.card}
      src={props.url}
      alt={props.desc}
    />
    <Text className='text-center'><b>{props.title}</b></Text>
    <Text className='text-center'><i>{props.desc}</i></Text>
  </Box>
)
export default CardImage
