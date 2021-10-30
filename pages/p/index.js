import React, { PureComponent, useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  useToast,
  Stack,
  Button,
  Text
} from '@chakra-ui/react'
import axios from 'axios'

export default class GeneratePaymentScreen extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      link: '',
      price: 0,
      quantity: 1,
      isLinkFetched: false,
      imageURL: ''
    }

    this.handleFetchPost = this.handleFetchPost.bind(this)
  }

  componentDidMount () {

  }

  async handleFetchPost () {
    const { link } = this.state
    const postReq = await axios.post('/api/fetch-post', {
      uid: 'NJv0oXqKUwcmWTW4VMjsr5HWJ4W2',
      url: link,
      saveInFirebase: false
    })

    this.setState({
      imageURL: postReq.data.data.imageUrl,
      title: postReq.data.data.title,
      isLinkFetched: true
    })

    console.log('post', postReq.data)
  }

  async handleDone () {
    return false
    /**
                                                                                                                                     * add order in events/eventId/orders/orderId
                                                                                                                                     * decrease stock in events/eventId/products/productId
                                                                                                                                     */

    if (
      name === null || phoneNumber === null || address === null ||
            name === '' || phoneNumber === '' || address === ''
    ) {
      alert('Please fill in all required fields')
    } else {
      await addOrder(eventInfo.id, {
        address: address,
        addressDetails: addressDetails,
        name: name,
        phoneNumber: phoneNumber,
        priceToPay: totalPrice,
        quantity: orderQuantity,
        productId: productInfo.id,
        currency: productInfo.currency,
        imageURL: productInfo.imageURL
      })

      setDetailsInHomeState({
        address: address,
        addressDetails: addressDetails,
        name: name,
        phoneNumber: phoneNumber
      })
    }

    addComment(
      {
        text: orderQuantity === 1 ? 'I just ordered this!' : `I just ordered ${orderQuantity} of these`,
        username: name
      },
      eventInfo.id
    )

    toast({
      title: 'Order Places Successfully!',
      status: 'success',
      duration: 3000,
      isClosable: false
    })
    onCloseModal()
  }

  render () {
    const { link, price, quantity, isLinkFetched, imageURL } = this.state
    return (
      <Stack align='center' w='100vw'>
        <Stack style={{ height: '100vh', overflow: 'scroll' }} w='100%' maxW='600px' justify='center' align='center'>
          <Stack style={{ overflow: 'scroll', paddingBottom: '1rem', width: '100%' }}>
            {isLinkFetched ? (
              <Stack align='center'>
                <img
                  src={imageURL}
                  style={{
                    maxWidth: '70%',
                    height: 'auto',
                    maxHeight: 200,
                    borderRadius: 15,
                    objectFit: 'cover',
                    marginBottom: 10
                  }}
                />
                <FormControl style={styles.formRow} id='price'>
                  <FormLabel>Product Price</FormLabel>
                  <Input
                    placeholder='Price'
                    value={price}
                    onChange={(e) => this.setState({ price: e.target.value })}
                  />
                </FormControl>
                <FormControl style={styles.formRow} id='quantity'>
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    placeholder='Quantity'
                    value={quantity}
                    onChange={(e) => this.setState({ quantity: e.target.value })}
                  />
                </FormControl>
              </Stack>
            ) : (
              <FormControl id='link' isRequired>
                <FormLabel>Instagram Product Link</FormLabel>
                <Input
                  value={link}
                  placeholder='Product Link'
                  onChange={(e) => this.setState({ link: e.target.value })}
                />
              </FormControl>
            )}
          </Stack>
          {!isLinkFetched ? (
            <Button style={{ backgroundColor: '#28A445', width: '100%' }} onClick={this.handleFetchPost}>
              <Text style={{ color: '#FFFFFF' }}>
                {'Fetch Product'}
              </Text>
            </Button>
          ) : (
            <Button style={{ backgroundColor: '#28A445', width: '100%' }} onClick={this.handleGeneratePaymentLink}>
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
