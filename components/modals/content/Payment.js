import React, { useState, useEffect } from 'react'
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
  Spinner
} from '@chakra-ui/react'
import { loadStripe } from '@stripe/stripe-js'
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements
} from '@stripe/react-stripe-js'

import { addOrder } from '../../../fetchData/getData'
import { addComment } from '../../../actions/event'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

const StripeCardCheckout = ({ handleSubmitOrder, returnUrl }) => {
  /** stripe logic */
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!')
          break
        case 'processing':
          setMessage('Your payment is processing.')
          break
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.')
          break
        default:
          setMessage('Something went wrong.')
          break
      }
    })
  }, [stripe])

  /** stripe logic end */

  const handleSubmitPayment = async () => {
    const submittedOrder = await handleSubmitOrder()
    if (submittedOrder) {
      if (!stripe || !elements) {
        console.log('stripe is not yet loaded?')
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return
      }

      setIsLoading(true)

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: returnUrl
        }
      })

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message)
      } else {
        console.log('error', error)
        setMessage('An unexpected error occured.')
      }

      setIsLoading(false)
    } else {
      alert('Something went wrong with your order. Please try again.')
    }
  }

  return (
    <Stack classname='stripe-payment-form'>
      <PaymentElement id='payment-element' />
      <button
        disabled={isLoading || !stripe || !elements}
        id='submit'
        onClick={handleSubmitPayment}
      >
        <span id='button-text'>
          {isLoading ? (
            <div className='spinner' id='spinner' />
          ) : (
            <div
              // borderRadius='xl'
              style={{
                borderRadius: 5,
                justifyContent: 'center',
                flex: 1,
                backgroundColor: '#121212',
                width: '100%',
                padding: 8
              }}
            // onClick={handleSubmit}
            >
              <Text pr='10px' color='#FFFFFF'>
                Buy Now
              </Text>
            </div>
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id='payment-message'>{message}</div>}
    </Stack>
  )
}

const CheckoutForm = ({
  eventInfo,
  productInfo,
  onCloseModal,
  totalPrice,
  orderQuantity,
  setDetailsInHomeState,
  returnUrl,
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
  const [completeShippingInfo, setCompleteShipping] = useState(false)

  const handleSubmitOrder = async e => {
    e && e.preventDefault()
    /**
                 * add order in events/eventId/orders/orderId
                 * decrease stock in events/eventId/products/productId
                 */

    if (
      name === null ||
      phoneNumber === null ||
      country === null ||
      city === null ||
      postalCode === null ||
      addressLine1 === null ||
      name === '' ||
      phoneNumber === '' ||
      country === '' ||
      city === '' ||
      postalCode === '' ||
      addressLine1 === ''
    ) {
      alert('Please fill in all required fields')
      return false
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
        imageURL: productInfo.imageURL
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
              ? 'Tocmai am comandat asta!'
              : `Tocmai am comandat ${orderQuantity} din acestea`,
          username: name
        },
        eventInfo.id
      )

      return true

      //   toast({
      //     title: 'Order Places Successfully!',
      //     status: 'success',
      //     duration: 3000,
      //     isClosable: false
      //   })
      //   onCloseModal()
    }
  }

  return (
    <form>
      {completeShippingInfo ? (
        <Stack
          style={{
            overflow: 'scroll',
            maxHeight: '60vh',
            paddingBottom: '1rem'
          }}
        >
          {props.clientSecret ? (
            <Elements options={props.options} stripe={stripePromise}>
              <StripeCardCheckout
                returnUrl={returnUrl}
                handleSubmitOrder={handleSubmitOrder}
              />
            </Elements>
          ) : (
            <Stack
              w='100%'
              h='100%'
              justifyContent='center'
              alignItems='center'
              bg='rgba(255,255,255,0.3)'
            >
              <Spinner color='#121212' size='md' />
            </Stack>
          )}
        </Stack>
      ) : (
        <Stack
          style={{
            overflow: 'scroll',
            maxHeight: '60vh',
            paddingBottom: '1rem'
          }}
        >
          <FormControl id='name' isRequired style={{ marginBottom: 10 }}>
            <Text fontSize={15} color='#30313D' style={{ marginBottom: 4 }}>
              Full Name
            </Text>
            <Input
              value={name}
              placeholder='Name'
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
          <Stack style={{ marginBottom: 10 }}>
            <FormControl style={styles.formRow} id='country'>
              <Text fontSize={15} color='#30313D' style={{ marginBottom: 4 }}>
                Shipping Details
              </Text>
              <Input
                placeholder='Country'
                value={country}
                onChange={e => setCountry(e.target.value)}
              />
            </FormControl>
            <FormControl style={styles.formRow} id='address-line-1'>
              <Input
                placeholder='Address line 1'
                value={addressLine1}
                onChange={e => setAddressLine1(e.target.value)}
              />
            </FormControl>
            <FormControl style={styles.formRow} id='address-line-2'>
              <Input
                placeholder='Address line 2'
                value={addressLine2}
                onChange={e => setAddressLine2(e.target.value)}
              />
            </FormControl>
            <Flex>
              <FormControl style={styles.formRow} id='city'>
                <Input
                  placeholder='City'
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </FormControl>
              <FormControl style={styles.formRow} id='postal-code'>
                <Input
                  placeholder='Postal Code'
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                />
              </FormControl>
            </Flex>
          </Stack>
          <FormControl id='phone' isRequired style={{ marginBottom: 10 }}>
            <Text fontSize={15} color='#30313D' style={{ marginBottom: 4 }}>
              Phone Number
            </Text>
            <Input
              placeholder='Phone Number'
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
            <FormHelperText>
              The seller may contact you about your order
            </FormHelperText>
          </FormControl>
          <Button
            style={{ backgroundColor: '#121212', flex: 1, padding: 10 }}
            onClick={async () => {
              if (name !== '' && name !== null && addressLine1 !== '' && addressLine1 !== null && city !== '' && city !== null) {
                setCompleteShipping(true)
                await props.createPaymentIntent()
              } else {
                alert('Please complete all fields')
              }
            }}
          >
            <Text style={{ color: '#FFFFFF' }}>Next</Text>
          </Button>
        </Stack>
      )}
    </form>
  )
}

const PaymentModalContent = ({ sellerUsername, ...props }) => {
  const [clientSecret, setClientSecret] = useState('')

  //   useEffect(() => {
  //     // Create PaymentIntent as soon as the page loads
  //     fetch('/api/create-payment-intent', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] })
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setClientSecret(data.clientSecret))
  //   }, [])

  const createPaymentIntent = () => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item: {
          ammount: props.totalPrice,
          currency: props.productInfo.currency
        },
        sellerStripeId: props.sellerStripeId
      })
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
  }

  const appearance = {
    theme: 'stripe'
  }

  const options = {
    clientSecret,
    appearance
  }

  return (
    <div className='CustomCheckout'>
      <CheckoutForm
        returnUrl={`https://seekrlive.com/${sellerUsername}`}
        clientSecret={clientSecret}
        options={options}
        createPaymentIntent={createPaymentIntent}
        {...props}
      />
    </div>
  )
}

const styles = {
  formRow: {}
}

export default PaymentModalContent
