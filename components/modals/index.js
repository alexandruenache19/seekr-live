import React, { useState, forwardRef, useImperativeHandle } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Center,
  Text,
  useDisclosure
} from '@chakra-ui/react'

import {
  OrderModalContent,
  CalendarModalContent,
  ShareModalContent,
  FollowModalContent,
  CommentModelContent,
  TextModalContent,
  EmailModalContent,
  PaymentModalContent
} from './content'

const info = {
  share: {
    title: 'Share Event',
    subtitle: 'Share this event with your friends.'
  },
  calendar: {
    title: 'Add To Calendar',
    subtitle: 'Where do you want to save the event?'
  },
  comment: {
    title: 'What is you name?',
    subtitle: 'Add your name to comment.'
  },
  text: {
    title: 'Text me',
    subtitle: 'Get a text 5 minutes before the event starts.'
  },
  email: {
    title: 'Email me',
    subtitle: 'Get an email 5 minutes before the event starts.'
  },
  order: { title: 'Complete Your Order', subtitle: '' },
  payment: { title: 'Complete Your Order', subtitle: '' },
  follow: { title: 'Download the app to follow', subtitle: 'Down' }
}

const renderContent = (type, props) => {
  switch (type) {
    case 'share':
      return <ShareModalContent {...props} />
    case 'calendar':
      return <CalendarModalContent {...props} />
    case 'comment':
      return <CommentModelContent {...props} />
    case 'text':
      return <TextModalContent {...props} />
    case 'email':
      return <EmailModalContent {...props} />
    case 'follow':
      return <FollowModalContent {...props} />
    case 'order':
      return <OrderModalContent {...props} />
    case 'payment':
      return <PaymentModalContent {...props} />
    default:
  }
}

const CustomModal = ({ isOnMobile, callback }, ref) => {
  const { onClose, onOpen, isOpen } = useDisclosure()
  const [type, setType] = useState('share')
  const [props, setProps] = useState({})
  const initialRef = React.useRef()
  const finalRef = React.useRef()

  useImperativeHandle(ref, () => ({
    openModal (type, props) {
      setType(type)
      setProps({ ...props, onCloseModal: onClose })
      onOpen()
    }
  }))

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      motionPreset='scale'
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size='2xl'
    >
      <ModalOverlay />
      <ModalContent
        p={isOnMobile ? 0 : 10}
        py={isOnMobile ? 5 : 10}
        ref={initialRef}
        borderRadius={isOnMobile ? 10 : 30}
        {...styles}
      >
        <ModalHeader>
          <Text>{info[type].title}</Text>
          <Text fontSize={14} fontWeight='normal'>
            {info[type].subtitle}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {renderContent(type, {
            ...props,
            isOnMobile,
            onClose,
            callback
          })}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const styles = {}

export default forwardRef(CustomModal)
