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
import { FiMail } from 'react-icons/fi'

const CommentModelContent = ({ onClose, callback, onSendMessage }) => {
  const toast = useToast()
  const [username, setUsername] = useState('')

  function handleChange(event) {
    setUsername(event.target.value)
  }

  function handleSubmit() {
    toast({
      title: 'Great',
      description: 'You can comment now',
      status: 'success',
      duration: 2000,
      isClosable: true
    })

    onClose()
    callback({ type: 'comment', text: username })
    onSendMessage(username)
  }

  return (
    <Center>
      <Input
        value={username}
        onChange={handleChange}
        placeholder='type here...'
      />
      <Button onClick={handleSubmit} ml='10px' variant='outline'>
        Done
      </Button>
    </Center>
  )
}

export default CommentModelContent
