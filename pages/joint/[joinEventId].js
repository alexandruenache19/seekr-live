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

import { getJointEvent } from '../../actions/fetch'

export default class JoinEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    const { jointEvent } = this.props
    console.log('join', jointEvent)
    if (jointEvent && jointEvent.participants) {
      Object.keys(jointEvent.participants).map(async (uid) => {
        /** get current event */
        const currentEventSn = await firebase
          .database()
          .ref(`users/${uid}/events/current`)
          .once('value')

        console.log('current', currentEventSn.val())
      })
    }
    // const joinEventSn = await firebase
    //   .database()
    //   .ref(`events/${eventInfo.id}/info/viewers`)
    //   .once('value')
    this.setState({
      loading: false
    })
  }

  render() {
    const { loading } = this.state
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
          {[1, 2, 3].map(product => (
            <Box
              w='100%'
              h='250px'
              bg='#999'
              borderRadius='15px'
              position='relative'
              key={product}
            />
          ))}
        </SimpleGrid>
      </Stack>
    )
  }
}

export const getServerSideProps = async context => {
  const { jointEventId } = context.params;

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

  return { props: { jointEvent: jointEvent } };
}