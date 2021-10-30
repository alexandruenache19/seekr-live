import React, { PureComponent, useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react'
import axios from 'axios'

export default class GeneratePaymentScreen extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}

    this.handleSignUp = this.handleSignUp.bind(this)
  }

  componentDidMount () { }

  async handleSignUp () {
    const { title, quantity, price, imageUrl } = this.state
    const req = await axios.post('/api/signup')

    try {
      window.open(req.data.url, '_self')
    } catch (err) {
      console.log('err', err)
    }
  }

  render () {
    const { } = this.state
    return (
      <Stack align='center' w='100vw'>
        <Button
          style={{ backgroundColor: '#28A445', width: '100%' }}
          onClick={this.handleSignUp}
        >
          <Text style={{ color: '#FFFFFF' }}>Sign Up</Text>
        </Button>
      </Stack>
    )
  }
}

const styles = {
  formRow: {
    marginTop: '1rem'
  }
}
