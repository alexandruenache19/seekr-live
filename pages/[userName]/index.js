import React, { PureComponent, useEffect, useState } from "react";
import { withRouter } from "next/router";
import { Pressable } from 'react-native'

import { getUser, getUserId } from "../../actions/auth";

import EventPage from "../e/[id]";

import {
  Stack,
  Avatar,
  Button,
  Text,
  Spinner,
  Flex,
  Grid,
  SimpleGrid,
  Box,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  useClipboard
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FiLink, FiPlus } from 'react-icons/fi'

import { useUser } from '../../context/userContext'
import { FetchingActions } from '../../actions'
import GenerateNewProduct from '../p/index'

function CopyLink({ value }) {
  const { hasCopied, onCopy } = useClipboard(value)

  return (
    <Button onClick={onCopy}>
      {hasCopied ? 'Copied' : <FiLink style={{ fontSize: 18 }} />}
    </Button>
  )
}

const { getShopProducts, getShopOrders } = FetchingActions

const ShopPage = ({ isOnMobile, userProfile }) => {
  const auth = useUser()
  const { user } = auth
  const router = useRouter()
  // const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [isModalOpen, setOpenModal] = useState(false)

  const products = userProfile.shop && userProfile.shop.products ? Object.values(userProfile.shop.products) : []

  // useEffect(async () => {
  //   if (user) {
  //     const products = await getShopProducts(user.uid)
  //     setProducts(products)
  //     const orders = await getShopOrders(user.uid)
  //     setOrders(orders)
  //   }
  // }, [user])

  if (auth.loadingUser) {
    return (
      <Flex bg='#FFF' w='100vw' h='100vh' justify='center' align='center'>
        <Spinner color='#121212' size='md' />
      </Flex>
    )
  }

  return (
    <Stack maxWidth='850' h='100%' style={{ padding: '3rem 1rem' }}>
      {/* <Text style={{ marginTop: '2rem', fontWeight: 'bold' }}>Orders</Text>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        {orders.map(order => (
          <Stack
            key={order.info.id}
            borderRadius='xl'
            bg='#FFF'
            p='6'
            boxShadow='lg'
          >
            <Text>{order.info.name}</Text>
            <Text>{order.info.phoneNumber}</Text>
          </Stack>
        ))}
      </Grid> */}
      <Stack justifyContent="center" alignItems="center">
        <Avatar src={userProfile.info.imageURL} size="xl" />
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {`${userProfile.info.username}`}
        </Text>
      </Stack>
      {/* <Text style={{ marginTop: '2rem', fontWeight: 'bold' }}>Orders</Text> */}
      {/* <Grid */}
      <SimpleGrid
        style={{ marginTop: '2rem', marginBottom: '2rem' }}
        // templateColumns='repeat(3, 1fr)'
        // gap={6}
        columns={{ sm: 2, md: 3, lg: 3 }}
        spacing="20px"
      >
        {products.map(product => (
          <Box
            w='100%'
            h='250px'
            bg='#999'
            borderRadius='15px'
            position='relative'
            key={product.id}
          >
            {product.quantity <= 0 ? (
              <div
                style={{
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
              <div
                className='product-layer'
                onClick={() => window.location.href = `https://seekrlive.com/p/${product.id}`}
                style={{
                  cursor: 'pointer',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  padding: 8,
                  borderRadius: 15
                }}
              >
                <Stack
                  style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                  py='6px'
                  px='10px'
                  borderRadius='xl'
                  className='quantity-label'
                >
                  <Text color='#FFFFFF' fontSize={14}>
                    {`${product.quantity} remaining`}
                  </Text>
                </Stack>
                <Flex justify='space-between' w='100%' className='product-bottom-info'>
                  <Stack
                    style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    py='6px'
                    px='10px'
                    borderRadius='xl'
                    className='price-label'
                  >
                    <Text color='#FFFFFF' fontSize={14}>
                      {`${product.price} ${product.currency || 'RON'}`}
                    </Text>
                  </Stack>
                  <Pressable onPress={() => alert('add to cart')}>
                    <Stack
                      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                      p='6px'
                      borderRadius='xl'
                      align='center'
                      justify='center'
                    >
                      <FiPlus style={{ fontSize: 20, color: '#FFFFFF' }} />
                    </Stack>
                  </Pressable>
                </Flex>
                <div className='product-order-button' style={{ display: 'none', width: '100%' }}>
                  <Pressable onPress={() => alert('add to cart')} style={{ width: '100%' }}>
                    <Stack
                      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                      py='6px'
                      px='10px'
                      borderRadius='xl'
                      className='price-label'
                    >
                      <Text color='#FFFFFF' fontSize={14} textAlign='center'>
                        {`Add to card`}
                      </Text>
                    </Stack>
                  </Pressable>
                </div>
                {/* <CopyLink value={`https://seekrlive.com/p/${product.id}`} /> */}
                {/* <Stack style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} py='6px' px='10px' borderRadius='xl'>
                  <Text color='#FFFFFF' fontSize={14} fontWeight='bold'>
                    {'Order Link'}
                  </Text>
                </Stack> */}
              </div>
            )}
            <img
              src={product.imageUrl}
              style={{
                borderRadius: 15,
                width: '100%',
                objectFit: 'cover',
                height: '100%'
              }}
            />
          </Box>
        ))}
      </SimpleGrid>

      <Modal
        motionPreset='scale'
        isCentered
        isOpen={isModalOpen}
        onClose={() => setOpenModal(false)}
        size='2xl'
      >
        <ModalOverlay />
        <ModalContent
          p={isOnMobile ? 0 : 10}
          py={isOnMobile ? 5 : 10}
          borderRadius={isOnMobile ? 10 : 30}
        >
          <ModalCloseButton />
          <ModalBody>
            <Stack />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  )
}

class UserPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentEventId: null
    };
  }

  componentDidMount() {
    const { userProfile } = this.props;
    if (userProfile && userProfile.events && userProfile.events.current) {
      this.setState({ currentEventId: userProfile.events.current });
    }
  }

  render() {
    const { currentEventId } = this.state;
    const { isOnMobile, userProfile } = this.props;
    if (currentEventId) {
      return <EventPage eventId={currentEventId} isOnMobile={isOnMobile} />;
    } else {
      return (
        <ShopPage userProfile={userProfile} />
      );
    }
  }
}

export const getServerSideProps = async context => {
  const { userName } = context.params;

  const uid = await getUserId(userName);
  const userProfile = await getUser(uid);

  let userAgent;
  if (context.req) {
    // if you are on the server and you get a 'req' property from your context
    userAgent = context.req.headers["user-agent"]; // get the user-agent from the headers
  } else {
    userAgent = navigator.userAgent; // if you are on the client you can access the navigator from the window object
  }

  const isOnMobile = Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return { props: { userProfile: userProfile, isOnMobile } };
};

const styles = {};

export default withRouter(UserPage);
