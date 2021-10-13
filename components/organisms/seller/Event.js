import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import { Flex, Stack, Text, Avatar, Center, Button } from '@chakra-ui/react'
import ReactPlayer from 'react-player'
import AddToCalendarHOC from 'react-add-to-calendar-hoc'
import {
  FaShareSquare,
  FaPlus
} from 'react-icons/fa'
import {
  BiCalendarHeart,
  BiTimeFive,
  BiMailSend,
  BiCalendarPlus,
  BiMessageSquareDots
} from 'react-icons/bi'
import moment from 'moment'

class EventScreen extends PureComponent {
  constructor (props) {
    super(props)

    this.handleFollow = this.handleFollow.bind(this)
    this.handleReminderText = this.handleReminderText.bind(this)
    this.handleReminderEmail = this.handleReminderEmail.bind(this)
    this.handleShare = this.handleShare.bind(this)
  }

  handleShare () {
    const { sellerInfo } = this.props
    this.props.onOpenModal('share', { username: sellerInfo.username })
  }

  handleFollow () {
    this.props.onOpenModal('follow', {})
  }

  handleReminderText () {
    const { eventInfo } = this.props
    this.props.onOpenModal('text', { eventId: eventInfo.id })
  }

  handleReminderEmail () {
    this.props.onOpenModal('email', {})
  }

