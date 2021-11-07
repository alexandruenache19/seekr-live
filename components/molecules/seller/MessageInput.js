import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Flex,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useDisclosure
} from '@chakra-ui/react';
import { FaRegPaperPlane } from 'react-icons/fa';
import { EventActions } from '../../../actions';
const { addComment } = EventActions

const MessageInput = ({ eventId, onOpenModal, username }) => {
  const [message, setMessage] = useState('')

  function handleChange(event) {
    setMessage(event.target.value)
  }

  function handleSendMessage() {
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
      onOpenModal('comment', {
        onSendMessage: usr => {
          addComment(
            {
              text: message,
              username: usr
            },
            eventId
          )
          setMessage('')
        }
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleSendMessage()
  };

  return (
    <Flex
      borderRadius='20px'
      // p='10px'
      bg='#FFF'
      style={{ justifyContent: 'space-between', marginTop: 0 }}
    >
      <InputGroup as='form' style={{ borderRadius: 20 }}>
        <Input
          value={message}
          onChange={handleChange}
          onSubmit={handleSubmit}
          style={{ borderRadius: 20 }}
          placeholder='Intreaba ceva...'
        />
        <InputRightElement
          children={
            <Button
              type='submit'
              onClick={handleSubmit}
              style={{ padding: 0, borderRadius: 20 }}
            >
              <FaRegPaperPlane style={{ fontSize: 16 }} />
            </Button>
          }
        />
      </InputGroup>
    </Flex>
  )
};

const styles = {}

export default MessageInput
