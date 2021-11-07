import React, { Component } from 'react'
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
import { Pressable } from 'react-native'
import { MdArrowBack } from 'react-icons/md'
import {
  getJointEvent
} from '../../actions/fetch'
import {
  getSellerInfo
} from "../../fetchData/getData";
import firebase from '../../firebase/clientApp'
import EventPage from "../e/[id]";

export default class JoinEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      events: [],
      sellerInfo: null,
      eventInfo: null,
      comments: [],
      displayEvent: false,
      eventId: null
    }

    this.handleGetSetEvent = this.handleGetSetEvent.bind(this)
  }

  async componentDidMount() {
    const { jointEvent } = this.props
    console.log('join', jointEvent)
    if (jointEvent && jointEvent.participants) {
      const events = []
      for (const uid in jointEvent.participants) {
        /** get current event */
        const currentEventSn = await firebase
          .database()
          .ref(`users/${uid}/events/current`)
          .once('value')
        if (currentEventSn.exists()) {
          events.push(currentEventSn.val())
        }
      }

      this.setState({
        events: events,
        loading: false
      })
    } else {
      this.setState({
        loading: false
      })
    }
  }

  handleGetSetEvent(eventId) {
    this.setState({
      displayEvent: true,
      eventId: eventId
    })
  }

  render() {
    const { loading, events, displayEvent, eventId } = this.state
    const { isOnMobile } = this.props

    console.log('events', events)
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
          <Pressable onPress={() => this.setState({ displayEvent: false, eventId: null })}>
            <Flex align='center' pt='10px' px={isOnMobile ? '10px' : '20px'}>
              <MdArrowBack style={{ fontSize: 20, marginRight: 8 }} />
              <Text fontWeight='bold'>Back to all events</Text>
            </Flex>
          </Pressable>
          <EventPage eventId={eventId} isOnMobile={isOnMobile} />
        </div>
      )
    }

    return (
      <Stack
        w='100vw'
        px='1rem'
        h='100%'
      >
        <SimpleGrid
          style={{ marginTop: '2rem', marginBottom: '2rem' }}
          // templateColumns='repeat(3, 1fr)'
          // gap={6}
          columns={2}
          spacing='20px'
        >
          {events.map(eventId => (
            <Pressable onPress={() => this.handleGetSetEvent(eventId)}>
              <Box
                w='100%'
                h='250px'
                bg='#999'
                borderRadius='15px'
                position='relative'
                key={eventId}
              />
            </Pressable>
          ))}
        </SimpleGrid>
      </Stack>
    )
  }
}

export const getServerSideProps = async context => {
  const { jointEventId } = context.params;

  console.log('join', jointEventId)

  const jointEvent = await getJointEvent(jointEventId)

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

  return {
    props: {
      jointEvent: jointEvent,
      isOnMobile: isOnMobile
    }
  };
}