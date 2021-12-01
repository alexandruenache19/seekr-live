import React, { useState } from 'react'
import {
  Center,
  useDisclosure,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  useToast,
  Stack,
  Button,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader
} from '@chakra-ui/react'
import firebase from '../../../firebase/clientApp'

const ReserveModalContent = ({
  isOpen,
  onClose,
  isOnMobile,
  isConfirmModal,
  eventId,
  ...props
}) => {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const toast = useToast()
  return (
    <Stack
      style={{
        overflow: 'scroll',
        maxHeight: '60vh',
        paddingBottom: '1rem'
      }}
    >
      <FormControl id='name' isRequired style={{ marginBottom: 10 }}>
        <Input
          value={name}
          placeholder='Nume si prenume'
          onChange={e => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id='phone' isRequired style={{ marginBottom: 10 }}>
        <Input
          placeholder='Numar de telefon'
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
      </FormControl>
      <FormControl id='address' isRequired style={{ marginBottom: 10 }}>
        <FormControl id='address-line-1'>
          <Input
            placeholder='Adresa de livrare'
            value={addressLine1}
            onChange={e => setAddressLine1(e.target.value)}
          />
        </FormControl>
      </FormControl>
      <Button
        style={{ backgroundColor: '#121212', flex: 1, padding: 10 }}
        onClick={async () => {
          if (isConfirmModal) {
            props.setDetails({
              name: name,
              phoneNumber: phoneNumber,
              addressLine1: addressLine1
            })
            toast({
              title: 'Confirmat',
              status: 'success',
              duration: 1500,
              isClosable: false
            })
            onClose()
          } else {
            if (name !== '' && phoneNumber !== '') {
              await firebase
                .database()
                .ref(`events/${eventId}/waitlist`)
                .push({
                  name: name,
                  phoneNumber: phoneNumber,
                  addressLine1: addressLine1
                })
              toast({
                title: 'Loc rezervat cu succes',
                status: 'success',
                duration: 3000,
                isClosable: false
              })
              onClose()
            } else {
              alert('Te rugam completeaza formularul')
            }
          }
        }}
      >
        <Text style={{ color: '#FFFFFF' }}>
          {isConfirmModal ? 'Confirm' : 'Rezerva-mi locul'}
        </Text>
      </Button>
    </Stack>
  )
}

export default ReserveModalContent
