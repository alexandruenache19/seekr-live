import React, { PureComponent, useEffect, useState } from 'react'
import {
  Stack,
  Button,
  Text,
  Spinner,
  Flex
} from '@chakra-ui/react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import firebase from '../../firebase/clientApp'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useUser } from '../../context/userContext'

export const SignInComponent = () => {
  const auth = useUser()

  const router = useRouter()
  // auth.signOut();
  //   if (!auth.user) {
  //     router.push('/signin')
  //   }

  useEffect(() => {
    console.log('auth', auth)
  }, [])

  if (auth.loadingUser) {
    return (
      <Flex bg='#FFF' w='100vw' h='100vh' justify='center' align='center'>
        <Spinner size='xl' thickness='3px' />
      </Flex>
    )
  }

  return (
    <Stack bg='red' width='100vw' h='100vh' />
  )
}

export default class ShopScreen extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    const {
      loading,
      isAvailable,
      paymentUrl,
      product,
      paidProduct
    } = this.state
    return (
      <Stack>
        <Stack />
        <SignInComponent />
      </Stack>
    )
  }
}

const styles = {
  formRow: {
    marginTop: '1rem'
  }
}

export const getServerSideProps = async context => {
  let userAgent
  if (context.req) {
    // if you are on the server and you get a 'req' property from your context
    userAgent = context.req.headers['user-agent'] // get the user-agent from the headers
  } else {
    userAgent = navigator.userAgent // if you are on the client you can access the navigator from the window object
  }

  const isOnMobile = Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  )

  return {
    props: {
      isOnMobile
      // query: router.query
    }
  }
}
