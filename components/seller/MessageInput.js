import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Flex, Input, Button, useDisclosure } from '@chakra-ui/react'
import { FaRegPaperPlane } from 'react-icons/fa'
import { EventActions } from '../../actions'
const { addComment } = EventActions

const MessageInput = ({ eventId, onOpenModal, username }) => {
  const [message, setMessage] = useState('')

  function handleChange (event) {
    setMessage(event.target.value)
  }

  function handleSendMessage () {
    if (message !== '' && username !== '') {
      addComment(
        {
          text: message,
          username: username
        },
        eventId
      )
      setMessage('')
    } else {
      onOpenModal('comment', {})
    }
  }

  return (
    <Flex
      borderRadius='xl'
      p='10px'
      bg='#FFF'
      style={{ justifyContent: 'space-between', marginTop: 0 }}
    >
      <Input
        value={message}
        onChange={handleChange}
        placeholder='write your message...'
      />
      <Button onClick={handleSendMessage} style={{ marginLeft: 10 }}>
        <FaRegPaperPlane size={22} />
      </Button>
    </Flex>
  )
}

const styles = {}

export default MessageInput
