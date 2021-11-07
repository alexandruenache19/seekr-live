import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react'
import {
  List,
  ListItem,
  Avatar,
  Flex,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'

const CommentsList = ({ comments }) => {
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
    <List style={{ overflowY: 'auto', width: '100%' }} spacing={3} pt='5px'>
      {comments.map((comment, i) => (
        <ListItem key={i}>
          <Flex justify='flex-start' alignItems=''>
            {/* <Avatar size='sm' style={{ width: 24, height: 24 }} name={comment.username} /> */}
            <Stack
              justify='center'
              ml='5px'
              borderRadius='xl'
            >
              <Text color='#FFFFFF' fontSize={13}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>{`@${comment.username}  `}</span>
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
