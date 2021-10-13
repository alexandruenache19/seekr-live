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
  Text
} from '@chakra-ui/react'

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'

import { addOrder } from '../../../fetchData/getData'
import { addComment } from '../../../actions/event'

class LocationSearchInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = { address: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleChange (address) {
    const { setAddress } = this.props
    this.setState({
      address
    }, () => {
      setAddress(address)
    })
  }

  handleSelect (address) {
    const { setAddress } = this.props
    geocodeByAddress(address)
      .then(results => {
        getLatLng(results[0])
        this.setState({
          address: results[0].formatted_address
        }, () => {
          setAddress(address)
        })
      })
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  render () {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{ position: 'relative' }}>
            <Input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input'
              })}
            />
            <div
              className='autocomplete-dropdown-container'
              style={suggestions && suggestions.length > 0 ? {
                border: '1px solid rgba(0,0,0,0.1)',
                backgroundColor: '#FFFFFF',
                borderRadius: 4,
                marginTop: 10,
                width: '100%'
              } : {}}
            >
              {loading && <div className='suggestion-item'>Loading...</div>}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#F5F5F5', borderRadius: 4, cursor: 'pointer' }
                  : { cursor: 'pointer' }

                return (
                  <div
                    style={index < suggestions.length - 1 ? { borderBottom: '1px solid rgba(0,0,0,0.1)' } : {}}
                    key={suggestion.placeId || suggestion.description}
                  >
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
  }
}

const OrderModalContent = ({ eventInfo, productInfo, onCloseModal, totalPrice, orderQuantity, ...props }) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [address, setAddress] = useState(null)
  const [addressDetails, setAddressDetails] = useState(null)

  const handleDone = async () => {
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

  return (
    <Stack>
      <Stack style={{ overflow: 'scroll', maxHeight: '60vh', paddingBottom: '1rem' }}>
        <FormControl id='name' isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            value={name}
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl style={styles.formRow} id='phone' isRequired>
          <FormLabel>Phone Number (Please include country code)</FormLabel>
          <Input
            placeholder='Phone Number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <FormHelperText>The seller may contact you about your order</FormHelperText>
        </FormControl>
        <FormControl style={styles.formRow} id='address' isRequired>
          <FormLabel>Delivery Address</FormLabel>
          <LocationSearchInput
            address={address}
            setAddress={setAddress}
          />
        </FormControl>
        <FormControl style={styles.formRow} id='address-details'>
          <FormLabel>Other Address Details</FormLabel>
          <Input
            placeholder='House Number, Flat, County, etc.'
            value={addressDetails}
            onChange={(e) => setAddressDetails(e.target.value)}
          />
          <FormHelperText>Any details you want to add about your delivery</FormHelperText>
        </FormControl>
      </Stack>
      <Button style={{ backgroundColor: '#28A445' }} onClick={handleDone}>
        <Text style={{ color: '#FFFFFF' }}>
          {'Place Order'}
        </Text>
      </Button>
    </Stack>
  )
}

const styles = {
  formRow: {
    marginTop: '1rem'
  }
}

export default OrderModalContent
