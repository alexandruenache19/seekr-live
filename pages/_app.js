import UserProvider from '../context/userContext'
import { ChakraProvider } from "@chakra-ui/react"

// Custom App to wrap it with context provider
export default function App({ Component, pageProps }) {

  return (
    <ChakraProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  )
}
