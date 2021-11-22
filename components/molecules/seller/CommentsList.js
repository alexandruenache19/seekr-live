import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react'
import { ScrollView } from 'react-native'
import {
  List,
  ListItem,
  Avatar,
  Flex,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'

const CommentsList = ({ comments, isOnMobile }) => {
  const divRef = useRef()

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
    }
  })

  return (
    <List
      // showsVerticalScrollIndicator={false}
      style={{ overflowY: 'auto', width: '100%' }}
      spacing={3}
      className='comment-list'
    >
      {comments.map((comment, i) => (
        <ListItem key={i} style={{ marginTop: 5 }}>
          <Flex justify='flex-start' alignItems=''>
            {/* <Avatar size='sm' style={{ width: 24, height: 24 }} name={comment.username} /> */}
            <Stack
              justify='center'
              borderRadius='xl'
              style={{ marginTop: 0 }}
            >
              <Text color={isOnMobile ? '#FFFFFF' : '#000'} fontSize={13}>
                <span style={{ color: isOnMobile ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>{`@${comment.username}  `}</span>
                {comment.text}
              </Text>
            </Stack>
          </Flex>
        </ListItem>
      ))}
      <div ref={divRef} />
    </List>
  )
}

const styles = {}

export default CommentsList
