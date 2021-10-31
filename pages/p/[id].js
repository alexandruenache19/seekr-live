import React, { PureComponent, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
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
      isModalOpen: false
    }

    this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
  }

  async componentDidMount() {
    const { id } = this.props;
    const productSn = await firebase
      .database()
      .ref(`products/${id}`)
      .once('value');

    if (productSn.val()) {
      if (router.query && router.query.success) {
        this.setState(
          {
            product: productSn.val(),
            paidProduct: true,
            loading: false
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
          loading: false
        });
      } else {
        this.setState({
          product: productSn.val(),
          paidProduct: false,
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
    const { product } = this.state
    const phoneNumber = details.phoneNumber
    const address = details.address
    const { id } = product

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

  render() {
    const {
      loading,
      isAvailable,
      paymentUrl,
      product,
      paidProduct,
      outOfStock,
      isModalOpen
    } = this.state;
    const { isOnMobile } = this.props
    return (
      <Stack align="center" w="100vw" h="100vh" justify="center">
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
            <Stack align="center" maxW="500px" px="1rem">
              <AiOutlineCheckCircle
                style={{ fontSize: 40, color: "#28A445" }}
              />
              <Text textAlign="center">Order confirmed</Text>
              <img
                src={product.imageUrl}
                style={{
                  marginTop: "1.5rem",
                  // boxShadow: '0px 0px 36px -9px rgba(0,0,0,0.49)',
                  backgroundColor: "#999",
                  maxWidth: "90%",
                  height: "auto",
                  maxHeight: 250,
                  borderRadius: 15,
                  objectFit: "cover",
                  marginBottom: "1.5rem"
                }}
              />
              <Text textAlign="center">Thank you for your order!</Text>
              <Text textAlign="center">
                We'll contact you to confirm shipping details in the next 24h.
              </Text>
            </Stack>
          ) : (
            <Stack align="center" maxW="500px" px="1rem">
              <Text textAlign="center">{product.name}</Text>
              <img
                src={product.imageUrl}
                style={{
                  marginTop: "1.5rem",
                  // boxShadow: '0px 0px 36px -9px rgba(0,0,0,0.49)',
                  backgroundColor: "#999",
                  maxWidth: "90%",
                  height: "auto",
                  maxHeight: 250,
                  borderRadius: 15,
                  objectFit: "cover",
                  marginBottom: "1.5rem"
                }}
              />
              <Text
                textAlign="center"
                fontSize={"18px"}
              >
                {`RON ${product.price}`}
              </Text>
              {!outOfStock ? (
                <Text textAlign="center">{`Only ${product.quantity} left at this price!`}</Text>
              ) : null}
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
              ) : (
                <div>
                  <Button
                    style={{
                      backgroundColor: "#28A445",
                      width: "100%",
                      marginTop: "1rem"
                    }}
                    onClick={() => (window.location.href = product.paymentUrl)}
                  >
                    <Text style={{ color: "#FFFFFF" }}>{"Pay by card"}</Text>
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#28A445",
                      width: "100%",
                      marginTop: "1rem"
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
