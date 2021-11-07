import React, { Component } from 'react'
import { withRouter } from 'next/router'
import {
  Flex,
  Stack,
  Text,
  Avatar,
  Center,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/react'
import Lottie from 'react-lottie'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { FiEye, FiShare } from 'react-icons/fi'
import * as animationData from './live.json'
import { MessageInput, CommentsList } from '../../../components'
import firebase from '../../../firebase/clientApp'
import AmazonIVS from '../../molecules/seller/AmazonIVS'

class LiveScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      productInfo: null,
      orderQuantity: 1,
      viewers: 0,
      address: null,
      addressDetails: null,
      name: null,
      phoneNumber: null,
      isCheckoutModalOpen: false
    }
    this.handleOrder = this.handleOrder.bind(this)
    this.handleShare = this.handleShare.bind(this)
    this.handleFollow = this.handleFollow.bind(this)
  }

  componentDidMount () {
    const { eventInfo } = this.props

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    firebase
      .database()
      .ref(`events/${eventInfo.id}/info/viewers`)
      .set(firebase.database.ServerValue.increment(1))

    this.productInfoListener = firebase
      .database()
      .ref(`events/${eventInfo.id}/products/${eventInfo.currentProductId}`)
      .on('value', async snapshot => {
        this.setState({
          productInfo: snapshot.val()
        })
      })

    this.viewsInfoListener = firebase
      .database()
      .ref(`events/${eventInfo.id}/info/viewers`)
      .on('value', snapshot => {
        if (snapshot.exists()) {
          this.setState({
            viewers: snapshot.val()
          })
        }
      })

    window.onbeforeunload = function () {
      firebase
        .database()
        .ref(`events/${eventInfo.id}/info/viewers`)
        .set(firebase.database.ServerValue.increment(-1))
    }
  }

  async componentDidUpdate (prevProps, prevState) {
    const { eventInfo } = this.props
    if (
      (prevProps.eventInfo.currentProductId &&
        this.props.eventInfo.currentProductId &&
        prevProps.eventInfo.currentProductId !==
        this.props.eventInfo.currentProductId) ||
      (!prevProps.eventInfo.currentProductId &&
        this.props.eventInfo.currentProductId)
    ) {
      this.productInfoListener = firebase
        .database()
        .ref(`events/${eventInfo.id}/products/${eventInfo.currentProductId}`)
        .on('value', snapshot => {
          this.setState({
            productInfo: snapshot.val()
          })
        })
    }
  }

  componentWillUnmount () {
    const { eventInfo } = this.props
    this.productInfoListener &&
      firebase
        .database()
        .ref(`events/${eventInfo.id}/products/${eventInfo.currentProductId}`)
        .off('value', this.productInfoListener)
  }

  handleOrder () {
    const { eventInfo, sellerInfo } = this.props

    const {
      productInfo,
      orderQuantity,
      address,
      city,
      country,
      postalCode,
      addressLine1,
      addressLine2,
      name,
      phoneNumber
    } = this.state
    // this.props.onOpenModal('order', {
    this.props.onOpenModal('payment', {
      sellerUsername: sellerInfo.username,
      productInfo: productInfo,
      eventInfo: eventInfo,
      orderQuantity: orderQuantity,
      totalPrice: productInfo.price * orderQuantity,
      address: address,
      city: city,
      country: country,
      postalCode: postalCode,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      name: name,
      phoneNumber: phoneNumber,
      sellerStripeId: sellerInfo.stripeId,
      setDetailsInHomeState: details => {
        this.setState({
          address: details.address,
          city: details.city,
          country: details.country,
          postalCode: details.postalCode,
          addressLine1: details.addressLine1 || null,
          addressLine2: details.addressLine2 || null,
          name: details.name,
          phoneNumber: details.phoneNumber
        })
      }
    })
  }

  handleShare () {
    const { sellerInfo } = this.props
    this.props.onOpenModal('share', {
      username: sellerInfo.username,
      shareUrl: window.location.href
    })
  }

  handleFollow () {
    this.props.onOpenModal('follow', {})
  }

  render () {
    const {
      isOnMobile,
      sellerInfo,
      eventInfo,
      comments,
      username
    } = this.props
    const {
      productInfo,
      orderQuantity,
      viewers,
      isCheckoutModalOpen
    } = this.state

    if (isOnMobile) {
      return (
        <Stack w='100vw' bg='#FFF' p='10px' className='perfect-height-wrapper'>
          <Stack
            h='100%'
            bg='rgba(0,0,0,0.9)'
            borderRadius='xl'
            overflow='hidden'
            position='relative'
            justifyContent='center'
            alignItems='center'
          >
            <AmazonIVS isOnMobile={isOnMobile} url={eventInfo.liveURL} />

            <Button
              position='absolute'
              top='8px'
              right='12px'
              h='2em'
              w='2em'
              minW='0'
              p='5px'
              borderRadius='50%'
              align='center'
              justify='center'
              bg='transparent'
              onClick={this.handleShare}
            >
              <FiShare style={{ fontSize: 18, color: '#FFF' }} />
            </Button>

            {productInfo ? (
              <Stack
                position='absolute'
                left='0px'
                bottom='0px'
                p='10px'
                w='100%'
                flex={1}
              >
                <Flex
                  borderRadius='xl'
                  bg='rgba(0,0,0,0.3)'
                  p='6px'
                  align='center'
                  w='auto'
                  minW={0}
                >
                  {productInfo.imageURL ? (
                    <img
                      src={productInfo.imageURL}
                      style={{
                        height: 50,
                        width: 50,
                        objectFit: 'cover',
                        borderRadius: 10,
                        marginRight: 8
                      }}
                    />
                  ) : null}
                  <Stack
                    justifyContent='center'
                    style={{ marginTop: 0, paddingRight: 4 }}
                  >
                    <Text color='#FFF' fontSize='14' fontWeight='normal'>
                      {`${productInfo.currentStock} remaining`}
                    </Text>
                    <Text color='#FFF' fontWeight='bold' fontSize='14' style={{ marginTop: '0.1rem' }}>
                      {`${productInfo.price} ${productInfo.currency}`}
                    </Text>
                  </Stack>
                </Flex>
                {productInfo.currentStock > 0 ? (
                  <Button
                    borderRadius='xl'
                    style={{
                      justifyContent: 'center',
                      backgroundColor: '#000'
                    }}
                    onClick={this.handleOrder}
                  >
                    <Text pr='10px' color='#FFFFFF'>
                      Place Order
                    </Text>
                  </Button>
                ) : (
                  <Button
                    borderRadius='xl'
                    onClick={() => null}
                    style={{
                      justifyContent: 'center',
                      backgroundColor: '#999'
                    }}
                  >
                    <Text pr='10px' color='#FFFFFF'>
                      Waiting for the next item
                    </Text>
                  </Button>
                )}
              </Stack>
            ) : null}
            <Stack
              position='absolute'
              left='10px'
              top='10px'
              borderRadius='xl'
              p='5px'
              bg='rgba(0,0,0,0.3)'
              zIndex={10}
              style={{ marginTop: 0, justifyContent: 'flex-start' }}
            >
              <Flex justify='flex-start' alignItems='center'>
                <Avatar
                  size='sm'
                  name={sellerInfo.username}
                  src={sellerInfo.imageURL}
                />
                <Stack
                  style={{
                    marginTop: 0,
                    marginLeft: 5,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'
                  }}
                >
                  <Text
                    noOfLines={1}
                    textOverflow='ellipsis'
                    maxW='100px'
                    fontWeight='bold'
                    color='#FFF'
                    fontSize={12}
                  >
                    @{sellerInfo.username}
                  </Text>
                  <Center
                    style={{ marginTop: 0, justifyContent: 'flex-start' }}
                  >
                    <Center style={{ marginLeft: -3 }}>
                      <Lottie
                        options={{
                          loop: true,
                          autoplay: true,
                          animationData: animationData
                        }}
                        height={20}
                        width={20}
                      />
                      <Text pl='2px' color='#FFF' fontSize={10}>
                        Live
                      </Text>
                    </Center>
                    <Center ml='5px' textAlign='center'>
                      <FiEye size={14} color='#FFF' />
                      <Text fontSize={10} color='#FFF' textAlign='center' ml='3px'>
                        {viewers}
                      </Text>
                    </Center>
                  </Center>
                </Stack>
              </Flex>
            </Stack>
          </Stack>

          <Stack
            p='10px'
            h='25vh'
            bg='#EEF2F8'
            borderRadius='xl'
            style={{ justifyContent: 'space-between' }}
          >
            <Center
              style={{
                flex: 1,
                marginBottom: 5,
                overflow: 'scroll',
                alignItems: 'flex-start'
              }}
            >
              <CommentsList comments={comments} />
            </Center>
            <MessageInput
              onOpenModal={this.props.onOpenModal}
              username={username}
              eventId={eventInfo.id}
            />
          </Stack>
        </Stack>
      )
    }

    return (
      <Flex bg='#FFF' className='perfect-height-wrapper' w='100vw' justify='space-between'>
        <Stack w='70vw'>
          <Center p='20px' h='100%' w='100%'>
            <Stack
              h='100%'
              w='100%'
              bg='rgba(0,0,0,0.9)'
              borderRadius='20px'
              overflow='hidden'
              position='relative'
            >
              <Flex
                h='100%'
                flex={1}
                style={{ boxShadow: '0px 0px 36px 2px rgba(0,0,0,0.12)' }}
              >
                <AmazonIVS url={eventInfo.liveURL} />
              </Flex>

              <Button
                position='absolute'
                top='8px'
                right='14px'
                h='2em'
                w='2em'
                minW='0'
                p='5px'
                borderRadius='50%'
                align='center'
                justify='center'
                bg='transparent'
                onClick={this.handleShare}
              >
                <FiShare style={{ fontSize: 18, color: '#FFF' }} />
              </Button>

              <Stack
                position='absolute'
                left='15px'
                top='15px'
                borderRadius='xl'
                p='5px'
                bg='rgba(0,0,0,0.3)'
                zIndex={10}
                style={{ marginTop: 0, justifyContent: 'flex-start' }}
              >
                <Flex justify='flex-start' alignItems='center'>
                  <Avatar
                    // size='sm'
                    style={{ width: 40, height: 40 }}
                    name={sellerInfo.username}
                    src={sellerInfo.imageURL}
                  />
                  <Stack
                    style={{
                      marginTop: 0,
                      marginLeft: 8,
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start'
                    }}
                  >
                    <Text
                      noOfLines={1}
                      textOverflow='ellipsis'
                      maxW='100px'
                      fontWeight='bold'
                      color='#FFF'
                      fontSize={14}
                    >
                      @{sellerInfo.username}
                    </Text>
                    <Center
                      style={{ marginTop: 0, justifyContent: 'flex-start' }}
                    >
                      <Center style={{ marginLeft: -3 }}>
                        <Lottie
                          options={{
                            loop: true,
                            autoplay: true,
                            animationData: animationData
                          }}
                          height={20}
                          width={20}
                        />
                        <Text pl='2px' color='#FFF' fontSize={12}>
                          Live
                        </Text>
                      </Center>
                      <Center ml='5px' textAlign='center'>
                        <FiEye size={14} color='#FFF' />
                        <Text fontSize={12} color='#FFF' textAlign='center' ml='3px'>
                          {viewers}
                        </Text>
                      </Center>
                    </Center>
                  </Stack>
                </Flex>
              </Stack>

              {productInfo ? (
                <Stack
                  position='absolute'
                  left='0px'
                  bottom='0px'
                  p='15px'
                  w='100%'
                  flex={1}
                >
                  <Flex
                    borderRadius='xl'
                    bg='rgba(0,0,0,0.3)'
                    p='8px'
                    align='center'
                    w='auto'
                    minW={0}
                  >
                    {productInfo.imageURL ? (
                      <img
                        src={productInfo.imageURL}
                        style={{
                          height: 50,
                          width: 50,
                          objectFit: 'cover',
                          borderRadius: 10,
                          marginRight: 8
                        }}
                      />
                    ) : null}
                    <Stack
                      justifyContent='center'
                      style={{ marginTop: 0, paddingRight: 4 }}
                    >
                      <Text color='#FFF' fontSize='14' fontWeight='normal'>
                        {`${productInfo.currentStock} remaining`}
                      </Text>
                      <Text color='#FFF' fontWeight='bold' fontSize='14' style={{ marginTop: '0.1rem' }}>
                        {`${productInfo.price} ${productInfo.currency}`}
                      </Text>
                    </Stack>
                  </Flex>
                  {productInfo.currentStock > 0 ? (
                    <Button
                      borderRadius='xl'
                      style={{
                        justifyContent: 'center',
                        backgroundColor: '#000'
                      }}
                      onClick={this.handleOrder}
                    >
                      <Text pr='10px' color='#FFFFFF'>
                        Place Order
                      </Text>
                    </Button>
                  ) : (
                    <Button
                      borderRadius='xl'
                      onClick={() => null}
                      style={{
                        justifyContent: 'center',
                        backgroundColor: '#999'
                      }}
                    >
                      <Text pr='10px' color='#FFFFFF'>
                        Waiting for the next item
                      </Text>
                    </Button>
                  )}
                </Stack>
              ) : null}
            </Stack>
          </Center>

          {/* {eventInfo.currentProductId && productInfo ? (
            <Center px='20px' h='15vh' w='100%' style={{ marginTop: 0 }}>
              <Flex
                h='100%'
                w='100%'
                bg='#FFFFFF'
                borderRadius='xl'
                overflow='hidden'
                align='center'
                style={{ justifyContent: 'space-between', marginTop: 0 }}
              >
                <Flex justify='space-between' align='center'>
                  <Button
                    size='sm'
                    bg='transparent'
                    onClick={() => {
                      if (orderQuantity > 1) {
                        this.setState({ orderQuantity: orderQuantity - 1 })
                      }
                    }}
                  >
                    <FaMinus size={14} />
                  </Button>
                  <Text px='10px' fontSize='xl'>
                    {orderQuantity}
                  </Text>
                  <Button
                    size='sm'
                    bg='transparent'
                    onClick={() => {
                      if (orderQuantity <= productInfo.currentStock - 1) {
                        this.setState({ orderQuantity: orderQuantity + 1 })
                      } else {
                        alert('Not enough stock')
                      }
                    }}
                  >
                    <FaPlus size={14} />
                  </Button>
                </Flex>
                <Flex align='flex-end' marginLeft='20px'>
                  <Text fontSize={23} lineHeight='22px'>
                    {productInfo.price * orderQuantity}
                  </Text>
                  <Text fontWeight='light' fontSize={19} lineHeight='19px'>
                    {productInfo.currency}
                  </Text>
                </Flex>
                {productInfo.currentStock > 0 ? (
                  <Button
                    size='lg'
                    borderRadius='30px'
                    style={{
                      justifyContent: 'center',
                      flex: 1,
                      backgroundColor: '#121212',
                      marginLeft: 30
                    }}
                    onClick={this.handleOrder}
                  >
                    <Text pr='10px' color='#FFFFFF'>
                      Place Order
                    </Text>
                  </Button>
                ) : (
                  <Button
                    size='lg'
                    borderRadius='xl'
                    onClick={() => null}
                    style={{
                      justifyContent: 'center',
                      flex: 1,
                      backgroundColor: '#999',
                      marginLeft: 30
                    }}
                  >
                    <Text pr='10px' color='#FFFFFF'>
                      Waiting for the next item
                    </Text>
                  </Button>
                )}
              </Flex>
            </Center>
          ) : (
            <Center p='20px' h='15vh' w='100%' style={{ marginTop: 0 }}>
              <Flex
                h='100%'
                w='100%'
                p='10px'
                bg='#F2F4F9'
                borderRadius='xl'
                overflow='hidden'
                style={{ justifyContent: 'space-between', marginTop: 0 }}
              >
                <Center w='100%'>
                  <Stack
                    borderRadius='xl'
                    p='10px'
                    bg='#FFF'
                    w='100%'
                    align='center'
                    justify='center'
                  >
                    <Text color='#000' fontWeight='bold' fontSize='xl'>
                      {`Waiting for ${sellerInfo.username} to add a product...`}
                    </Text>
                  </Stack>
                </Center>
              </Flex>
            </Center>
          )} */}
        </Stack>

        <Center p='20px' pl='10px' h='100vh' w='30vw'>
          <Stack
            h='100%'
            p='20px'
            w='100%'
            bg='#FFFFFF'
            borderRadius='25px'
            boxShadow='0px 0px 36px 2px rgba(0,0,0,0.12);'
            style={{ justifyContent: 'space-between' }}
          >
            <Text color='#000' fontWeight='bold'>
              Chat with {sellerInfo.username}
            </Text>

            <Center
              style={{
                flex: 1,
                marginBottom: 10,
                marginTop: 10,
                overflow: 'scroll',
                alignItems: 'flex-start'
              }}
            >
              <CommentsList comments={comments} />
            </Center>

            <MessageInput
              onOpenModal={this.props.onOpenModal}
              username={username}
              eventId={eventInfo.id}
            />
          </Stack>
        </Center>
      </Flex>
    )
  }
}

const styles = {}

export default withRouter(LiveScreen)
