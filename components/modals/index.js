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
    title: 'Invită-ţi prietenii la acest eveniment!'
    // subtitle: "Descoperiti impreuna cele mai tari hain"
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
  order: { title: '', subtitle: '' },
  payment: { title: 'Plaseaza Comanda', subtitle: '' },
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
    openModal(type, props) {
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
      <ModalOverlay style={{ backdropFilter: 'blur(2px)' }} />
      <ModalContent
        p={isOnMobile ? 0 : '1.5rem'}
        py={isOnMobile ? 5 : '1.5rem'}
        ref={initialRef}
        borderRadius={isOnMobile ? 10 : 30}
        maxW={isOnMobile ? '93vw' : '50vw'}
        {...styles}
      >
        {info[type].title && info[type].title.length > 0 ? (
          <ModalHeader>
            <Text>{info[type].title}</Text>
            <Text fontSize={14} fontWeight='normal'>
              {info[type].subtitle}
            </Text>
          </ModalHeader>
        ) : null}
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
