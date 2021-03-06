import React, { Component, useState, useEffect } from 'react'
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
  ModalHeader,
  FormControl,
  Input,
  FormHelperText,
  useToast,
  useClipboard
} from '@chakra-ui/react'
import ReactPlayer from 'react-player'
import { Pressable, ScrollView } from 'react-native'
import { MdArrowBack } from 'react-icons/md'
import { FiInstagram, FiPlus } from 'react-icons/fi'
import { getJointEvent } from '../../actions/fetch'
import firebase from '../../firebase/clientApp'
import router from 'next/router'
import EventPage from '../e/[id]'
import {
  getSeller,
  getEvent,
  getEventInfo,
  getSellerInfo
} from '../../fetchData/getData'
import Countdown from '../../components/molecules/seller/Countdown'
import AmazonIVSPreview from '../../components/molecules/seller/AmazonIVSPreview'

const ExploreProducts = ({ events, isOnMobile }) => {
  const [allProducts, setAllProducts] = useState([])
  useEffect(async () => {
    for (const event of events) {
      const eventId = event.event.id
      /** get products */
      const productsSn = await firebase
        .database()
        .ref(`events/${eventId}/products`)
        .once('value')

      if (productsSn.exists()) {
        setAllProducts([...allProducts, ...Object.values(productsSn.val())])
      }
    }
  }, [events])

  return (
    <Stack w='100%'>
      <Text fontWeight='bold' fontSize='26px'>
        Explore products
      </Text>
      <ScrollView
        style={{ marginTop: 15, overflow: 'scroll', width: '100%' }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {allProducts.map(product => {
          return (
            <Box
              // w='180px'
              maxW={isOnMobile ? '150px' : '180px'}
              h={isOnMobile ? '200px' : '250px'}
              bg='#999'
              borderRadius='15px'
              mr='15px'
              position='relative'
              key={product.id}
            // style={{ width: '180px' }}
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
                  onClick={() =>
                    (window.location.href = `https://seekrlive.com/p/${product.id}`)}
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
                    borderRadius: 15
                  }}
                >
                  <Stack py='6px' px='10px' className='quantity-label'>
                    <Stack
                      borderRadius='xl'
                      style={{
                        padding: 10,
                        backgroundColor: 'rgba(0,0,0,0.8)'
                      }}
                    >
                      <Text color='#FFFFFF' fontSize={14}>
                        {`${product.quantity ||
                          product.currentStock} remaining`}
                      </Text>
                    </Stack>
                  </Stack>

                  <Flex
                    justify='space-between'
                    w='100%'
                    style={{
                      background:
                        'linear-gradient(0deg, rgba(0,0,0,0.47522759103641454) 0%, rgba(0,0,0,0.623686974789916) 0%, rgba(0,0,0,0) 100%)',
                      padding: 8,
                      borderBottomLeftRadius: 15,
                      borderBottomRightRadius: 15
                    }}
                  >
                    <Stack>
                      <Text color='#FFFFFF' fontSize={18} fontWeight='bold'>
                        {`${product.price} ${product.currency || 'RON'}`}
                      </Text>
                    </Stack>
                  </Flex>
                </div>
              )}
              <img
                src={product.imageUrl || product.imageURL}
                style={{
                  borderRadius: 15,
                  width: isOnMobile ? '160px' : '180px',
                  objectFit: 'cover',
                  height: '100%'
                }}
              />
            </Box>
          )
        })}
      </ScrollView>
    </Stack>
  )
}

