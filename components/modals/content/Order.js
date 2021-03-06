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
  Flex
} from '@chakra-ui/react'

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'

import { addOrder } from '../../../fetchData/getData'
import { addComment } from '../../../actions/event'

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: props.address || '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleChange(address) {
    const { setAddress } = this.props
    this.setState(
      {
        address
      },
      () => {
        setAddress(address)
      }
    )
  }

  handleSelect(address) {
    const { setAddress } = this.props
    geocodeByAddress(address)
      .then(results => {
        getLatLng(results[0])
        this.setState(
          {
            address: results[0].formatted_address
          },
          () => {
            setAddress(address)
          }
        )
      })
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  render() {
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
              style={
                suggestions && suggestions.length > 0
                  ? {
                    border: '1px solid rgba(0,0,0,0.1)',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 4,
                    marginTop: 10,
                    width: '100%'
                  }
                  : {}
              }
            >
              {loading && <div className='suggestion-item'>Loading...</div>}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {
                    backgroundColor: '#F5F5F5',
                    borderRadius: 4,
                    cursor: 'pointer'
                  }
                  : { cursor: 'pointer' }

                return (
                  <div
                    style={
                      index < suggestions.length - 1
                        ? { borderBottom: '1px solid rgba(0,0,0,0.1)' }
                        : {}
                    }
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

const OrderModalContent = ({
  eventInfo,
  productInfo,
  onCloseModal,
  totalPrice,
  orderQuantity,
  setDetailsInHomeState,
  handlePlaceOrder,
  ...props
}) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(props.name || null)
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber || null)

  const [country, setCountry] = useState(props.country || 'Romania')
  const [addressLine1, setAddressLine1] = useState(props.addressLine1 || null)
  const [addressLine2, setAddressLine2] = useState(props.addressLine2 || null)
  const [city, setCity] = useState(props.city || null)
  const [postalCode, setPostalCode] = useState(props.postalCode || null)

  const handleDone = async () => {
    /**
     * add order in events/eventId/orders/orderId
     * decrease stock in events/eventId/products/productId
     */

    if (
      name === null ||
      phoneNumber === null ||
      addressLine1 === null ||
      name === '' ||
      phoneNumber === '' ||
      addressLine1 === ''
    ) {
      alert('Please fill in all required fields')
    } else {
      await addOrder(eventInfo.id, {
        id: phoneNumber,
        name: name,
        phoneNumber: phoneNumber,
        status: 'pending',
        address: `${addressLine1} ${addressLine2} ${city} ${country} ${postalCode}`,
        shipping: {
          city: city,
          country: country,
          line1: addressLine1,
          line2: addressLine2,
          postalCode: postalCode
        },
        price: totalPrice,
        priceToPay: totalPrice,
        quantity: orderQuantity,
        productId: productInfo.id,
        currency: productInfo.currency,
        imageURL: productInfo.imageURL || productInfo.imageUrl
      })

      setDetailsInHomeState({
        city: city,
        country: country,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        postalCode: postalCode,
        // address: address,
        // addressDetails: addressDetails,
        name: name,
        phoneNumber: phoneNumber
      })

      addComment(
        {
          text:
            orderQuantity === 1
              ? 'Tocmai am comandat un produs!'
              : `Tocmai am comandat ${orderQuantity} din acestea`,
          username: name
        },
        eventInfo.id
      )

      toast({
        title: 'Comanda plasata cu succes!',
        status: 'success',
        duration: 3000,
        isClosable: false
      })
      onCloseModal()
    }
  }

  return (
    <Stack>
      <Stack
        align='center'
        style={{ overflow: 'scroll', maxHeight: '60vh', paddingBottom: '0.6rem' }}
      >
        <Stack style={{ marginBottom: '0.6rem' }}>
          <img
            src={productInfo.imageURL || productInfo.imageUrl}
            style={{
              // boxShadow: '0px 0px 36px -9px rgba(0,0,0,0.49)',
              backgroundColor: '#999',
              maxWidth: '95%',
              height: 'auto',
              width: 'auto',
              maxHeight: 250,
              borderRadius: 15,
              objectFit: 'cover'
            }}
          />
          {productInfo.description ? (
            <Text>{productInfo.description}</Text>
          ) : null}
        </Stack>
        <FormControl id='name' isRequired>
          <Input
            value={name}
            placeholder='Nume Complet'
            onChange={e => setName(e.target.value)}
          />
        </FormControl>
        {/* <FormControl style={styles.formRow} id='country'>
          <Input
            placeholder='Tara'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

        </FormControl>
        */}

        <FormControl style={styles.formRow} id='phone' isRequired>
          <Input
            placeholder='Numar Telefon (eg. 074..)'
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
          {/*  <FormHelperText>
              The seller may contact you about your order
            </FormHelperText> */}
        </FormControl>

        <FormControl style={styles.formRow} id='address-line-1'>
          <Input
            placeholder='Adresa Livrare'
            value={addressLine1}
            onChange={e => setAddressLine1(e.target.value)}
          />
        </FormControl>
        {/*  <FormControl style={styles.formRow} id="address-line-2">
            <Input
              placeholder="Adresa (continuare)"
              value={addressLine2}
              onChange={e => setAddressLine2(e.target.value)}
            />
          </FormControl>
          <Flex>
            <FormControl style={styles.formRow} id="city">
              <Input
                placeholder="Oras"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </FormControl>
            <FormControl style={styles.formRow} id="postal-code">
              <Input
                placeholder="Cod Postal"
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
              />
            </FormControl>
          </Flex>

          */}
      </Stack>
      <Button
        style={{
          backgroundColor: '#121212',
          background: 'rgb(63,60,145)',
          background:
            'linear-gradient(48deg, rgba(63,60,145,1) 0%, rgba(242,67,106,1) 100%)'
        }}
        onClick={() => {
          if (handlePlaceOrder) {
            if (name && phoneNumber && addressLine1 && name !== '' && phoneNumber !== '' && addressLine1 !== '') {
              if (props.isAuction) {
                handlePlaceOrder({
                  name: name,
                  phoneNumber: phoneNumber,
                  addressLine1: addressLine1
                })
              } else {
                handlePlaceOrder({
                  name: name,
                  phoneNumber: phoneNumber,
                  address: {
                    city: city,
                    country: country,
                    line1: addressLine1,
                    line2: addressLine2,
                    postalCode: postalCode
                  }
                })
              }
            } else {
              alert('Completeaza toate datele pentru a putea licita')
            }
          } else {
            handleDone()
          }
        }}
      >
        <Text style={{ color: '#FFFFFF' }}>{props.isAuction ? 'Liciteaza' : 'Comanda'}</Text>
      </Button>
    </Stack>
  )
}

const styles = {
  formRow: {}
}

export default OrderModalContent
