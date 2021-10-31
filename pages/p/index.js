import React, { PureComponent, useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spinner,
  Flex,
  useClipboard
} from '@chakra-ui/react'
import axios from 'axios'
import { generateId } from '../../actions/helper'
import firebase from '../../firebase/clientApp'

const format = val => 'RON ' + val
const parse = val => val.replace(/RON /, '')

function CopyLink ({ value }) {
  const { hasCopied, onCopy } = useClipboard(value)

  return (
    <Flex justifyContent='center' alignItems='center' padding='10'>
      <Text fontStyle='italic'>{value}</Text>
      <Button onClick={onCopy} ml={2}>
        {hasCopied ? 'Copied' : 'Copy'}
      </Button>
    </Flex>
  )
}

export default class GeneratePaymentScreen extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      link: '',
      price: 0,
      quantity: 1,
      isLinkFetched: false,
      title: '',
      imageUrl: '',
      loading: false,
      isComplete: false,
      productLink: ''
    }

    this.handleFetchPost = this.handleFetchPost.bind(this)
    this.handleGeneratePaymentLink = this.handleGeneratePaymentLink.bind(this)
  }

  async componentDidMount () {
    // await axios.post('/api/create-awb-order', {

    // })
  }

  async handleFetchPost () {
    const { link } = this.state
    this.setState({ loading: true },
      async () => {
        const postReq = await axios.post('/api/fetch-post', {
          uid: 'NJv0oXqKUwcmWTW4VMjsr5HWJ4W2',
          url: link,
          saveInFirebase: false
        })

        this.setState({
          imageUrl: postReq.data.data.imageUrl,
          title: postReq.data.data.title,
          isLinkFetched: true,
          loading: false
        })

        console.log('post', postReq.data)
      }
    )
  }

  async handleGeneratePaymentLink () {
    const { title, quantity, price, imageUrl, link } = this.state
    this.setState(
      {
        loading: true
      },
      async () => {
        const productId = generateId(7)
        const req = await axios.post('/api/checkout', {
          productId: productId,
          name: title,
          quantity: quantity,
          price: price,
          imageUrl: imageUrl
        })

        this.setState({
          loading: false,
          productLink: `https://seekrlive.com/p/${productId}`,
          isComplete: true
        })

        await firebase
          .database()
          .ref(`products/${productId}`)
          .update({
            url: link,
            id: productId,
            name: title,
            price: parseFloat(price),
            imageUrl: imageUrl,
            quantity: parseFloat(quantity),
            paymentUrl: req.data.url
          })

        //   try {
        //     window.open(req.data.url, '_self')
        //   } catch (err) {
        //     console.log('err', err)
        //   }
      }
    )
  }

  render () {
    const {
      link,
      price,
      quantity,
      isLinkFetched,
      imageUrl,
      title,
      loading,
      isComplete,
      productLink
    } = this.state
    if (isComplete) {
      return (
        <Stack w='100vw' h='100vh' justifyContent='center' alignItems='center'>
          <Text fontWeight='bold'>
                        Add this link to your story to allow payment
          </Text>
          <CopyLink value={productLink} />
        </Stack>
      )
    }
    return (
      <Stack align='center' w='100vw'>
        {loading ? (
          <Stack
            w='100%'
            h='100%'
            position='absolute'
            top={0}
            zIndex={5}
            justifyContent='center'
            alignItems='center'
            bg='rgba(255,255,255,0.3)'
          >
            <Spinner color='#121212' size='md' />
          </Stack>
        ) : null}
        <Stack
          style={{ height: '100vh', overflow: 'scroll' }}
          w='100%'
          maxW='500px'
          px='1rem'
          justify='center'
          align='center'
        >
          <Stack
            style={{
              overflow: 'scroll',
              paddingBottom: '1rem',
              width: '100%',
              marginTop: -50
            }}
          >
            {isLinkFetched ? (
              <Stack align='center'>
                <img
                  src={imageUrl}
                  style={{
                    marginTop: '2rem',
                    // boxShadow: '0px 0px 36px -9px rgba(0,0,0,0.49)',
                    backgroundColor: '#999',
                    maxWidth: '70%',
                    height: 'auto',
                    maxHeight: 250,
                    borderRadius: 15,
                    objectFit: 'cover',
                    marginBottom: '1rem'
                  }}
                />
                <FormControl style={styles.formRow} id='title'>
                  <Input
                    placeholder='Product Title'
                    value={title}
                    onChange={e => this.setState({ title: e.target.value })}
                    _focus={{
                      border: '1px solid #999',
                      boxShadow: 'none'
                    }}
                  />
                </FormControl>
                <FormControl style={styles.formRow} id='price'>
                  <FormLabel>Product Price</FormLabel>
                  <NumberInput
                    placeholder='Price (RON)'
                    value={price}
                    onChange={number => {
                      console.log('v', number)
                      this.setState({ price: number })
                    }}
                    _focus={{
                      border: '1px solid #999',
                      boxShadow: 'none'
                    }}
                  >
                    <NumberInputField />
                  </NumberInput>
                  {/* <Input
                    placeholder='Price (RON)'
                    value={price}
                    onChange={(e) => this.setState({ price: e.target.value })}
                  /> */}
                </FormControl>
                <FormControl style={styles.formRow} id='quantity'>
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput
                    placeholder='Quantity'
                    value={quantity}
                    onChange={number => {
                      this.setState({ quantity: number })
                    }}
                    _focus={{
                      border: '1px solid #999',
                      boxShadow: 'none'
                    }}
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
              </Stack>
            ) : (
              <FormControl id='link'>
                <FormLabel>Instagram Product Link</FormLabel>
                <Input
                  value={link}
                  placeholder='Product Link'
                  onChange={e => this.setState({ link: e.target.value })}
                  _focus={{
                    border: '1px solid #999',
                    boxShadow: 'none'
                  }}
                />
              </FormControl>
            )}
          </Stack>
          {!isLinkFetched ? (
            <Button
              style={{ backgroundColor: '#28A445', width: '100%' }}
              onClick={this.handleFetchPost}
            >
              <Text style={{ color: '#FFFFFF' }}>Fetch Product</Text>
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: '#28A445', width: '100%' }}
              onClick={this.handleGeneratePaymentLink}
            >
              <Text style={{ color: '#FFFFFF' }}>
                {'Generate Payment Link'}
              </Text>
            </Button>
          )}
        </Stack>
      </Stack>
    )
  }
}

const styles = {
  formRow: {
    marginTop: '1rem'
  }
}