const RegistrationModal = ({
  title,
  isOpen,
  onClose,
  baseDetails,
  isOnMobile,
  jointEventId,
  isConfirmModal,
  ...props
}) => {
  const [name, setName] = useState(baseDetails.name || '')
  const [phoneNumber, setPhoneNumber] = useState(baseDetails.phoneNumber || '')
  const [addressLine1, setAddressLine1] = useState(
    baseDetails.addressLine1 || ''
  )

  const toast = useToast()
  return (
    <Modal
      motionPreset='scale'
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size='2xl'
    >
      <ModalOverlay />
      <ModalContent
        p={isOnMobile ? 10 : 10}
        py={isOnMobile ? 5 : 10}
        px='1.5rem'
        borderRadius={isOnMobile ? 10 : 30}
      >
        <ModalHeader px='0px'>
          {isConfirmModal ? (
            <Text>??? Confirma detaliile pentru a comanda mai rapid</Text>
          ) : (
            <Text>
              Rezerva loc pentru livrarea gratis. Vei primi un SMS cu 5 minute
              inainte de eveniment
            </Text>
          )}
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <Stack
          style={{
            overflow: 'scroll',
            maxHeight: '60vh',
            paddingBottom: '1rem'
          }}
        >
          <FormControl id='name' isRequired style={{ marginBottom: 10 }}>
            <Input
              value={name}
              placeholder='Nume si prenume'
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id='phone' isRequired style={{ marginBottom: 10 }}>
            <Input
              placeholder='Numar de telefon'
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </FormControl>
          <FormControl id='address' isRequired style={{ marginBottom: 10 }}>
            <FormControl style={styles.formRow} id='address-line-1'>
              <Input
                placeholder='Adresa de livrare'
                value={addressLine1}
                onChange={e => setAddressLine1(e.target.value)}
              />
            </FormControl>
          </FormControl>
          <Button
            style={{ backgroundColor: '#121212', flex: 1, padding: 10 }}
            onClick={async () => {
              if (isConfirmModal) {
                props.setDetails({
                  name: name,
                  phoneNumber: phoneNumber,
                  addressLine1: addressLine1
                })
                toast({
                  title: 'Confirmat',
                  status: 'success',
                  duration: 1500,
                  isClosable: false
                })
                onClose()
              } else {
                if (name !== '' && phoneNumber !== '') {
                  await firebase
                    .database()
                    .ref(`joint-events/${jointEventId}/waitlist`)
                    .push({
                      name: name,
                      phoneNumber: phoneNumber,
                      addressLine1: addressLine1
                    })
                  toast({
                    title: 'Loc rezervat cu succes',
                    status: 'success',
                    duration: 3000,
                    isClosable: false
                  })
                  onClose()
                } else {
                  alert('Te rugam completeaza formularul')
                }
              }
            }}
          >
            <Text style={{ color: '#FFFFFF' }}>
              {isConfirmModal ? 'Confirm' : 'Rezerva-mi locul'}
            </Text>
          </Button>
        </Stack>
      </ModalContent>
    </Modal>
  )
}

