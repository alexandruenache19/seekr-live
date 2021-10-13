import { useState } from 'react'
import {
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  PhoneIcon,
  Button,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { FiPhone } from 'react-icons/fi'
import firebase from '../../../firebase/clientApp'

const TextModalContent = ({ onClose, eventId }) => {
  const toast = useToast()

  const [phoneNumber, setPhoneNumber] = useState()

  async function handleSubmit () {
    toast({
      title: 'Done',
      description: 'You will get a text message 5 minutes before the event starts',
      status: 'success',
      duration: 5000,
      isClosable: true
    })

    await firebase
      .database()
      .ref(`events/${eventId}/waitlist`)
      .update({
        [phoneNumber]: true
      })

    onClose()
  }

  return (
    <Center>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          children={<FiPhone color='gray.300' />}
        />
        <Input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type='tel'
          placeholder='Phone number (please include country code)'
        />
      </InputGroup>
      <Button ml='10px' onClick={handleSubmit} variant='outline'>
        Submit
      </Button>
    </Center>
  )
}

export default TextModalContent
