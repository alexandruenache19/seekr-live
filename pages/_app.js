import UserProvider from '../context/userContext'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '../styles/styles.css'
import '../styles/checkout.css'

import 'react-modal-video/css/modal-video.css'

import { mode } from '@chakra-ui/theme-tools'
const theme = extendTheme({
  styles: {
    global: props => ({
      body: {
        fontFamily: 'Poppins',
        color: '#081c15',
        lineHeight: 'base'
      }
    })
  }
})

// Custom App to wrap it with context provider
export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  )
}