export default class JoinEvent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      events: [],
      participants: [],
      displayEvent: false,
      eventId: null,
      showRegistrationModal: false,
      globalMuted: true,
      secondsRemaining: null,
      showRegistrationButton: false,
      /** for fast ordering */
      name: props.name || null,
      phoneNumber: props.phoneNumber || null,
      addressLine1: props.addressLine1 || null
    }

    this.handleGetSetEvent = this.handleGetSetEvent.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  async componentDidMount () {
    const { jointEvent, jointEventId } = this.props

    window.addEventListener('scroll', this.handleScroll)

    if (router.query) {
      let name = null
      let phoneNumber = null
      let addressLine1 = null
      if (router.query.n) {
        name = router.query.n
      }
      if (router.query.p) {
        phoneNumber = router.query.p
      }
      if (router.query.a) {
        addressLine1 = router.query.a
      }
      this.setState({ name, phoneNumber, addressLine1 })
    }

    await firebase
      .database()
      .ref(`joint-events/${jointEventId}/info/currentLiveUserId`)
      .on('value', async snapshot => {
        if (snapshot.exists()) {
          const eventSnap = await firebase
            .database()
            .ref(`users/${snapshot.val()}/events/current`)
            .once('value')
          const currentEventId = eventSnap.val()

          this.setState(
            {
              displayEvent: false,
              eventId: null
            },
            () => {
              this.setState({
                eventId: currentEventId,
                displayEvent: true
              })
            }
          )
        } else {
          this.setState({
            displayEvent: false,
            eventId: null
          })
        }
      })

    await firebase
      .database()
      .ref(`joint-events/${jointEventId}/info/secondsRemaining`)
      .on('value', async snapshot => {
        if (snapshot.exists()) {
          this.setState({
            secondsRemaining: snapshot.val()
          })
        }
      })

    await firebase
      .database()
      .ref(`joint-events/${jointEventId}/info/refresh`)
      .on('value', async snapshot => {
        if (snapshot.exists() && snapshot.val() === true) {
          window.location.reload()
        }
      })

    if (jointEvent && jointEvent.participants) {
      const events = []
      const sortedParticipants = Object.values(jointEvent.participants).sort(
        (a, b) => {
          return a.index - b.index
        }
      )

      if (
        // true
        jointEvent.info.timestamp <= new Date().getTime()
      ) {
        for (const participant of sortedParticipants) {
          const uid = participant.uid
          /** get current event */
          const currentEventSn = await firebase
            .database()
            .ref(`users/${uid}/events/current`)
            .once('value')
          if (currentEventSn.exists()) {
            const eventId = currentEventSn.val()
            const eventData = await getEvent(eventId)
            const sellerInfo = await getSellerInfo(eventData.info.sellerId)
            this.setState({
              events: this.state.events.concat({
                event: eventData,
                sellerInfo: sellerInfo
              }),
              loading: false
            })
          }
        }
        this.setState({
          // showRegistrationModal: true,
          loading: false
        })
      } else {
        this.setState({
          participants: sortedParticipants,
          // showRegistrationModal: true,
          loading: false
        })
      }
    } else {
      this.setState({
        loading: false
      })
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll (event) {
    const scrollTop = event.nativeEvent.contentOffset.y
    if (scrollTop > 300) {
      this.setState({
        showRegistrationButton: true
      })
    }
  }

  handleGetSetEvent (eventId) {
    this.setState(
      {
        displayEvent: false,
        eventId: null
      },
      () => {
        const nextURL = `/e/${eventId}`
        const nextTitle = 'My new page title'
        const nextState = { additionalInformation: 'Updated the URL with JS' }

        if (window && window.history) {
          // This will create a new entry in the browser's history, without reloading
          window.history.pushState(nextState, nextTitle, nextURL)

          // This will replace the current entry in the browser's history, without reloading
          window.history.replaceState(nextState, nextTitle, nextURL)
        }

        const that = this
        window.onpopstate = function (e) {
          if (e.state) {
            that.setState({
              displayEvent: false,
              eventId: null
            })
            // document.getElementById("content").innerHTML = e.state.html;
            // document.title = e.state.pageTitle;
          }
        }

        this.setState({
          displayEvent: true,
          eventId: eventId
        })
      }
    )
  }

  render () {
    const {
      loading,
      events,
      displayEvent,
      eventId,
      showRegistrationModal,
      participants,
      showRegistrationButton
    } = this.state
    const { isOnMobile, jointEvent, isConfirmModal } = this.props

    if (loading) {
      return (
        <Stack
          w='100vw'
          h='100vh'
          top={0}
          zIndex={5}
          justifyContent='center'
          alignItems='center'
          bg='rgba(255,255,255,0.3)'
        >
          <Spinner color='#121212' size='md' />
        </Stack>
      )
    }

    if (displayEvent) {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          {/* {showRegistrationModal && (
            <RegistrationModal
              isOpen={showRegistrationModal}
              onClose={() => this.setState({ showRegistrationModal: false })}
              isOnMobile={isOnMobile}
              jointEventId={jointEvent.info.id}
              isConfirmModal={jointEvent.info.timestamp <= new Date().getTime()}
              baseDetails={{
                name: this.state.name,
                phoneNumber: this.state.phoneNumber,
                addressLine1: this.state.addressLine1
              }}
              setDetails={details => {
                this.setState({
                  name: details.name,
                  phoneNumber: details.phoneNumber,
                  addressLine1: details.addressLine1
                });
              }}
            />
          )} */}
          <EventPage
            events={events}
            participants={participants}
            eventId={eventId}
            isOnMobile={isOnMobile}
            handleGetSetEvent={this.handleGetSetEvent}
            setGlobalMuted={bool => this.setState({ globalMuted: bool })}
            globalMuted={this.state.globalMuted}
            secondsRemaining={this.state.secondsRemaining}
            handleGoBack={() =>
              this.setState({ displayEvent: false, eventId: null })}
            name={this.state.name}
            phoneNumber={this.state.phoneNumber}
            addressLine1={this.state.addressLine1}
          />
        </div>
      )
    }

    return (
      <Stack w='100vw' h='100%' justifyContent='center' alignItems='center'>
        {showRegistrationModal && (
          <RegistrationModal
            isOpen={showRegistrationModal}
            onClose={() => this.setState({ showRegistrationModal: false })}
            isOnMobile={isOnMobile}
            jointEventId={jointEvent.info.id}
            isConfirmModal={jointEvent.info.timestamp <= new Date().getTime()}
            baseDetails={{
              name: this.state.name,
              phoneNumber: this.state.phoneNumber,
              addressLine1: this.state.addressLine1
            }}
            setDetails={details => {
              this.setState({
                name: details.name,
                phoneNumber: details.phoneNumber,
                addressLine1: details.addressLine1
              })
            }}
          />
        )}

        <Stack
          height='100vh'
          overflow='scroll'
          position='relative'
          alignItems='center'
          w='100%'
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={this.handleScroll}
            scrollEventThrottle={16}
            style={{ width: '100%' }}
            contentContainerStyle={{ display: 'flex', alignItems: 'center' }}
          >
            <Stack
              className='header'
              minHeight='50vh'
              w='100%'
              background='url("https://s3.amazonaws.com/odin-images/images/rpDUoOvgxFT.jpeg")'
              backgroundSize='cover'
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: '3rem 1.1rem'
                }}
              >
                <Stack
                  w={isOnMobile ? '100%' : '1100px'}
                  h='100%'
                  justify='center'
                  maxW='1100px'
                >
                  <Text
                    fontWeight='bold'
                    fontSize='46px'
                    color='#FFFFFF'
                    lineHeight='1.3'
                    maxW='650px'
                  >
                    {jointEvent.info.title}
                  </Text>
                  <Text
                    color='#FFFFFF'
                    fontWeight='normal'
                    fontSize='18px'
                    maxW='650px'
                    style={{ marginTop: 10 }}
                  >
                    {jointEvent.info.description}
                  </Text>
                  {/* <Countdown
                    isOnMobile={isOnMobile}
                    timeTillDate="11 17 2021, 6:30 pm"
                    timeFormat="MM DD YYYY, h:mm a"
                  />
                  <Button
                    style={{
                      // backgroundColor: "#121212",
                      background: "rgb(63,60,145)",
                      background:
                        "linear-gradient(48deg, rgba(63,60,145,1) 0%, rgba(242,67,106,1) 100%)",
                      padding: 12,
                      // minWidth: isOnMobile ? 250 : 350,
                      // borderRadius: 10,
                      width: "100%",
                      marginTop: 10
                    }}
                    maxW="400px"
                    boxShadow="0px 0px 38px -2px rgba(0,0,0,0.62)"
                    className="seekr-gradient-on-hover"
                    onClick={() => {
                      this.setState({ showRegistrationModal: true });
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontWeight: "bold",
                        fontSize: 18
                      }}
                    >
                      Rezerva loc
                    </Text>
                  </Button>
                  <Text style={{ color: "#FFF", fontSize: 14, marginTop: 8 }}>
                    si primesti livrarea gratis la orice comanda
                  </Text>
                  */}
                </Stack>
              </div>
            </Stack>
            <Stack
              px='1rem'
              pt='2rem'
              pb='9rem'
              w='100%'
              style={{
                width: isOnMobile ? '100%' : '1100px',
                maxWidth: '1100px'
              }}
            >
              <Stack
                w='100%'
                pt={isOnMobile ? 0 : '1rem'}
                pb='0rem'
                style={{ marginTop: 0 }}
              >
                <Text
                  fontWeight='bold'
                  fontSize='20px'
                  style={{ marginBottom: '1rem' }}
                >
                  Arunca o privire la magazinele expozantilor
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {participants.map(sellerInfo => {
                    return (
                      <Pressable
                        style={{ marginRight: '1rem' }}
                        onPress={() => {
                          if (sellerInfo.instagramUrl) {
                            window.open(`/${sellerInfo.username}`, '_blank')
                          }
                        }}
                      >
                        <Stack
                          align='center'
                          w='120px'
                          align='center'
                          style={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          <img
                            src={sellerInfo.imageURL}
                            style={{
                              objectFit: 'cover',
                              width: 100,
                              height: 100,
                              borderRadius: '50%',
                              border: '1px solid rgba(0,0,0,0.2)'
                            }}
                          />
                          <p
                            style={{
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textAlign: 'center',
                              width: 120,
                              color: 'rgba(0,0,0,0.8)'
                            }}
                          >
                            @{sellerInfo.username}
                          </p>
                          {/* <Text
                            noOfLines={2}
                            textOverflow='ellipsis'
                            color="rgba(0,0,0,0.8)"
                            textAlign='center'
                            w='90px'
                            style={{
                              textOverflow: 'ellipsis',
                              // overflow: 'hidden',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {sellerInfo.username}
                          </Text> */}
                        </Stack>
                      </Pressable>
                    )
                  })}
                </ScrollView>
              </Stack>
              <SimpleGrid
                style={{
                  marginTop: '2rem',
                  marginBottom: '2rem',
                  justifyContent: 'center'
                }}
                columns={[2, null, 3]}
                // columns={{ xs: 2, sm: 2, md: 3, lg: 3 }}
                maxWidth='1100px'
                spacing='15px'
              >
                {jointEvent.info.timestamp <= new Date().getTime()
                  ? events.map(eventData => {
                    return (
                      <Pressable
                        onPress={() =>
                          this.handleGetSetEvent(eventData.event.id)}
                      >
                        <Stack
                          h={isOnMobile ? '250px' : '400px'}
                          w='100%'
                          bg='#999'
                          borderRadius='15px'
                          position='relative'
                          key={eventData.event.id}
                          style={{
                            boxShadow: '0px 0px 36px 2px rgba(0,0,0,0.12)'
                          }}
                        >
                          <AmazonIVSPreview
                            id={eventData.event.id}
                            isLive={
                              eventData.event.info.status === 'live' &&
                              eventData.event.info.liveURL
                            }
                            url={
                              eventData.event.info.status === 'live' &&
                                eventData.event.info.liveURL
                                ? eventData.event.info.liveURL
                                : eventData.event.info.videoURL
                            }
                          />
                          <Flex
                            style={{
                              flex: 1,
                              marginTop: 0,
                              background:
                                'linear-gradient(180deg, rgba(0,0,0,0.47522759103641454) 10%, rgba(255,255,255,0) 100%)'
                            }}
                            position='absolute'
                            top='0'
                            p={2}
                            w='100%'
                            borderTopLeftRadius='15px'
                            borderTopRightRadius='15px'
                          >
                            <Text
                              style={{
                                flex: 1,
                                paddingLeft: 4,
                                color: '#FFF',
                                fontWeight: 'bold',
                                fontSize: 14,
                                position: 'relative'
                              }}
                            >
                              {eventData.event.info.title}
                            </Text>
                          </Flex>
                          <Flex
                            style={{
                              flex: 1,
                              background:
                                'linear-gradient(0deg, rgba(0,0,0,0.47522759103641454) 44%, rgba(255,255,255,0) 100%)'
                            }}
                            position='absolute'
                            bottom='0'
                            p='10px'
                            w='100%'
                            borderBottomLeftRadius='15px'
                            borderBottomRightRadius='15px'
                            justifyContent='space-between'
                            alignItems='center'
                          >
                            <Flex
                              align='center'
                              style={{
                                flex: 1,
                                overflow: 'hidden'
                              }}
                            >
                              <Avatar
                                size='xs'
                                name={eventData.sellerInfo.username}
                                src={eventData.sellerInfo.imageURL}
                              />
                              <Text
                                noOfLines={1}
                                textOverflow='ellipsis'
                                style={{
                                  flex: 1,
                                  paddingLeft: 4,
                                  color: '#FFF',
                                  fontWeight: 'bold',
                                  fontSize: 12,
                                  position: 'relative'
                                }}
                              >
                                @{eventData.sellerInfo.username}
                              </Text>
                            </Flex>
                            {eventData.sellerInfo.instagramUrl && (
                              <Pressable
                                onPress={() =>
                                  window.open(
                                    eventData.sellerInfo.instagramUrl,
                                    '_blank'
                                )}
                              >
                                <FiInstagram color='#FFF' size={26} />
                              </Pressable>
                            )}
                          </Flex>
                        </Stack>
                      </Pressable>
                    )
                  })
                  : participants.map(participant => (
                    <Pressable
                      onPress={() =>
                        window.open(`/${participant.username}`, '_blank')}
                    >
                      <Stack
                        h={isOnMobile ? '250px' : '400px'}
                        w='100%'
                        bg='#999'
                        borderRadius='15px'
                        position='relative'
                        key={participant.username}
                        style={{
                          boxShadow: '0px 0px 36px 2px rgba(0,0,0,0.12)'
                        }}
                      >
                        <AmazonIVSPreview
                          id={participant.username}
                          // isLive={
                          //   eventData.event.info.status === "live" &&
                          //   eventData.event.info.liveURL
                          // }
                          url={participant.videoURL}
                        />
                        <Flex
                          style={{
                            flex: 1,
                            background:
                              'linear-gradient(0deg, rgba(0,0,0,0.47522759103641454) 44%, rgba(255,255,255,0) 100%)'
                          }}
                          position='absolute'
                          bottom='0'
                          p='10px'
                          w='100%'
                          borderBottomLeftRadius='15px'
                          borderBottomRightRadius='15px'
                          justifyContent='space-between'
                          alignItems='center'
                        >
                          <Flex
                            align='center'
                            style={{
                              flex: 1,
                              overflow: 'hidden'
                            }}
                          >
                            <Avatar
                              size='sm'
                              name={participant.username}
                              src={participant.imageURL}
                            />
                            <Text
                              noOfLines={1}
                              textOverflow='ellipsis'
                              style={{
                                flex: 1,
                                paddingLeft: 4,
                                color: '#FFF',
                                fontWeight: 'bold',
                                fontSize: 12,
                                position: 'relative'
                              }}
                            >
                              @{participant.username}
                            </Text>
                          </Flex>
                          {participant.instagramUrl && (
                            <Pressable
                              onPress={() =>
                                window.open(
                                  participant.instagramUrl,
                                  '_blank'
                              )}
                            >
                              <FiInstagram color='#FFF' size={26} />
                            </Pressable>
                          )}
                        </Flex>
                      </Stack>
                    </Pressable>
                  ))}
              </SimpleGrid>
              {/* <Flex my="1rem" w="100%">
                <ExploreProducts events={events} isOnMobile={isOnMobile} />
              </Flex> */}
            </Stack>
          </ScrollView>
          {/* <Stack
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
              bottom: "0rem",
              width: "100%",
              padding: "1rem 0.6rem 1rem 0.6rem",
              // backgroundColor: 'rgba(0,0,0,0.3)',
              display: showRegistrationButton ? "flex" : "none"
            }}
            px={isOnMobile ? "1rem" : 0}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, .15)",
                backdropFilter: "blur(5px)"
              }}
            />
            <Button
              style={{
                // backgroundColor: "#121212",
                background: "rgb(63,60,145)",
                background:
                  "linear-gradient(48deg, rgba(63,60,145,1) 0%, rgba(242,67,106,1) 100%)",
                padding: 12,
                flex: 1,
                flexDirection: "column",
                minWidth: isOnMobile ? 250 : 350,
                borderRadius: 10,
                width: "100%"
              }}
              maxW="500px"
              boxShadow="0px 0px 38px -2px rgba(0,0,0,0.62)"
              className="seekr-gradient-on-hover"
              onClick={() => {
                this.setState({ showRegistrationModal: true });
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: 18
                }}
              >
                Rezerva loc
              </Text>
              <Text style={{ color: "#FFF", fontSize: 12, marginTop: 5 }}>
                si primesti livrarea gratis la orice comanda
              </Text>
            </Button>
          </Stack> */}
        </Stack>
      </Stack>
    )
  }
}

const styles = {
  formRow: {}
}

export const getServerSideProps = async context => {
  let { jointEventId } = context.params

  if (jointEventId === 'joint-event-id') {
    jointEventId = 'bucuresti'
  }

  const jointEvent = await getJointEvent(jointEventId)

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
      isConfirmModal: true,
      jointEvent: jointEvent,
      jointEventId: jointEventId,
      isOnMobile: isOnMobile
    }
  }
}
