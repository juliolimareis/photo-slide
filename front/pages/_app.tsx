import React from 'react'
import '../styles/helpers.scss'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '../core/UserProvider'
import theme from '../libs/theme'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
		<UserProvider>
    	<Component {...pageProps} />
		</UserProvider>
  </ChakraProvider>
)
export default MyApp
