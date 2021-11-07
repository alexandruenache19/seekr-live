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
  constructor(props) {
    super(props)

    this.state = {
      muted: true
    }

    this.handleFollow = this.handleFollow.bind(this)
    this.handleReminderText = this.handleReminderText.bind(this)
    this.handleReminderEmail = this.handleReminderEmail.bind(this)
    this.handleShare = this.handleShare.bind(this)
  }

  handleShare() {
    const { sellerInfo } = this.props
    this.props.onOpenModal('share', { username: sellerInfo.username })
  }

  handleFollow() {
    this.props.onOpenModal('follow', {})
  }

  handleReminderText() {
    const { eventInfo } = this.props
    this.props.onOpenModal('text', { eventId: eventInfo.id })
  }

  handleReminderEmail() {
    this.props.onOpenModal('email', {})
  }

  render() {
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
            backgroundColor: '#999',
            borderRadius: 15,
            width: '100%',
            height: '60vh'
          }}
          >
            <ReactPlayer
              className='react-player'
              url={eventInfo.videoURL}
              width='100%'
              height='120%'
              playing
              muted={muted}
              playsinline
              style={{ marginTop: -20 }}
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
                width: '100%'
              }}
              borderRadius={10}
              onClick={this.handleReminderText}
            >
              <Text style={{ color: '#FFFFFF' }}>Anunta-ma cu 5 min inainte</Text>
            </Button>
          </div>
        </Stack>

      </Stack>
      // <Flex
      //   bgColor='#FFF'
      //   h='100vh'
      //   w='100vw'
      //   justify='center'
      //   alignItems='center'
      //   backgroundSize='cover'
      //   backgroundPosition='center'
      //   className='perfect-height-wrapper'
      // >
      //   <Stack
      //     w={isOnMobile ? '100%' : '70vw'}
      //     h={isOnMobile ? '100vh' : '94vh'}
      //     bg='rgba(255,255,255,0.4)'
      //     borderRadius={isOnMobile ? 0 : '20px'}
      //     p='1.4rem'
      //   >
      //     <Flex
      //       justify='space-between'
      //       alignItems='center'
      //       h='10vh'
      //       w='100%'
      //     >
      //       <Flex
      //         h='100%'
      //         py='10px'
      //         w='100%'
      //         // bg='#F2F4F9'
      //         borderRadius='15px'
      //         overflow='hidden'
      //         justify='space-between'
      //       >
      //         <Flex>
      //           <Avatar name={sellerInfo.name} src={sellerInfo.imageURL} />
      //           <Stack ml='10px'>
      //             <Text fontWeight='bold' fontSize='md'>
      //               {eventInfo.title}
      //             </Text>
      //             <Text style={{ marginTop: -3 }}>
      //               @{sellerInfo.username}
      //             </Text>
      //           </Stack>
      //         </Flex>

      //         <Center>
      //           <Button
      //             h='3em'
      //             shadow='md'
      //             ml='1em'
      //             borderRadius='1.5em'
      //             bg='#FFF'
      //             onClick={this.handleShare}
      //           >
      //             <FiShare size={20} />
      //           </Button>
      //         </Center>
      //       </Flex>
      //     </Flex>
      //     <Center
      //       style={{ marginTop: '1rem', maxHeight: 'calc(94vh - 16vh)' }}
      //       h='100%'
      //       w='100%'
      //     >
      //       <Stack
      //         h='100%'
      //         w='100%'
      //         bg='rgba(0,0,0,0.9)'
      //         borderRadius='15px'
      //         overflow='hidden'
      //         position='relative'
      //       >

      //         <ReactPlayer
      //           className='react-player'
      //           url={eventInfo.videoURL}
      //           width='100%'
      //           height='120%'
      //           playing
      //           muted={muted}
      //           playsinline
      //           style={{ marginTop: -20 }}
      //           loop
      //         />

      //         {muted ? (
      //           <Center
      //             onClick={() => this.setState({ muted: false })}
      //             style={{
      //               width: '100%',
      //               height: '100%',
      //               position: 'absolute',
      //               zIndex: 3,
      //               top: 0,
      //               left: 0,
      //               marginTop: 0,
      //               cursor: 'pointer',
      //               backgroundColor: 'rgba(0,0,0,0.3)'
      //             }}
      //           >
      //             <Center style={{ backgroundColor: 'rgba(0,0,0,0.75)', width: 60, height: 60, borderRadius: 30 }}>
      //               <FaVolumeMute style={{ fontSize: 22, color: '#FFF' }} />
      //             </Center>
      //           </Center>
      //         ) : null}

      //         <Center
      //           position='absolute'
      //           bottom='5px'
      //           width={isOnMobile ? '100%' : 'auto'}
      //           left={isOnMobile ? 'auto' : '10px'}
      //           zIndex={10}
      //         >
      //           <AddToCalendarComp event={event} />
      //         </Center>

      //         <Center
      //           position='absolute'
      //           bottom={isOnMobile ? 'auto' : '5px'}
      //           right={isOnMobile ? 'auto' : '10px'}
      //           left={isOnMobile ? '0px' : 'auto'}
      //           zIndex={10}
      //           width={isOnMobile ? '100%' : 'auto'}
      //           top={isOnMobile ? 0 : 'auto'}
      //         >
      //           <Button
      //             h='3em'
      //             shadow='md'
      //             borderRadius='15px'
      //             bg='#FFF'
      //             onClick={this.handleReminderText}
      //           >
      //             <BiMessageSquareDots size={26} />
      //             <Text pl='6px' color='#000' fontWeight='bold' fontSize='lg'>Anunta-ma cu 5 min inainte</Text>
      //           </Button>
      //         </Center>
      //       </Stack>
      //     </Center>
      //   </Stack>
      // </Flex>
    )
  }
}

const styles = {}

export default withRouter(EventScreen)
