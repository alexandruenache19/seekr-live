import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import { Flex, Stack, Text, Avatar, Center, Button } from '@chakra-ui/react'
import ReactPlayer from 'react-player'
import { Pressable } from 'react-native'
import AddToCalendarHOC from 'react-add-to-calendar-hoc'
import {
  FaShareSquare,
  FaPlus,
  FaVolumeMute
} from 'react-icons/fa'
import { FiShare } from 'react-icons/fi'
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

    this.state = {
      muted: true
    }

    this.handleFollow = this.handleFollow.bind(this)
    this.handleShowReserveModal = this.handleShowReserveModal.bind(this)
    this.handleReminderEmail = this.handleReminderEmail.bind(this)
    this.handleShare = this.handleShare.bind(this)
  }

  componentDidMount () {
    this.handleShowReserveModal()
  }

  handleShare () {
    const { sellerInfo } = this.props
    this.props.onOpenModal('share', { username: sellerInfo.username })
  }

  handleFollow () {
    this.props.onOpenModal('follow', {})
  }

  handleShowReserveModal () {
    const { eventInfo } = this.props
    // this.props.onOpenModal('text', { eventId: eventInfo.id })
    this.props.onOpenModal('reserve', {
      eventId: eventInfo.id
    })
  }

  handleReminderEmail () {
    this.props.onOpenModal('email', {})
  }

  render () {
    const { muted } = this.state
    const {
      isOnMobile,
      sellerInfo,
      eventInfo,
      comments,
      username
    } = this.props
    const date = moment(eventInfo.timestamp).format('DD MMM')
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
      <Pressable onPress={args.click}>
        <Flex
          style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10 }}
          py='5px'
          px='8px'
          borderRadius='xl'
          cursor='pointer'
          align='center'
        // className='quantity-label'
        >
          <BiTimeFive size={22} color='#FFF' />
          <Text color='#FFFFFF' fontSize={14} marginLeft='4px'>
            {`${time} - ${date}`}
          </Text>
        </Flex>
      </Pressable>
      // <Button
      //   onClick={args.onClick}
      //   shadow='md'
      //   borderRadius='15px'
      //   bg='rgba(0,0,0,0.8)'
      // >

      //   <BiTimeFive size={30} />
      //   <Text color='#FFFFFF' fontSize={14}>
      //     {`${time} - ${date}`}
      //   </Text>
      //   {/* <a>{args.children}</a>
      //   <Center pl='5px'>
      //     <BiCalendarPlus size={26} />
      //   </Center> */}
      // </Button>
    )

    const AddToCalendarComp = AddToCalendarHOC(
      isOnMobile ? WebButton : WebButton,
      Modal
    )

    return (
      <Stack
        align='center'
        w='100vw'
        h='100vh'
        justify='center'
        className='perfect-height-wrapper'
      >
        <Stack align='center' maxW='500px' w='100%' px='1.5rem'>
          <Stack alignItems='center'>
            {sellerInfo.imageURL ? (
              <img
                src={sellerInfo.imageURL}
                style={{
                  height: 50,
                  width: 50,
                  marginBlock: 5,
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            ) : null}
            {sellerInfo.name ? (
              <Text
                ml={2}
                fontWeight='bold'
                fontSize={18}
              >{`@${sellerInfo.name}`}
              </Text>
            ) : null}
          </Stack>
          <Text textAlign='center'>{eventInfo.title}</Text>

          <div style={{
            position: 'relative',
            maxWidth: '100%',
            marginTop: '1.2rem',
            marginBottom: '0.8rem',
            backgroundColor: '#000',
            borderRadius: 15,
            width: '100%',
            height: '60vh'
          }}
          >
            <ReactPlayer
              className='react-player'
              url={eventInfo.videoURL}
              // url='https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4'
              width='100%'
              height='100%'
              playing
              muted={muted}
              playsinline
              style={{ overflow: 'hidden', objectFit: 'cover' }}
              loop
            />

            {muted ? (
              <Center
                onClick={() => this.setState({ muted: false })}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  borderRadius: 15,
                  zIndex: 3,
                  top: 0,
                  left: 0,
                  marginTop: 0,
                  cursor: 'pointer',
                  backgroundColor: 'rgba(0,0,0,0.3)'
                }}
              >
                <Center style={{ backgroundColor: 'rgba(0,0,0,0.75)', width: 60, height: 60, borderRadius: 30 }}>
                  <FaVolumeMute style={{ fontSize: 22, color: '#FFF' }} />
                </Center>
              </Center>
            ) : null}
            <Stack
              style={{ position: 'absolute', top: 7, left: 7, zIndex: 3 }}
              borderRadius='xl'
            // className='quantity-label'
            >
              <AddToCalendarComp />
              {/* <Text color='#FFFFFF' fontSize={14}>
                {`${time} - ${date}`}
              </Text> */}
            </Stack>
            <Stack
              style={{ position: 'absolute', top: 7, right: 7, zIndex: 3 }}
              h='2em'
              w='2em'
              align='center'
              justify='center'
              onClick={this.handleShare}
              cursor='pointer'
            >
              <FiShare size={20} color='#FFFFFF' />
            </Stack>
          </div>
          <div
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              textAlign: 'center'
            }}
          >
            <Button
              style={{
                backgroundColor: '#000',
                width: '100%',
                background: 'rgb(63,60,145)',
                background:
                  'linear-gradient(48deg, rgba(63,60,145,1) 0%, rgba(242,67,106,1) 100%)'
              }}
              borderRadius={10}
              onClick={this.handleShowReserveModal}
            >
              <Text style={{ color: '#FFFFFF' }}>Rezerva loc</Text>
            </Button>
          </div>
        </Stack>

      </Stack>
    )
  }
}

const styles = {}

export default withRouter(EventScreen)
