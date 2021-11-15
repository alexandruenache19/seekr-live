import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Pressable, ScrollView } from 'react-native'
import { Flex, Button, Stack, Text, Center } from '@chakra-ui/react'
import { FaRegPaperPlane } from 'react-icons/fa'
// import { MdArrowBack } from 'react-icons/md'
import { ImExit } from 'react-icons/im'
import AmazonIVSPreview from './AmazonIVSPreview'

const Stories = ({ events, participants, onGoBack, onGetSetEvent, currentEventId, secondsRemaining }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height: '17vh', minHeight: 110 }}
      contentContainerStyle={{ display: 'flex', alignItems: 'center' }}
    >
      {/* {onGoBack ? (
        <Pressable
          style={{ marginRight: 10, height: '100%' }}
          onPress={onGoBack}
        >
          <Stack
            h='100%'
            width='90px'
            bg='#000'
            borderRadius='15px'
            p='12px'
          >
            <ImExit size='20' style={{ color: '#FFF' }} />
            <Text fontWeight='bold' fontSize='14px' style={{ color: '#FFFFFF', width: 70, marginTop: 5, lineHeight: 1.3 }}>
              Inapoi la evenimente
            </Text>
          </Stack>
        </Pressable>
      ) : null} */}
      {events.map((eventData, index) => {
        return (
          <Pressable
            key={eventData.event.info.id}
            style={{ marginRight: 10, height: '100%', display: 'flex', justifyContent: 'center' }}
          // onPress={() => onGetSetEvent(eventData.event.info.id)}
          >
            <Stack
              h={currentEventId === eventData.event.info.id ? '100%' : '100%'}
              width='90px'
              bg='#999'
              className='full-height-on-hover'
              borderRadius='15px'
              key={eventData.event.id}
              borderColor='#FF0000'
              borderWidth={currentEventId === eventData.event.info.id ? 2 : 0}
            >
              {/* <AmazonIVSPreview
                id={eventData.event.id}
                url={
                  eventData.event.info.status === 'live' &&
                    eventData.event.info.liveURL
                    ? eventData.event.info.liveURL
                    : eventData.event.info.videoURL
                }
              /> */}
              {(index > 0 && events[index - 1].event.info.id === currentEventId) ||
                (index === 0 && events[events.length - 1].event.info.id === currentEventId) ? (
                  <Center
                    flexDir='column'
                    zIndex={3}
                    style={{
                      marginTop: 0,
                      position: 'absolute',
                      borderRadius: 15,
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0,0,0,0.5)'
                    }}
                  >
                    <Text color='#FFF' fontSize='14'>
                    Up next in
                    </Text>
                    <Text color='#FFF' fontWeight='bold' fontSize='16' style={{ marginTop: 0 }}>
                      {`${secondsRemaining}s`}
                    </Text>
                  </Center>
                ) : null}
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '15px',
                  filter: currentEventId === eventData.event.info.id ? 'none' : 'blur(2px)'
                }}
                src={eventData.sellerInfo.imageURL}
              />
            </Stack>
          </Pressable>
        )
      })}
    </ScrollView>
    // <Flex
    //   borderRadius='20px'
    //   overflowX='scroll'
    //   style={{
    //     justifyContent: 'flex-start'
    //   }}
    // >

  // </Flex>
  )
}

const styles = {}

export default Stories
