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
import { Pressable } from "react-native";
import { AiOutlineCheckCircle } from "react-icons/ai";
import firebase from "../../firebase/clientApp";
import router from "next/router";
import axios from "axios";
import { OrderModalContent } from "../../components/modals/content";
import ShopItems from "../../components/molecules/profile/ShopItems";

import moment from "moment";
const format = val => "RON " + val;
const parse = val => val.replace(/RON /, "");
const emojis = ['🙌', '🔥', '💃🏼', '🍀', '🚀', '🕺🏽', '👏', '🎉', '⭐️']

const CashOrderModal = ({ isOnMobile, ...props }) => {
  return (
    <Modal
      motionPreset="scale"
      isCentered
      isOpen={props.isOpen}
      onClose={props.onClose}
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent
        p={isOnMobile ? 0 : 10}
        py={isOnMobile ? 5 : 10}
        borderRadius={isOnMobile ? 10 : 30}
        {...styles}
      >
        <ModalCloseButton />
        <ModalBody>
          <OrderModalContent {...props} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const CountDownTimer = ({ endTime }) => {
  const calculateTimeLeft = () => {
    let eventTime = endTime / 1000;
    let currentTime = +Date.now() / 1000;
    let leftTime = eventTime - currentTime;
    let duration = moment.duration(leftTime, "seconds");
    let interval = 1000;
    if (duration.asSeconds() <= 0) {
      clearInterval(interval);
      //window.location.reload(true); //#skip the cache and reload the page from the server
    }
    duration = moment.duration(duration.asSeconds() - 1, "seconds");
    return (
      <Flex align='center' w='100%' justify='space-between'>
        <Text fontSize={'15'}>
          {'Timp Ramas'}
        </Text>
        <Text fontSize={'15'} fontWeight='bold'>
          {/* {`${duration.days() > 0 ? duration.days() + " Days " : ''}`}
        {`${duration.hours() > 0 ? duration.hours() + " Hours " : ''}`} */}
          {`${duration.minutes() > 9 ? duration.minutes() : duration.minutes() > 0 ? '0' + duration.minutes() : '00'}:`}
          {`${duration.seconds() > 9 ? duration.seconds() : duration.seconds() > 0 ? '0' + duration.seconds() : '00'}`}
        </Text>
      </Flex>
    );
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  return (
    timeLeft
  );
};

export default class PaymentScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isAvailable: false,
      paidProduct: true,
      product: null,
      outOfStock: false,
      isModalOpen: false,
      sellerInfo: {},
      sellerProducts: {},
      newPrice: null
    };

    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props;

    firebase
      .database()
      .ref(`products/${id}`)
      .on("value", productSn => {
        const product = productSn.val();
        this.setState({ product: productSn.val() })
      })

    const productSn = await firebase
      .database()
      .ref(`products/${id}`)
      .once("value")

    const product = productSn.val();

    const sellerInfoSn = await firebase
      .database()
      .ref(`users/${productSn.val().uid}/info`)
      .once("value");
    const sellerProductsSn = await firebase
      .database()
      .ref(`users/${productSn.val().uid}/shop/products`)
      .once("value");

    if (productSn.val()) {
      if (router.query && router.query.success) {
        this.setState(
          {
            product: productSn.val(),
            paidProduct: true,
            loading: false,
            sellerInfo: sellerInfoSn.val(),
            sellerProducts: sellerProductsSn.val()
          },
          async () => {
            const req = await axios.post("/api/retrive-session", {
              sessionId: router.query.session_id
            });

            if (req && req.data) {
              const phoneNumber = req.data.customer_details.phone;
              const address = req.data.shipping.address;
              await firebase
                .database()
                .ref(
                  `users/${productSn.val().uid}/shop/orders/${phoneNumber}/info`
                )
                .update({
                  id: phoneNumber,
                  name: req.data.shipping.name,
                  phoneNumber: phoneNumber,
                  status: "pending",
                  address: `${address.line1} ${address.line2} ${address.city} ${address.country} ${address.state} ${address.postal_code}`,
                  shipping: address,
                  paymentType: "card"
                });

              const productRef = firebase
                .database()
                .ref(
                  `users/${productSn.val().uid
                  }/shop/orders/${phoneNumber}/products`
                )
                .push();

              await firebase
                .database()
                .ref(
                  `users/${productSn.val().uid
                  }/shop/orders/${phoneNumber}/products/${productRef.key}`
                )
                .update({
                  id: productRef.key,
                  productId: id,
                  isPacked: false,
                  imageURL: productSn.val().imageUrl,
                  currency: req.data.currency,
                  price: req.data.amount_total / 100,
                  quantity: 1,
                  paymentType: "card"
                });
            }

            await firebase
              .database()
              .ref(`products/${id}/quantity`)
              .set(firebase.database.ServerValue.increment(-1));

            await firebase
              .database()
              .ref(`users/${productSn.val().uid}/shop/products/${id}/quantity`)
              .set(firebase.database.ServerValue.increment(-1));
          }
        );
      } else if (router.query && router.query.canceled) {
        this.setState({
          product: productSn.val(),
          paidProduct: false,
          loading: false,
          sellerInfo: sellerInfoSn.val(),
          sellerProducts: sellerProductsSn.val()
        });
      } else {
        this.setState(
          {
            product: productSn.val(),
            paidProduct: false,
            loading: false,
            sellerInfo: sellerInfoSn.val(),
            sellerProducts: sellerProductsSn.val()
          },
          () => {
            if (productSn.val().quantity >= 1) {
              this.setState({
                loading: false
              });
            } else {
              this.setState({
                loading: false,
                outOfStock: true
              });
            }
          }
        );
      }
    }
  }

  async handlePlaceOrder(details) {
    const { product, newPrice } = this.state;
    const phoneNumber = details.phoneNumber;
    const address = details.address;
    const { id } = product;

    if (product.isAuction) {
      await firebase
        .database()
        .ref(`products/${product.id}`)
        .update({
          price: parseFloat(newPrice)
        });

      await firebase
        .database()
        .ref(`products/${product.id}/bids`)
        .push({
          ...details,
          price: parseFloat(newPrice)
        });

      this.setState({
        isModalOpen: false
      });
    } else {
      await firebase
        .database()
        .ref(`users/${product.uid}/shop/orders/${phoneNumber}/info`)
        .update({
          id: phoneNumber,
          name: details.name,
          phoneNumber: phoneNumber,
          status: "pending",
          address: `${address.line1} ${address.line2} ${address.city} ${address.country} ${address.state} ${address.postal_code}`,
          shipping: address,
          paymentType: "cash-on-delivery"
        });

      const productRef = firebase
        .database()
        .ref(`users/${product.uid}/shop/orders/${phoneNumber}/products`)
        .push();

      await firebase
        .database()
        .ref(`users/${product.uid}/shop/orders/${phoneNumber}/products/${productRef.key}`)
        .update({
          id: productRef.key,
          productId: id,
          isPacked: false,
          imageURL: product.imageUrl,
          currency: product.currency || "ron",
          price: product.price,
          quantity: 1,
          paymentType: "cash-on-delivery"
        })

      await firebase
        .database()
        .ref(`products/${id}/quantity`)
        .set(firebase.database.ServerValue.increment(-1));

      await firebase
        .database()
        .ref(`users/${product.uid}/shop/products/${id}/quantity`)
        .set(firebase.database.ServerValue.increment(-1));

      this.setState({
        paidProduct: true,
        isModalOpen: false
      });
    }
  }

  render() {
    const {
      loading,
      isAvailable,
      product,
      paidProduct,
      outOfStock,
      isModalOpen,
      sellerInfo,
      sellerProducts,
      newPrice
    } = this.state;

    const { isOnMobile } = this.props;
    if (loading) {
      return (
        <Stack
          w="100vw"
          h="100vh"
          justifyContent="center"
          alignItems="center"
          bg="rgba(255,255,255,0.3)"
        >
          <Spinner color="#121212" size="md" />
        </Stack>
      );
    }

    const auctionHasEnded = product.isAuction && product.auctionEndDate - new Date().getTime() < 0

    return (
      <Stack align="center" justify="center" py='2rem'>
        <CashOrderModal
          isOpen={isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
          isOnMobile={isOnMobile}
          productInfo={product}
          handlePlaceOrder={this.handlePlaceOrder}
        />

        {product ? (
          paidProduct ? (
            <Stack align="center" maxW="500px" width="100%" px="1rem">
              <AiOutlineCheckCircle style={{ fontSize: 40, color: "#28A445" }} />
              <Text textAlign="center">
                {product.isAuction ? "Bid confirmed" : "Order confirmed"}
              </Text>
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
              <Text textAlign="center">
                {product.isAuction
                  ? "Thank you for your bid!"
                  : "Thank you for your order!"}
              </Text>
              <Text textAlign="center">
                {product.isAuction
                  ? `We'll contact you when the auction is over to let you know if you won!`
                  : `We'll contact you to confirm shipping details in the next 24h.`}
              </Text>
            </Stack>
          ) : (
            <Stack align="center" maxW="500px" w="100%" px="1.5rem" mt="2rem">
              <Stack alignItems="center">
                {sellerInfo.imageURL && (
                  <img
                    src={sellerInfo.imageURL}
                    style={{
                      height: 50,
                      width: 50,
                      marginBlock: 5,
                      borderRadius: "50%",
                      objectFit: "cover"
                    }}
                  />
                )}
                {sellerInfo.username && (
                  <Text
                    ml={2}
                    fontWeight="bold"
                    fontSize={18}
                  >{`@${sellerInfo.username}`}</Text>
                )}
              </Stack>
              <Text textAlign="center">{product.name || product.description}</Text>

              <div
                style={{
                  position: "relative",
                  maxWidth: "100%",
                  height: "auto",
                  marginTop: "1.2rem",
                  marginBottom: "1.2rem",
                  maxHeight: '60vh'
                }}
              >
                {product.videoURL ? (
                  <video
                    style={{
                      backgroundColor: "#999",
                      width: "100%",
                      height: "auto",
                      maxHeight: '60vh',
                      borderRadius: 15,
                      objectFit: "cover"
                    }}
                    src={product.videoURL}
                    autoplay
                    autoPlay
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={product.imageUrl || product.imageURL}
                    style={{
                      // boxShadow: '0px 0px 36px -9px rgba(0,0,0,0.49)',
                      backgroundColor: "#999",
                      width: "100%",
                      height: "auto",
                      maxHeight: 250,
                      borderRadius: 15,
                      objectFit: "cover"
                    }}
                  />
                )}
                {product.isAuction ? (
                  null
                ) : (
                  <Stack
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(0,0,0,0.47522759103641454) 0%, rgba(0,0,0,0.623686974789916) 0%, rgba(0,0,0,0) 100%)",
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      zIndex: 3,
                      width: "100%",
                      padding: 10,
                      borderBottomLeftRadius: 15,
                      borderBottomRightRadius: 15
                    }}
                  >
                    <Text color="#FFFFFF" fontSize={16} fontWeight="bold">
                      {`${product.quantity} in stock`}
                    </Text>
                  </Stack>
                )}
              </div>
              {product.isAuction ? (
                null
              ) : (
                <Stack style={{ position: "relative" }}>
                  <Text textAlign="center" fontSize={"18px"} fontWeight="bold">
                    {`Pret: ${product.price} RON`}
                  </Text>
                  {sellerInfo.transportFee && (
                    <Text
                      textAlign="center"
                      style={{ marginTop: 0, fontSize: 12, color: "#666" }}
                    >
                      {`+${sellerInfo.transportFee} ${product.currency ||
                        "RON"} transport`}
                    </Text>
                  )}
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
                <div style={{ width: "100%" }}>
                  {auctionHasEnded ? (
                    <Stack
                      color='white'
                      align='center'
                      borderRadius='xl'
                      p={3}
                      style={{
                        background: 'rgb(63,60,145)',
                        background: 'linear-gradient(48deg, rgba(63,60,145,1) 0%, rgba(242,67,106,1) 100%)'
                      }}
                    >
                      <Text fontWeight='bold' fontSize={20}>
                        {`${Object.values(product.bids)[Object.values(product.bids).length - 1].name}`}
                      </Text>
                      <Text fontSize={20} style={{ margin: 0 }}>
                        {'won!'}
                      </Text>
                    </Stack>
                  ) : (
                    <Stack align='center'>
                      {product.bids ? (
                        <Flex align='flex-end' justify='space-between' w='100%'>
                          <Stack>
                            <Text
                              fontSize='11'
                            >
                              {`Winner ${emojis[Math.floor(Math.random() * emojis.length)]}`}
                            </Text>
                            <Text fontSize='15' noOfLines={1} style={{ marginTop: 2 }} textOverflow='ellipsis'>
                              {`${Object.values(product.bids)[Object.values(product.bids).length - 1].name} `}
                            </Text>
                          </Stack>
                          <Text fontSize='15' marginTop='2'>
                            {`${product.price} ${product.currency}`}
                          </Text>
                        </Flex>
                      ) : (
                        null
                      )}
                      <Stack w='100%' borderRadius='xl'>
                        <CountDownTimer endTime={product.auctionEndDate} />
                        <Button
                          borderRadius='xl'
                          // px='10px'
                          w='100%'
                          style={{
                            marginTop: 8,
                            justifyContent: 'center',
                            background: 'rgb(63,60,145)',
                            background: 'linear-gradient(48deg, rgba(63,60,145,1) 0%, rgba(242,67,106,1) 100%)',
                            flexDirection: 'column'
                          }}
                          className='seekr-gradient-on-hover'
                          onClick={() => {
                            this.setState({
                              newPrice: this.state.newPrice || product.price + 10,
                              isModalOpen: true
                            })
                          }}
                        >
                          <Text color='#FFFFFF' fontWeight='600'>
                            {`Liciteaza ${product.price + 10} ${product.currency}`}
                          </Text>
                        </Button>
                      </Stack>
                    </Stack>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    textAlign: "center"
                  }}
                >
                  {sellerInfo.paymentType === "card" ? (
                    <Button
                      style={{
                        backgroundColor: "#000",
                        width: "100%",
                        marginTop: "0.5rem"
                      }}
                      onClick={async () => {
                        const { sellerInfo } = this.state;
                        const transportFee = sellerInfo.transportFee || 0;
                        const fullPrice = product.price + transportFee;
                        const req = await axios.post("/api/checkout", {
                          productId: product.id,
                          name: product.name,
                          quantity: 1,
                          price: fullPrice,
                          imageUrl: product.imageUrl,
                          stripeSellerId: sellerInfo.stripeId
                        });
                        window.location.href = req.data.url;
                      }}
                    >
                      <Text style={{ color: "#FFFFFF" }}>Plata card</Text>
                    </Button>
                  ) : sellerInfo.paymentType === "ramburs" ? (
                    <Button
                      style={{
                        backgroundColor: "#000",
                        width: "100%",
                        marginTop: "0.5rem"
                      }}
                      onClick={() => this.setState({ isModalOpen: true })}
                    >
                      <Text style={{ color: "#FFFFFF" }}>Plata ramburs</Text>
                    </Button>
                  ) : (
                    <Stack>
                      <Button
                        style={{
                          backgroundColor: "#000",
                          width: "100%",
                          marginTop: "0.5rem"
                        }}
                        onClick={async () => {
                          const { sellerInfo } = this.state;
                          const transportFee = sellerInfo.transportFee || 0;
                          const fullPrice = product.price + transportFee;
                          const req = await axios.post("/api/checkout", {
                            productId: product.id,
                            name: product.name,
                            quantity: 1,
                            price: fullPrice,
                            imageUrl: product.imageUrl,
                            stripeSellerId: sellerInfo.stripeId
                          });
                          window.location.href = req.data.url;
                        }}
                      >
                        <Text style={{ color: "#FFFFFF" }}>Plata card</Text>
                      </Button>
                      <Text style={{ color: "#666", marginTop: "0.5rem" }}>
                        or
                      </Text>

                      <Pressable
                        onPress={() => this.setState({ isModalOpen: true })}
                      >
                        <Text
                          style={{
                            color: "#666",
                            // textDecorationLine: "underline"
                          }}
                        >
                          Plata ramburs
                        </Text>
                      </Pressable>
                    </Stack>
                  )}
                </div>
              )}
            </Stack>
          )
        ) : null}
        {product.isAuction ? (
          null
        ) : (
          <ShopItems
            isOnMobile={isOnMobile}
            products={Object.values(sellerProducts)}
            initialProduct={product}
            sellerInfo={sellerInfo}
          />
        )}
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
