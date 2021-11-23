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
import { Pressable, ScrollView } from 'react-native'
import { FiEye, FiRefreshCw, FiShare } from 'react-icons/fi'
import { MdArrowBack } from 'react-icons/md'
import * as animationData from './live.json'
import { MessageInput, CommentsList } from '../../../components'
import firebase from '../../../firebase/clientApp'
import AmazonIVS from '../../molecules/seller/AmazonIVS'
import Stories from '../../molecules/seller/Stories'
import axios from 'axios'

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
      addressLine1: null,
      addressLine2: null,
      isCheckoutModalOpen: false,
      eventProducts: null
    }
    this.handleOrder = this.handleOrder.bind(this)
    this.handleShare = this.handleShare.bind(this)
    this.handleFollow = this.handleFollow.bind(this)
  }

  async componentDidMount () {
    const { eventInfo } = this.props

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    firebase
      .database()
      .ref(`events/${eventInfo.id}/info/viewers`)
      .set(firebase.database.ServerValue.increment(1))

    this.eventProductsListener = firebase
      .database()
      .ref(`events/${eventInfo.id}/products`)
      .on('value', async snapshot => {
        this.setState({
          eventProducts: snapshot.val()
        })
      })

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

    this.eventProductsListener &&
      firebase
        .database()
        .ref(`events/${eventInfo.id}/products`)
        .off('value', this.eventProductsListener)

    this.viewsInfoListener && firebase
      .database()
      .ref(`events/${eventInfo.id}/info/viewers`)
      .off('value', this.viewsInfoListener)

    firebase
      .database()
      .ref(`events/${eventInfo.id}/info/viewers`)
      .set(firebase.database.ServerValue.increment(-1))
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

    this.props.onOpenModal('order', {
      sellerUsername: sellerInfo.username,
      productInfo: productInfo,
      eventInfo: eventInfo,
      orderQuantity: orderQuantity,
      totalPrice: productInfo.price * orderQuantity,
      address: address,
      city: city,
      country: country,
      postalCode: postalCode,
      addressLine1: addressLine1 || this.props.addressLine1,
      addressLine2: addressLine2,
      name: name || this.props.name,
      phoneNumber: phoneNumber || this.props.phoneNumber,
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

    // this.props.onOpenModal('payment', {
    //   sellerUsername: sellerInfo.username,
    //   productInfo: productInfo,
    //   eventInfo: eventInfo,
    //   orderQuantity: orderQuantity,
    //   totalPrice: productInfo.price * orderQuantity,
    //   address: address,
    //   city: city,
    //   country: country,
    //   postalCode: postalCode,
    //   addressLine1: addressLine1,
    //   addressLine2: addressLine2,
    //   name: name,
    //   phoneNumber: phoneNumber,
    //   sellerStripeId: sellerInfo.stripeId,
    //   setDetailsInHomeState: details => {
    //     this.setState({
    //       address: details.address,
    //       city: details.city,
    //       country: details.country,
    //       postalCode: details.postalCode,
    //       addressLine1: details.addressLine1 || null,
    //       addressLine2: details.addressLine2 || null,
    //       name: details.name,
    //       phoneNumber: details.phoneNumber
    //     })
    //   }
    // })
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
      username,
      events
    } = this.props
    const {
      productInfo,
      orderQuantity,
      viewers,
      isCheckoutModalOpen,
      eventProducts
    } = this.state

    if (isOnMobile) {
      return (
        <Stack w='100vw' bg='#FFF' p='10px' className='perfect-height-wrapper'>
          {events && events.length > 1 ? (
            <Stories
              events={events}
              participants={this.props.participants}
              currentEventId={eventInfo.id}
              secondsRemaining={this.props.secondsRemaining}
              onGoBack={this.props.handleGoBack}
              onGetSetEvent={this.props.handleGetSetEvent}
            />
          ) : this.props.handleGoBack ? (
            <Pressable onPress={this.props.handleGoBack}>
              <Flex align='center' pr={isOnMobile ? '10px' : '20px'}>
                <MdArrowBack style={{ fontSize: 20, marginRight: 8 }} />
                <Text fontWeight='bold'>Inapoi la evenimente</Text>
              </Flex>
            </Pressable>
          ) : null}

          <Stack
            h='100%'
            bg='rgba(0,0,0,0.9)'
            borderRadius='xl'
            overflow='hidden'
            position='relative'
            justifyContent='center'
            alignItems='center'
          >
            <Flex
              pos='absolute'
              top='8px'
              right='12px'
              align='center'
              zIndex={10}
            >
              <Pressable
                style={{
                  padding: 7
                }}
                onPress={async () => {
                  // await firebase
                  //   .database()
                  //   .ref(`events/${eventInfo.id}/info/viewers`)
                  //   .set(firebase.database.ServerValue.increment(-1))
                  window.location.reload()
                }}
              >
                <Center flexDir='column'>
                  <FiRefreshCw style={{ fontSize: 18, color: '#FFF' }} />
                  <Text color='#FFF' fontSize='12' style={{ marginTop: 4 }}>
                    Refresh
                  </Text>
                </Center>
              </Pressable>
              <Pressable
                style={{
                  padding: 7
                }}
                onPress={this.handleShare}
              >
                <Center flexDir='column'>
                  <FiShare style={{ fontSize: 18, color: '#FFF' }} />
                  <Text color='#FFF' fontSize='12' style={{ marginTop: 4 }}>
                    Distribuie
                  </Text>
                </Center>
              </Pressable>
            </Flex>

            <Stack
              position='absolute'
              left='10px'
              top='10px'
              zIndex={15}
              align='flex-start'
              style={{ marginTop: 0, justifyContent: 'flex-start' }}
            >
              <Flex
                justify='flex-start'
                alignItems='center'
                borderRadius='xl'
                p='5px'
                bg='rgba(0,0,0,0.3)'
              >
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
                      <Text
                        fontSize={10}
                        color='#FFF'
                        textAlign='center'
                        ml='3px'
                      >
                        {viewers && viewers > 200 ? '200+' : viewers}
                      </Text>
                    </Center>
                  </Center>
                </Stack>
              </Flex>
              <Stack
                borderRadius='xl'
                style={{ marginTop: '0.8rem' }}
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    overflow: 'scroll',
                    alignSelf: 'flex-end',
                    position: 'relative',
                    flexGrow: 0,
                    maxHeight: '55vh'
                  }}
                >
                  {eventProducts ? (
                    Object.values(eventProducts).map((prod, index) => (
                      <Pressable
                        key={prod.id}
                        onPress={() => {
                          if (prod.currentStock) {
                            this.setState({ productInfo: prod }, () => {
                              this.handleOrder()
                            })
                          } else {
                            alert('Out of stock!')
                          }
                        }}
                      >
                        <Stack
                          align='center'
                          bg='rgba(0,0,0,0.3)'
                          p='7px'
                          borderRadius='xl'
                          style={{ marginTop: index > 0 ? '0.5rem' : 0 }}
                        >
                          <img
                            src={prod.imageURL}
                            style={{
                              height: 'auto',
                              width: 56,
                              minHeight: 56,
                              // borderRadius: '50%',
                              borderRadius: 5,
                              objectFit: 'cover',
                              boxShadow: '0px 0px 36px 2px rgba(0,0,0,0.12)'
                            }}
                          />
                          {/* <Center position='absolute' bottom='15px' right='0px' bg='#FFF'> */}
                          <Text
                            color='#FFF'
                            align='center'
                            noOfLines={1}
                            maxW='56px'
                            textOverflow='ellipsis'
                            style={{
                              fontSize: 11, marginTop: '0.2rem', marginBottom: 0
                            }}
                          >
                            {prod.currentStock > 0 ? `${prod.price} ${prod.currency}` : 'Out of stock'}
                          </Text>
                          {/* </Center> */}
                        </Stack>
                      </Pressable>
                    ))
                  ) : null}
                </ScrollView>
              </Stack>
            </Stack>
            <Stack
              position='absolute'
              left='0px'
              bottom='0px'
              p='10px'
              w='100%'
              zIndex={16}
              flex={1}
              style={{
                borderBottomLeftRadius: 13,
                borderBottomRightRadius: 13,
                background:
                  'linear-gradient(0deg, rgba(0,0,0,0.49) 0%, rgba(0,0,0,0.6685049019607843) 0%, rgba(0,0,0,0) 100%)'
              }}
            >
              <Flex justify='space-between' align='flex-end'>
                <Center w='100%' style={{ overflow: 'scroll', height: 90 }} flex={1}>
                  <Center w='100%' pt='120px'>
                    <CommentsList comments={comments} isOnMobile />
                  </Center>
                </Center>
              </Flex>
              <Stack
                w='100%'
                justify='space-between'
                align='center'
                style={{ marginBottom: 10 }}
              >
                {/* {this.props.secondsRemaining && this.props.secondsRemaining >= 0 ? (
                  <Flex align='center' w='100%' justify='space-between' px='5px'>
                    <Text color='#FFF' fontSize={15}>
                      {'Timp ramas sa cumperi produsul'}
                    </Text>
                    <Text style={{ marginTop: 0 }} color='#FFF' fontWeight='bold' fontSize='16'>
                      {`${this.props.secondsRemaining}s`}
                    </Text>
                  </Flex>
                ) : null} */}
                <Flex
                  borderRadius='xl'
                  bg='rgba(0,0,0,0.3)'
                  p='6px'
                  align='center'
                  w='100%'
                  minW={0}
                  alignSelf='start'
                >
                  {productInfo && productInfo.imageURL ? (
                    <img
                      src={productInfo.imageURL}
                      style={{
                        height: 45,
                        width: 45,
                        objectFit: 'cover',
                        borderRadius: 10,
                        marginRight: 8
                      }}
                    />
                  ) : null}
                  {productInfo ? (
                    <Stack
                      justifyContent='center'
                      style={{ marginTop: 0, paddingRight: 4 }}
                    >
                      {/* <Text color='#FFF' fontSize='14' fontWeight='normal'>
                        {`${productInfo.currentStock} remaining`}
                      </Text> */}
                      <Text
                        color='#FFF'
                        fontWeight='bold'
                        fontSize='14'
                        style={{ marginTop: '0.1rem' }}
                      >
                        {`${productInfo.price} ${productInfo.currency}`}
                      </Text>
                    </Stack>
                  ) : null}
                  {productInfo && productInfo.currentStock > 0 ? (
                    <Button
                      borderRadius='xl'
                      // px='10px'
                      style={{
                        justifyContent: 'center',
                        background: 'rgb(63,60,145)',
                        background:
                          'linear-gradient(48deg, rgba(63,60,145,1) 0%, rgba(242,67,106,1) 100%)',
                        minHeight: '100%',
                        flex: 1,
                        height: 45,
                        // width: 'auto',
                        minWidth: 120,
                        marginLeft: 20
                      }}
                      className='seekr-gradient-on-hover'
                      onClick={this.handleOrder}
                    >
                      <Stack>
                        <Text color='#FFFFFF' fontWeight='600'>
                          {'Cumpara'}
                        </Text>
                        {this.props.secondsRemaining &&
                          this.props.secondsRemaining >= 0 ? (
                            <Text
                              style={{ marginTop: 1 }}
                              fontWeight='normal'
                              fontSize='11'
                              color='#FFFFFF'
                            >
                              {`00:${this.props.secondsRemaining > 0
                              ? this.props.secondsRemaining
                              : '0' + this.props.secondsRemaining
                              }`}
                            </Text>
                          ) : null}
                      </Stack>
                    </Button>
                  ) : (
                    <Button
                      borderRadius='xl'
                      // px='10px'
                      style={{
                        justifyContent: 'center',
                        backgroundColor: '#999',
                        minHeight: '100%',
                        flex: 1,
                        height: 50,
                        marginLeft: 20,
                        // width: 'auto',
                        minWidth: 120
                      }}
                      onClick={() => null}
                    >
                      <Text
                        noOfLines={1}
                        textOverflow='ellipsis'
                        color='#FFFFFF'
                        fontWeight='600'
                      >
                        Wait or choose another product to order
                      </Text>
                    </Button>
                  )}
                </Flex>
              </Stack>
              <MessageInput
                onOpenModal={this.props.onOpenModal}
                username={username}
                eventId={eventInfo.id}
                isOnMobile={isOnMobile}
              />
            </Stack>
            <AmazonIVS
              isOnMobile={isOnMobile}
              url={eventInfo.liveURL}
              setGlobalMuted={this.props.setGlobalMuted}
              globalMuted={this.props.globalMuted}
            />
          </Stack>
        </Stack>
      )
    }

    return (
      <Flex
        bg='#FFF'
        className='perfect-height-wrapper'
        // maxH='90vh'
        w='100vw'
        justify='space-between'
      >
        <Stack w='70vw' p='20px' h='100%' className='perfect-height-wrapper'>
          {events && events.length > 1 ? (
            <Stories
              events={events}
              participants={this.props.participants}
              currentEventId={eventInfo.id}
              secondsRemaining={this.props.secondsRemaining}
              onGoBack={this.props.handleGoBack}
              onGetSetEvent={this.props.handleGetSetEvent}
            />
          ) : this.props.handleGoBack ? (
            <Pressable onPress={this.props.handleGoBack}>
              <Flex align='center' pb='10px'>
                <MdArrowBack style={{ fontSize: 20, marginRight: 8 }} />
                <Text fontWeight='bold'>Inapoi la evenimente</Text>
              </Flex>
            </Pressable>
          ) : null}
          <Stack
            h='100%'
            w='100%'
            bg='rgba(0,0,0,0.9)'
            borderRadius='20px'
            overflow='hidden'
            position='relative'
            style={{
              marginTop: events && events.length > 1 ? 10 : 0,
              boxShadow: '0px 0px 36px 2px rgba(0,0,0,0.12)'
            }}
          >
            <AmazonIVS
              url={eventInfo.liveURL}
              setGlobalMuted={this.props.setGlobalMuted}
              globalMuted={this.props.globalMuted}
            />

            <Flex
              pos='absolute'
              top='8px'
              right='12px'
              align='center'
              zIndex={10}
            >
              <Pressable
                style={{
                  padding: 7
                }}
                onPress={async () => {
                  // await firebase
                  //   .database()
                  //   .ref(`events/${eventInfo.id}/info/viewers`)
                  //   .set(firebase.database.ServerValue.increment(-1))
                  window.location.reload()
                }}
              >
                <Center flexDir='column'>
                  <FiRefreshCw style={{ fontSize: 18, color: '#FFF' }} />
                  <Text color='#FFF' fontSize='12' style={{ marginTop: 4 }}>
                    Refresh
                  </Text>
                </Center>
              </Pressable>
              <Pressable
                style={{
                  padding: 7
                }}
                onPress={this.handleShare}
              >
                <Center flexDir='column'>
                  <FiShare style={{ fontSize: 18, color: '#FFF' }} />
                  <Text color='#FFF' fontSize='12' style={{ marginTop: 4 }}>
                    Distribuie
                  </Text>
                </Center>
              </Pressable>
            </Flex>

            <Stack
              position='absolute'
              left='15px'
              top='15px'
              zIndex={10}
              align='flex-start'
              style={{ marginTop: 0, justifyContent: 'flex-start' }}
            >
              <Flex
                borderRadius='xl'
                p='5px'
                pr='8px'
                bg='rgba(0,0,0,0.3)'
                justify='flex-start'
                alignItems='center'
              >
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
                      <Text
                        fontSize={12}
                        color='#FFF'
                        textAlign='center'
                        ml='3px'
                      >
                        {viewers}
                      </Text>
                    </Center>
                  </Center>
                </Stack>
              </Flex>
              <Stack
                borderRadius='xl'
                style={{ marginTop: '0.8rem' }}
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    overflow: 'scroll',
                    alignSelf: 'flex-end',
                    position: 'relative',
                    flexGrow: 0,
                    maxHeight: '55vh'
                  }}
                >
                  {eventProducts ? (
                    Object.values(eventProducts).map((prod, index) => (
                      <Pressable
                        key={prod.id}
                        onPress={() => {
                          this.setState({ productInfo: prod }, () => {
                            this.handleOrder()
                          })
                        }}
                      >
                        <Stack
                          align='center'
                          bg='rgba(0,0,0,0.3)'
                          p='7px'
                          borderRadius='xl'
                          style={{ marginTop: index > 0 ? '0.5rem' : 0 }}
                        >
                          <img
                            src={prod.imageURL}
                            style={{
                              height: 'auto',
                              width: 64,
                              minHeight: 64,
                              // borderRadius: '50%',
                              borderRadius: 5,
                              objectFit: 'cover',
                              boxShadow: '0px 0px 36px 2px rgba(0,0,0,0.12)'
                            }}
                          />
                          {/* <Center position='absolute' bottom='15px' right='0px' bg='#FFF'> */}
                          <Text color='#FFF' align='center' style={{ fontSize: 11, marginTop: '0.2rem', marginBottom: 0 }}>
                            {`${prod.price} ${prod.currency}`}
                          </Text>
                          {/* </Center> */}
                        </Stack>
                      </Pressable>
                    ))
                  ) : null}

                </ScrollView>
              </Stack>
            </Stack>

            {productInfo ? (
              <Stack
                position='absolute'
                left='0px'
                bottom='0px'
                zIndex={5}
                p='15px'
                w='100%'
                flex={1}
              >
                {/* <Flex w='100%' justify='flex-end'>

                </Flex> */}
                <Flex justify='space-between' align='flex-end' w='100%'>
                  <Flex
                    borderRadius='xl'
                    bg='rgba(0,0,0,0.3)'
                    p='8px'
                    align='center'
                    w='auto'
                    minW={0}
                    alignSelf='flex-end'
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
                      <Text
                        color='#FFF'
                        fontWeight='bold'
                        fontSize='14'
                        style={{ marginTop: '0.1rem' }}
                      >
                        {`${productInfo.price} ${productInfo.currency}`}
                      </Text>
                    </Stack>
                  </Flex>
                </Flex>
                {productInfo && productInfo.currentStock > 0 ? (
                  <Button
                    borderRadius='xl'
                    // px='10px'
                    style={{
                      justifyContent: 'center',
                      background: 'rgb(63,60,145)',
                      background: 'linear-gradient(48deg, rgba(63,60,145,1) 0%, rgba(242,67,106,1) 100%)'
                    }}
                    className='seekr-gradient-on-hover'
                    onClick={this.handleOrder}
                  >
                    <Text color='#FFFFFF' fontWeight='600'>
                      {'Cumpara'}
                    </Text>
                    {this.props.secondsRemaining && this.props.secondsRemaining >= 0 ? (
                      <Text
                        style={{ marginTop: 1, marginLeft: 5 }}
                        fontWeight='normal'
                        // fontSize='14'
                        color='#FFFFFF'
                      >
                        {`00:${this.props.secondsRemaining > 0 ? this.props.secondsRemaining : '0' + this.props.secondsRemaining}`}
                      </Text>
                    ) : null}
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
                      Wait or choose another product to order
                    </Text>
                  </Button>
                )}
              </Stack>
            ) : null}
          </Stack>
        </Stack>

        <Stack p='20px' pl='10px' h='100vh' w='30vw'>
          {/* {this.props.handleGoBack ? (
            <Pressable onPress={this.props.handleGoBack} style={{ opacity: 0 }}>
              <Flex align='center' pb='10px'>
                <MdArrowBack style={{ fontSize: 20, marginRight: 8 }} />
                <Text fontWeight='bold'>Inapoi la evenimente</Text>
              </Flex>
            </Pressable>
          ) : null} */}
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
              Vorbeste cu {sellerInfo.username}
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
              <CommentsList comments={comments} isOnMobile={isOnMobile} />
            </Center>

            <MessageInput
              onOpenModal={this.props.onOpenModal}
              username={username}
              eventId={eventInfo.id}
              isOnMobile={isOnMobile}
            />
          </Stack>
        </Stack>
      </Flex>
    )
  }
}

const styles = {}

export default withRouter(LiveScreen)
