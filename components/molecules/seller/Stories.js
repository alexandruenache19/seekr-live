import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Pressable, ScrollView } from 'react-native'
import { Flex, Button, Stack, Text } from '@chakra-ui/react'
import { FaRegPaperPlane } from 'react-icons/fa'
// import { MdArrowBack } from 'react-icons/md'
import { ImExit } from 'react-icons/im'
import AmazonIVSPreview from './AmazonIVSPreview'

const Stories = ({ events, onGoBack, onGetSetEvent }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height: '17vh', minHeight: 110 }}
    >
      {onGoBack ? (
        <Pressable
          style={{ marginRight: 10 }}
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
      ) : null}
      {events.map(eventData => {
        return (
          <Pressable
            key={eventData.event.info.id}
            style={{ marginRight: 10 }}
            onPress={() => onGetSetEvent(eventData.event.info.id)}
          >
            <Stack
              h='100%'
              width='90px'
              bg='#999'
              borderRadius='15px'
              key={eventData.event.id}
            >
              <AmazonIVSPreview
                id={eventData.event.id}
                url={
                  eventData.event.info.status === 'live' &&
                    eventData.event.info.liveURL
                    ? eventData.event.info.liveURL
                    : eventData.event.info.videoURL
                }
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
