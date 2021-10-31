import React, { PureComponent, useEffect, useState } from 'react'
import {
  Stack,
  Button,
  Text,
  Spinner,
  Flex,
  Grid,
  Box,
  useClipboard
} from '@chakra-ui/react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import firebase from '../../firebase/clientApp'
import { useRouter } from 'next/router'
import axios from 'axios'
import { FiLink } from 'react-icons/fi'

import { useUser } from '../../context/userContext'
import { FetchingActions } from '../../actions'
import GenerateNewProduct from '../p/index'

function CopyLink ({ value }) {
  const { hasCopied, onCopy } = useClipboard(value)

  return (
    <Button onClick={onCopy}>
      {hasCopied ? 'Copied' : (
        <FiLink style={{ fontSize: 18 }} />
      )}
    </Button>
  )
}

const { getShopProducts, getShopOrders } = FetchingActions

export const SignInComponent = () => {
  const auth = useUser()
  const { user } = auth
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  useEffect(async () => {
    if (user) {
      const products = await getShopProducts(user.uid)
      setProducts(products)
      const orders = await getShopOrders(user.uid)
      setOrders(orders)
    }
  }, [user])

  if (auth.loadingUser) {
    return (
      <Flex bg='#FFF' w='100vw' h='100vh' justify='center' align='center'>
        <Spinner color='#121212' size='md' />
      </Flex>
    )
  }

  return (
    <Stack
      w='100vw'
      maxWidth='800'
      h='100%'
    >
      <Text style={{ marginTop: '2rem', fontWeight: 'bold' }}>New payment link</Text>
      <GenerateNewProduct uid={user.uid} />
      {/* <Button
          style={{
            backgroundColor: '#28A445',
            width: '100%',
            marginTop: '1rem'
          }}
          onClick={() => null}
        >
          <Text style={{ color: '#FFFFFF' }}>Add product</Text>
        </Button> */}
      <Text style={{ marginTop: '2rem', fontWeight: 'bold' }}>Orders</Text>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        {orders.map(order => (
          <Stack key={order.info.id} borderRadius='xl' bg='#FFF' p='6' boxShadow='lg'>
            <Text>{order.info.name}</Text>
            <Text>{order.info.phoneNumber}</Text>
          </Stack>
        ))}
      </Grid>
      <Text style={{ marginTop: '2rem', fontWeight: 'bold' }}>Products</Text>
      <Grid
        style={{ marginTop: '2rem' }}
        templateColumns='repeat(3, 1fr)'
        gap={6}
      >
        {products.map(product => (
          <Box w='100%' h='250px' bg='#999' position='relative' key={product.id}>
            {product.quantity <= 0 ? (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15
              }}
              >
                <Text color='#FFFFFF'>Out of stock</Text>
              </div>
            ) : (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                padding: 8,
                borderRadius: 15
              }}
              >
                <Stack style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} py='6px' px='10px' borderRadius='xl'>
                  <Text color='#FFFFFF' fontSize={14}>
                    {`${product.quantity} remaining`}
                  </Text>
                </Stack>
                <CopyLink value={`https://seekrlive.com/p/${product.id}`} />
                {/* <Stack style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} py='6px' px='10px' borderRadius='xl'>
                  <Text color='#FFFFFF' fontSize={14} fontWeight='bold'>
                    {'Order Link'}
                  </Text>
                </Stack> */}
              </div>
            )}
            <img src={product.imageUrl} style={{ borderRadius: 15, width: '100%', objectFit: 'cover', height: '100%' }} />
          </Box>
        ))}
      </Grid>
    </Stack>
  )
}

export default class ShopScreen extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
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
      <Stack justifyContent='center' alignItems='center'>
        <SignInComponent />
      </Stack>
    )
  }
}

const styles = {}

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
