import Title from './Title'
import { Box } from '@chakra-ui/react'
import React, { useContext } from 'react'
import UserContext from '../core/UserContext'
import useLogout from '../core/hooks/useLogout'

const HeaderPrivate = (props: { title: string }): JSX.Element => {
	const {user} = useContext(UserContext)
	const logout = useLogout()
  
  return (
    <Box mb={5}>
      <Title name={props.title}></Title>

      <Box as='span' className='float-right'>
        <Box as='span' className='mr-10'> Olá, <Box as='b'>{user.name}</Box></Box>
        <Box as='span' className='link' onClick={logout}>[Sair]</Box>
      </Box>

      <Box as='hr'/>
    </Box>
  )
}

export default HeaderPrivate