  render () {
    const {
      isOnMobile,
      sellerInfo,
      eventInfo,
      comments,
      username
    } = this.props
    const date = moment(eventInfo.timestamp).format('dddd, DD MMM')
    const time = moment(eventInfo.timestamp).format('HH:mm')

    const startDatetime = moment(eventInfo.timestamp)
    const endDatetime = startDatetime.clone().add(1, 'hours')
    const duration = moment.duration(endDatetime.diff(startDatetime)).asHours()
    const event = {
      description: `${sellerInfo.category} sale on Seekr`,
      duration: duration,
      endDatetime: endDatetime.format('YYYYMMDDTHHmmssZ'),
      startDatetime: startDatetime.format('YYYYMMDDTHHmmssZ'),
      title: `${eventInfo.title} by @${sellerInfo.username}`
    }

    const Modal = args => {
      this.props.onOpenModal('calendar', { data: args.children })
      return <Center />
    }

    const MobileButton = args => (
      <Button
        flexDirection='column'
        h='3em'
        shadow='md'
        borderRadius='1em'
        onClick={args.onClick}
        bg='#FFF'
      >
        <BiCalendarPlus size={26} />
        <Text fontSize={10} fontWeight='normal'>
          {args.children}
        </Text>
      </Button>
    )

    const WebButton = args => (
      <Button
        onClick={args.onClick}
        h='3em'
        shadow='md'
        borderRadius='1.5em'
        bg='#FFF'
      >

        <BiTimeFive size={30} />
        <Text pl='6px' color='#000' fontWeight='bold' fontSize='lg'>
          {`${date} at ${time}`}
        </Text>
        {/* <a>{args.children}</a>
        <Center pl='5px'>
          <BiCalendarPlus size={26} />
        </Center> */}
      </Button>
    )

    const AddToCalendarComp = AddToCalendarHOC(
      isOnMobile ? WebButton : WebButton,
      Modal
    )

    return (
      <Flex
        bgColor='#FFF'
        h='100vh'
        w='100vw'
        justify='center'
        alignItems='center'
        bg='url("https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80")'
      >
        <Stack
          w={isOnMobile ? '100%' : '70vw'}
          h={isOnMobile ? '100vh' : '94vh'}
          bg='rgba(255,255,255,0.4)'
          borderRadius={isOnMobile ? 0 : '20px'}
          boxShadow='0px 0px 41px 6px rgba(0,0,0,0.45)'
          p='1.4rem'
        >
          <Flex
            justify='space-between'
            alignItems='center'
            h='auto'
            w='100%'
          >
            {/* <Text fontWeight='bold' fontSize='2xl'>
              seekr.
            </Text> */}
            <Flex
              h='100%'
              p='10px'
              w='100%'
              bg='#F2F4F9'
              borderRadius='xl'
              overflow='hidden'
              justify='space-between'
            >
              <Center>
                <Avatar name={sellerInfo.name} src={sellerInfo.imageURL} />
                <Stack ml='10px'>
                  <Text fontWeight='bold' fontSize='lg'>
                    {eventInfo.title} by @{sellerInfo.username}
                  </Text>
                  {/* <Text color='#718096' fontSize='sm'>
                    {sellerInfo.category}
                  </Text> */}
                </Stack>
              </Center>

              <Center>
                {/* <Button
                  h='3em'
                  shadow='md'
                  borderRadius='1.5em'
                  bg='#FFF'
                  onClick={this.handleFollow}
                >
                  <a style={{ paddingRight: '5px' }}>Follow</a>
                  <FaPlus size={26} />
                </Button> */}
                <Button
                  h='3em'
                  shadow='md'
                  ml='1em'
                  borderRadius='1.5em'
                  bg='#FFF'
                  onClick={this.handleShare}
                >
                  <Text fontWeight='bold' fontSize='md' marginRight='0.5rem'>Share</Text>
                  <FaShareSquare size={20} />
                </Button>
              </Center>
            </Flex>
          </Flex>
          <Center
            style={{ marginTop: '1rem' }}
            h='100%'
            w='100%'
          >
            <Stack
              h='100%'
              w='100%'
              bg='rgba(0,0,0,0.9)'
              borderRadius='xl'
              overflow='hidden'
              position='relative'
            >
              <ReactPlayer
                className='bg-player'
                url={eventInfo.videoURL}
                width='100%'
                height='100%'
                playing
                loop
              />

              <ReactPlayer
                className='react-player'
                url={eventInfo.videoURL}
                width='100%'
                height='100%'
                playing
                style={{ marginTop: 0 }}
                loop
              />

              <Center
                position='absolute'
                top='5px'
                width={isOnMobile ? '100%' : 'auto'}
                left={isOnMobile ? 'auto' : '10px'}
                zIndex={10}
              >
                <AddToCalendarComp event={event} />
              </Center>

              <Center
                position='absolute'
                top={isOnMobile ? 'auto' : '5px'}
                right={isOnMobile ? 'auto' : '10px'}
                left={isOnMobile ? '0px' : 'auto'}
                zIndex={10}
                width={isOnMobile ? '100%' : 'auto'}
                bottom={isOnMobile ? '10px' : 'auto'}
              >
                <Button
                  h='3em'
                  shadow='md'
                  borderRadius='1.5em'
                  bg='#FFF'
                  onClick={this.handleReminderText}
                >
                  <BiMessageSquareDots size={26} />
                  <Text pl='6px' color='#000' fontWeight='bold' fontSize='lg'>Text me 5 min before</Text>
                </Button>
              </Center>
            </Stack>
          </Center>

          {/* <Center p='20px' h='15vh' w='100%'>
            <Flex
              h='100%'
              w='100%'
              p='10px'
              bg='#F2F4F9'
              borderRadius='xl'
              overflow='hidden'
              style={{
                justifyContent: 'center',
                marginTop: 0,
                alignItems: 'center'
              }}
            >
              <Button
                h='3em'
                ml='10px'
                shadow='md'
                borderRadius='1.5em'
                bg='#FFF'
                onClick={this.handleReminderEmail}
              >
                <a>Remind me via email</a>
                <Center pl='5px'>
                  <BiMailSend size={26} />
                </Center>
              </Button>

              <Button
                h='3em'
                ml='10px'
                shadow='md'
                borderRadius='1.5em'
                bg='#FFF'
                onClick={this.handleReminderText}
              >
                <a>Text me 5 min before</a>
                <Center pl='5px'>
                  <BiMessageSquareDots size={26} />
                </Center>
              </Button>
            </Flex>
          </Center> */}
        </Stack>
        {/* <Center p='20px' pl='0px' h='100vh' w='30vw'>
          <Stack
            h='100%'
            p='20px'
            w='100%'
            bg='#EEF2F8'
            borderRadius='xl'
            style={{ justifyContent: 'space-between' }}
          >
            <Text color='#000' fontWeight='bold'>
              Ask a question before the event
            </Text>
            <CommentsList comments={comments} />
            <MessageInput
              onOpenModal={this.props.onOpenModal}
              username={username}
              eventId={eventInfo.id}
            />
          </Stack>
        </Center> */}
      </Flex>
    )
  }
}

const styles = {}

export default withRouter(EventScreen)
