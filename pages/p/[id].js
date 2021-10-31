import React, { PureComponent, useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Flex,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spinner
} from "@chakra-ui/react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import firebase from "../../firebase/clientApp";
import router from "next/router";
import axios from "axios";
import { OrderModalContent } from "../../components/modals/content";
import moment from 'moment'
const format = val => "RON " + val;
const parse = val => val.replace(/RON /, "");

const CashOrderModal = ({ isOnMobile, ...props }) => {
  return (
    <Modal
      // initialFocusRef={initialRef}
      // finalFocusRef={finalRef}
      motionPreset='scale'
      isCentered
      isOpen={props.isOpen}
      onClose={props.onClose}
      size='2xl'
    >
      <ModalOverlay />
      <ModalContent
        p={isOnMobile ? 0 : 10}
        py={isOnMobile ? 5 : 10}
        borderRadius={isOnMobile ? 10 : 30}
        {...styles}
      >
        {/* <ModalHeader>
          <Text>{info[type].title}</Text>
          <Text fontSize={14} fontWeight='normal'>
            {info[type].subtitle}
          </Text>
        </ModalHeader> */}
        <ModalCloseButton />
        <ModalBody>
          <OrderModalContent {...props} />
          {/* {renderContent(type, {
            ...props,
            isOnMobile,
            onClose,
            callback
          })} */}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const CountDownTimer = ({ endTime }) => {
  const calculateTimeLeft = () => {
    let eventTime = endTime / 1000
    let currentTime = +Date.now() / 1000
    let leftTime = eventTime - currentTime;
    let duration = moment.duration(leftTime, 'seconds');
    let interval = 1000;
    if (duration.asSeconds() <= 0) {
      clearInterval(interval);
      //window.location.reload(true); //#skip the cache and reload the page from the server
    }
    duration = moment.duration(duration.asSeconds() - 1, 'seconds');
    return (duration.days() + ' Days ' + duration.hours() + ' Hours ' + duration.minutes() + ' Minutes ' + duration.seconds() + ' Seconds');
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  return (
    <Text fontWeight='bold' fontSize={20} textAlign='center'>{timeLeft}</Text>
  )
}

export default class PaymentScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isAvailable: false,
      paymentUrl: null,
      paidProduct: true,
      product: null,
      outOfStock: false,
      isModalOpen: false,
      sellerUsername: null,
      sellerPhotoUrl: null,
      newPrice: null
    }

    this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
  }

  async componentDidMount() {
    const { id } = this.props
    const productSn = await firebase
      .database()
      .ref(`products/${id}`)
      .once('value');

    const product = productSn.val()

    /** get user information */
    const sellerUsernameSn = await firebase
      .database()
      .ref(`users/${productSn.val().uid}/info/username`)
      .once('value')

    const sellerPhotoSn = await firebase
      .database()
      .ref(`users/${productSn.val().uid}/info/imageURL`)
      .once('value')

    if (productSn.val()) {
      if (router.query && router.query.success) {
        this.setState(
          {
            product: productSn.val(),
            paidProduct: true,
            loading: false,
            sellerUsername: sellerUsernameSn.val(),
            sellerPhotoUrl: sellerPhotoSn.val()
          },
          async () => {
            const req = await axios.post("/api/retrive-session", {
              sessionId: router.query.session_id
            })

            console.log('req', req.data)
            if (req && req.data) {
              const phoneNumber = req.data.customer_details.phone
              const address = req.data.shipping.address
              await firebase
                .database()
                .ref(`users/${productSn.val().uid}/shop/orders/${phoneNumber}/info`)
                .update({
                  id: phoneNumber,
                  name: req.data.shipping.name,
                  phoneNumber: phoneNumber,
                  status: 'pending',
                  address: `${address.line1} ${address.line2} ${address.city} ${address.country} ${address.state} ${address.postal_code}`,
                  shipping: address,
                  paymentType: 'card'
                })

              const productRef = firebase
                .database()
                .ref(`users/${productSn.val().uid}/shop/orders/${phoneNumber}/products`).push()

              await firebase
                .database()
                .ref(`users/${productSn.val().uid}/shop/orders/${phoneNumber}/products/${productRef.key}`)
                .update({
                  id: productRef.key,
                  productId: id,
                  isPacked: false,
                  imageURL: productSn.val().imageUrl,
                  currency: req.data.currency,
                  price: req.data.amount_total / 100,
                  quantity: 1,
                  paymentType: 'card'
                })
            }

            await firebase
              .database()
              .ref(`products/${id}/quantity`)
              .set(firebase.database.ServerValue.increment(-1));

            await firebase
              .database()
              .ref(`users/${productSn.val().uid}/shop/products/${id}/quantity`)
              .set(firebase.database.ServerValue.increment(-1))
          }
        );
      } else if (router.query && router.query.canceled) {
        this.setState({
          product: productSn.val(),
          paidProduct: false,
          loading: false,
          sellerUsername: sellerUsernameSn.val(),
          sellerPhotoUrl: sellerPhotoSn.val()
        });
      } else {
        this.setState({
          product: productSn.val(),
          paidProduct: false,
          sellerUsername: sellerUsernameSn.val(),
          sellerPhotoUrl: sellerPhotoSn.val()
        },
          () => {
            if (productSn.val().quantity >= 1) {
              // window.open(productSn.val().paymentUrl)
              // let newTab = window.open('_self');
              // window.location.href = productSn.val().paymentUrl;
              this.setState({
                loading: false
              })
            } else {
              this.setState({
                loading: false,
                outOfStock: true
              })
            }
          }
        );
      }
    }
  }

  async handlePlaceOrder(details) {
    const { product, newPrice } = this.state
    const phoneNumber = details.phoneNumber
    const address = details.address
    const { id } = product

    if (product.isAuction) {
      await firebase
        .database()
        .ref(`products/${product.id}`)
        .update({
          price: parseFloat(newPrice)
        })

      await firebase
        .database()
        .ref(`products/${product.id}/bids`)
        .push({
          ...details,
          price: parseFloat(newPrice)
        })

      this.setState({
        isModalOpen: false,
        paidProduct: true
      })
    } else {
      await firebase
        .database()
        .ref(`users/${product.uid}/shop/orders/${phoneNumber}/info`)
        .update({
          id: phoneNumber,
          name: details.name,
          phoneNumber: phoneNumber,
          status: 'pending',
          address: `${address.line1} ${address.line2} ${address.city} ${address.country} ${address.state} ${address.postal_code}`,
          shipping: address,
          paymentType: 'cash-on-delivery'
        })

      const productRef = firebase
        .database()
        .ref(`users/${product.uid}/shop/orders/${phoneNumber}/products`).push()

      await firebase
        .database()
        .ref(`users/${product.uid}/shop/orders/${phoneNumber}/products/${productRef.key}`)
        .update({
          id: productRef.key,
          productId: id,
          isPacked: false,
          imageURL: product.imageUrl,
          currency: product.currency || 'ron',
          price: product.price,
          quantity: 1,
          paymentType: 'cash-on-delivery'
        })

      await firebase
        .database()
        .ref(`products/${id}/quantity`)
        .set(firebase.database.ServerValue.increment(-1));

      await firebase
        .database()
        .ref(`users/${product.uid}/shop/products/${id}/quantity`)
        .set(firebase.database.ServerValue.increment(-1))

      this.setState({
        paidProduct: true,
        isModalOpen: false
      })
    }
  }

  render() {
    const {
      loading,
      isAvailable,
      paymentUrl,
      product,
      paidProduct,
      outOfStock,
      isModalOpen,
      sellerUsername,
      sellerPhotoUrl,
      newPrice
    } = this.state

    const { isOnMobile } = this.props

    return (
      <Stack align="center" w="100vw" h="100vh" justify="center" className='perfect-height-wrapper'>
        <CashOrderModal
          isOpen={isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
          isOnMobile={isOnMobile}
          handlePlaceOrder={this.handlePlaceOrder}
        />
        {loading ? (
          <Stack
            w="100%"
            h="100%"
            position="absolute"
            top={0}
            zIndex={5}
            justifyContent="center"
            alignItems="center"
            bg="rgba(255,255,255,0.3)"
          >
            <Spinner color="#121212" size="md" />
          </Stack>
        ) : null}
        {product ? (
          paidProduct ? (
            <Stack align="center" maxW="500px" width='100%' px="1rem">
              <AiOutlineCheckCircle
                style={{ fontSize: 40, color: "#28A445" }}
              />
              <Text textAlign="center">{product.isAuction ? 'Bid confirmed' : 'Order confirmed'}</Text>
              <img
                src={product.imageUrl}
                style={{
                  marginTop: "1.5rem",
                  // boxShadow: '0px 0px 36px -9px rgba(0,0,0,0.49)',
                  backgroundColor: "#999",
                  maxWidth: "95%",
                  height: "auto",
                  maxHeight: 250,
                  borderRadius: 15,
                  objectFit: "cover",
                  marginBottom: "1.5rem"
                }}
              />
              <Text textAlign="center">{product.isAuction ? 'Thank you for your bid!' : 'Thank you for your order!'}</Text>
              <Text textAlign="center">
                {product.isAuction ? (
                  `We'll contact you when the auction is over to let you know if you won!`
                ) : (
                  `We'll contact you to confirm shipping details in the next 24h.`
                )}
              </Text>
            </Stack>
          ) : (
            <Stack align="center" maxW="500px" w='100%' px="1.5rem">
              {sellerPhotoUrl ? (
                <img src={sellerPhotoUrl} style={{ height: 42, width: 42, marginBlock: 5, borderRadius: '50%', objectFit: 'cover' }} />
              ) : null}
              <Text textAlign="center" fontWeight='bold' fontSize={18}>{product.name}</Text>
              {sellerUsername ? (
                <Text textAlign="center">{`sold by ${sellerUsername}`}</Text>
              ) : null}
              <img
                src={product.imageUrl}
                style={{
                  marginTop: "1.5rem",
                  // boxShadow: '0px 0px 36px -9px rgba(0,0,0,0.49)',
                  backgroundColor: "#999",
                  maxWidth: "95%",
                  height: "auto",
                  maxHeight: 250,
                  borderRadius: 15,
                  objectFit: "cover",
                  marginBottom: "1.1rem"
                }}
              />
              {product.isAuction ? (
                <Stack style={{ width: '100%' }}>
                  {product.bids ? (
                    <div style={{ width: '100%', marginBottom: '1rem' }}>
                      <Text textAlign="center">{`Latest bids`}</Text>
                      {Object.values(product.bids).slice(-3).map(bid => {
                        return (
                          <Flex key={bid.name} style={{ width: '100%', marginTop: 5 }} justify='space-between'>
                            <Text>{bid.name}</Text>
                            <Text fontWeight='bold'>{`${bid.price} RON`}</Text>
                          </Flex>
                        )
                      })}
                    </div>
                  ) : (
                    null
                  )}
                  <Text textAlign="center" color='#999'>{`Auction ending in`}</Text>
                  <CountDownTimer endTime={product.auctionEndDate} />
                </Stack>
              ) : (
                <Stack>
                  <Text
                    textAlign="center"
                    fontSize={"18px"}
                  >
                    {`RON ${product.price}`}
                  </Text>
                  {!outOfStock ? (
                    <Text textAlign="center">{`Only ${product.quantity} left at this price!`}</Text>
                  ) : null}
                </Stack>
              )}
              {outOfStock ? (
                <Button
                  style={{
                    backgroundColor: "#28A445",
                    width: "100%",
                    marginTop: "1rem"
                  }}
                  disabled
                  onClick={() => null}
                >
                  <Text style={{ color: "#FFFFFF" }}>{"Out of stock"}</Text>
                </Button>
              ) : product.isAuction ? (
                <div style={{ width: '100%', marginTop: '1.5rem' }}>
                  <NumberInput
                    placeholder='Your Bid'
                    min={product.price + 10}
                    value={newPrice || product.price + 10}
                    onChange={number => {
                      console.log('v', number)
                      this.setState({ newPrice: number })
                    }}
                    _focus={{
                      border: '1px solid #999',
                      boxShadow: 'none'
                    }}
                  >
                    <NumberInputField />
                  </NumberInput>
                  <Button
                    style={{
                      backgroundColor: "#28A445",
                      width: "100%",
                      marginTop: "0.5rem"
                    }}
                    onClick={
                      () => this.setState({
                        newPrice: this.state.newPrice || product.price + 10,
                        isModalOpen: true
                      })
                    }
                  >
                    <Text style={{ color: "#FFFFFF" }}>{`Bid ${newPrice || product.price + 10} RON`}</Text>
                  </Button>
                </div>
              ) : (
                <div style={{ width: '100%' }}>
                  <Button
                    style={{
                      backgroundColor: "#28A445",
                      width: "100%",
                      marginTop: "0.5rem"
                    }}
                    onClick={() => (window.location.href = product.paymentUrl)}
                  >
                    <Text style={{ color: "#FFFFFF" }}>{"Pay by card"}</Text>
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#28A445",
                      width: "100%",
                      marginTop: "0.5rem"
                    }}
                    onClick={() => this.setState({ isModalOpen: true })}
                  >
                    <Text style={{ color: "#FFFFFF" }}>{"Cash on delivery (Ramburs)"}</Text>
                  </Button>
                </div>
              )}
            </Stack>
          )
        ) : null}
      </Stack>
    );
  }
}

const styles = {
  formRow: {
    marginTop: "1rem"
  }
};

export const getServerSideProps = async context => {
  const { id } = context.params;

  let userAgent;
  if (context.req) {
    // if you are on the server and you get a 'req' property from your context
    userAgent = context.req.headers["user-agent"]; // get the user-agent from the headers
  } else {
    userAgent = navigator.userAgent; // if you are on the client you can access the navigator from the window object
  }

  const isOnMobile = Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return {
    props: {
      id,
      isOnMobile
      // query: router.query
    }
  };
};
