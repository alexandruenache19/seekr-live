import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import { Flex, Stack, Text, Avatar, Center, Button } from '@chakra-ui/react'
import ReactPlayer from 'react-player'
import AddToCalendarHOC from 'react-add-to-calendar-hoc'
import {
  FaShareSquare,
  FaRegPaperPlane,
  FaPlus,
  FaMinus,
  FaArrowRight,
  FaHeart
} from 'react-icons/fa'
import { FiShare, FiEye } from 'react-icons/fi'
import {
  BiCalendarHeart,
  BiTimeFive,
  BiMailSend,
  BiCalendarPlus,
  BiMessageSquareDots
} from 'react-icons/bi'
import moment from 'moment'

import { MessageInput, CommentsList } from '../../../components'
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
    this.props.onOpenModal('text', {})
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
        <a>{args.children}</a>
        <Center pl='5px'>
          <BiCalendarPlus size={26} />
        </Center>
      </Button>
    )

    const AddToCalendarComp = AddToCalendarHOC(
      isOnMobile ? MobileButton : WebButton,
      Modal
    )

    if (isOnMobile) {
      return (
        <Stack h='100vh' w='100vw' p='10px' bg='#FFF'>
          <Flex h='10vh' justify='space-between' alignItems='center'>
            <Text p='10px' fontWeight='bold' fontSize='sm'>
              seekr.
            </Text>
            <Flex
              flex={1}
              bg='#F2F4F9'
              p='10px'
              borderRadius='xl'
              overflow='hidden'
              justify='space-between'
            >
              <Stack justify='space-between'>
                <Flex>
                  <Avatar
                    size='xs'
                    name={sellerInfo.name}
                    src={sellerInfo.imageURL}
                  />
                  <Text
                    ml='0.2em'
                    noOfLines={1}
                    fontSize={10}
                    fontWeight='bold'
                  >
                    @{sellerInfo.username}
                  </Text>
                </Flex>
                <Text style={{ marginTop: 0 }} noOfLines={1} fontSize='sm'>
                  {eventInfo.title}
                </Text>
              </Stack>

              <Center>
                <Button
                  bg='#FFF'
                  borderRadius='1em'
                  onClick={this.handleFollow}
                >
                  <FaPlus size={20} />
                </Button>
                <Button
                  ml='0.2em'
                  borderRadius='1em'
                  bg='#FFF'
                  onClick={this.handleShare}
                >
                  <FaShareSquare size={20} />
                </Button>
              </Center>
            </Flex>
          </Flex>
          <Stack
            h='50vh'
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
              style={{ marginTop: 0 }}
              playing
              loop
            />
          </Stack>
          <Stack
            p='10px'
            h='20vh'
            bg='#EEF2F8'
            borderRadius='xl'
            style={{ justifyContent: 'space-between' }}
          >
            <CommentsList comments={comments} />
            <MessageInput
              onOpenModal={this.props.onOpenModal}
              username={username}
              eventId={eventInfo.id}
            />
          </Stack>

          <Stack
            p='10px'
            h='15vh'
            w='100%'
            bg='#EEF2F8'
            borderRadius='xl'
            overflow='hidden'
            style={{ justifyContent: 'space-between' }}
          >
            <Text fontWeight='bold' fontSize={20} textAlign='center'>
              Choose your reminder
            </Text>
            <Center>
              <AddToCalendarComp event={event} />
              <Button
                h='3em'
                ml='10px'
                flexDirection='column'
                shadow='md'
                borderRadius='1em'
                bg='#FFF'
                onClick={this.handleReminderEmail}
              >
                <BiMailSend size={26} />
                <Text fontSize={10} fontWeight='normal'>
                  Email me
                </Text>
              </Button>

              <Button
                h='3em'
                ml='10px'
                flexDirection='column'
                shadow='md'
                borderRadius='1em'
                bg='#FFF'
                onClick={this.handleReminderText}
              >
                <BiMessageSquareDots size={26} />
                <Text fontSize={10} fontWeight='normal'>
                  Text me
                </Text>
              </Button>
            </Center>
          </Stack>
        </Stack>
      )
    }

    return (
      <Flex bg='#FFF' h='100vh' w='100vw' justify='space-between'>
        <Stack w='70vw'>
          <Flex
            justify='space-between'
            alignItems='center'
            p='20px'
            h='15vh'
            w='100%'
          >
            <Text fontWeight='bold' fontSize='2xl'>
              seekr.
            </Text>
            <Flex
              h='100%'
              p='10px'
              w='85%'
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
                  <Text color='#718096' fontSize='sm'>
                    {sellerInfo.category}
                  </Text>
                </Stack>
              </Center>

              <Center>
                <Button
                  h='3em'
                  shadow='md'
                  borderRadius='1.5em'
                  bg='#FFF'
                  onClick={this.handleFollow}
                >
                  <a style={{ paddingRight: '5px' }}>Follow</a>
                  <FaPlus size={26} />
                </Button>
                <Button
                  h='3em'
                  shadow='md'
                  ml='1em'
                  borderRadius='1.5em'
                  bg='#FFF'
                  onClick={this.handleShare}
                >
                  <a style={{ paddingRight: '5px' }}>Share</a>
                  <FaShareSquare size={30} />
                </Button>
              </Center>
            </Flex>
          </Flex>
          <Center
            style={{ marginTop: 0 }}
            p='20px'
            pt='0px'
            pb='0px'
            h='70vh'
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

              <Center position='absolute' top='5px' left='5px' zIndex={10}>
                <Center
                  ml='10px'
                  borderRadius='xl'
                  p='10px'
                  bg='#FFF'
                  justifyContent='space-between'
                >
                  <BiCalendarHeart size={30} />
                  <Text pl='6px' color='#000' fontWeight='bold' fontSize='xl'>
                    {date}
                  </Text>
                </Center>
                <Center
                  ml='10px'
                  borderRadius='xl'
                  p='10px'
                  bg='#FFF'
                  justifyContent='space-between'
                >
                  <BiTimeFive size={30} />
                  <Text pl='6px' color='#000' fontWeight='bold' fontSize='xl'>
                    {time}
                  </Text>
                </Center>
              </Center>
            </Stack>
          </Center>

          <Center p='20px' h='15vh' w='100%'>
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
              <AddToCalendarComp event={event} />

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
          </Center>
        </Stack>
        <Center p='20px' pl='0px' h='100vh' w='30vw'>
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
        </Center>
      </Flex>
    )
  }
}

const styles = {}

export default withRouter(EventScreen)
