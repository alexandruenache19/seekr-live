import React, { Component } from "react";
import { withRouter } from "next/router";
import { Flex, Stack, Text, Avatar, Center, Button } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import Lottie from "react-lottie";
import { FaShareSquare, FaPlus, FaMinus, FaArrowRight } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { AiFillTags } from "react-icons/ai";

import * as animationData from "./live.json";
import { MessageInput, CommentsList } from "../../../components";
import { getProductInfo } from "../../../fetchData/getData";
import firebase from "../../../firebase/clientApp";
import AmazonIVS from "./AmazonIVS";
class LiveScreen extends Component {
  constructor(props) {
    super(props);

    // this.player = new MediaPlayer();
    // this.videoElement = document.querySelector("#video-player");

    this.state = {
      productInfo: null,
      orderQuantity: 1,
      viewers: 0
    };
    this.handleOrder = this.handleOrder.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleFollow = this.handleFollow.bind(this);

    // this.player.load(
    //   "https://a6a7debc4d73.us-east-1.playback.live-video.net/api/video/v1/us-east-1.655514092918.channel.IBqDDsJKrvYj.m3u8"
    // );
  }

  componentDidMount() {
    const { eventInfo, currentProductId } = this.props;
    firebase
      .database()
      .ref(`events/${eventInfo.id}/info/viewers`)
      .set(firebase.database.ServerValue.increment(1));

    this.productInfoListener = firebase
      .database()
      .ref(`events/${eventInfo.id}/products/${currentProductId}`)
      .on("value", snapshot => {
        this.setState({
          productInfo: snapshot.val()
        });
      });

    this.productInfoListener = firebase
      .database()
      .ref(`events/${eventInfo.id}/info/viewers`)
      .on("value", snapshot => {
        if (snapshot.exists()) {
          this.setState({
            viewers: snapshot.val()
          });
        }
      });

    window.onbeforeunload = function() {
      firebase
        .database()
        .ref(`events/${eventInfo.id}/info/viewers`)
        .set(firebase.database.ServerValue.increment(-1));
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    const { eventInfo, currentProductId } = this.props;
    if (
      (prevProps.currentProductId &&
        this.props.currentProductId &&
        prevProps.currentProductId !== this.props.currentProductId) ||
      (!prevProps.currentProductId && this.props.currentProductId)
    ) {
      this.productInfoListener = firebase
        .database()
        .ref(`events/${eventInfo.id}/products/${currentProductId}`)
        .on("value", snapshot => {
          this.setState({
            productInfo: snapshot.val()
          });
        });
    }
  }

  componentWillUnmount() {
    const { eventInfo, currentProductId } = this.props;
    this.productInfoListener &&
      firebase
        .database()
        .ref(`events/${eventInfo.id}/products/${currentProductId}`)
        .off("value", this.productInfoListener);
  }

  handleOrder() {
    const { eventInfo } = this.props;
    const { productInfo, orderQuantity } = this.state;
    this.props.onOpenModal("order", {
      productInfo: productInfo,
      eventInfo: eventInfo,
      orderQuantity: orderQuantity,
      totalPrice: productInfo.price * orderQuantity
    });
  }

  handleShare() {
    const { sellerInfo } = this.props;
    this.props.onOpenModal("share", {
      username: sellerInfo.username,
      shareUrl: window.location.href
    });
  }

  handleFollow() {
    this.props.onOpenModal("follow", {});
  }

  render() {
    const {
      isOnMobile,
      sellerInfo,
      eventInfo,
      comments,
      username,
      currentProductId
    } = this.props;
    const { productInfo, orderQuantity, viewers } = this.state;

    if (isOnMobile) {
      return (
        <Stack h="100vh" w="100vw" p="10px" bg="#FFF">
          {/* <Flex h='10vh' justify='space-between' alignItems='center'>
            <Text p='10px' fontWeight='bold' fontSize='sm'>
              seekr.
            </Text>
            <Flex
              flex={1}
              bg='#F2F4F9'
              p='10px'
              borderRadius='xl'
              overflow='hidden'
              justify='space-between'
            >
              <Text noOfLines={2} fontSize={10} textAlign='center'>
                {eventInfo.title}
              </Text>

              <Center>
                <Button
                  ml='0.2em'
                  borderRadius='1em'
                  bg='#FFF'
                  onClick={this.handleShare}
                  o
                >
                  <FaShareSquare size={20} />
                </Button>
              </Center>
            </Flex>
          </Flex> */}
          <Stack
            // h='50vh'
            h="100%"
            bg="rgba(0,0,0,0.9)"
            borderRadius="xl"
            overflow="hidden"
            position="relative"
            justifyContent="center"
            alignItems="center"
          >
            {/*  <ReactPlayer
              className="bg-player"
              url={eventInfo.videoURL}
              width="100%"
              height="100%"
              playing
              loop
            />

            <ReactPlayer
              className="react-player"
              url={eventInfo.liveURL}
              width="100%"
              height="100%"
              style={{ marginTop: 0 }}
              playing
              loop
            />

            */}
            <AmazonIVS url={eventInfo.liveURL} />

            <Button
              position="absolute"
              top="10px"
              right="10px"
              style={{ marginTop: 0 }}
              h="40px"
              w="40px"
              p="0px"
              borderRadius="xl"
              bg="#FFF"
              onClick={this.handleShare}
              zIndex={10}
            >
              <FaShareSquare size={20} />
            </Button>
            {productInfo ? (
              <Flex position="absolute" left="10px" bottom="10px">
                <Stack
                  borderRadius="xl"
                  p="5px"
                  px="9px"
                  bg="#FFF"
                  zIndex={10}
                  justifyContent="center"
                >
                  <Text color="#000" fontWeight="bold" fontSize="14">
                    {`${productInfo.currentStock} in stock`}
                  </Text>
                </Stack>
                <Stack
                  borderRadius="xl"
                  p="5px"
                  px="9px"
                  bg="#FFF"
                  ml="10px"
                  zIndex={10}
                  justifyContent="center"
                >
                  <Text color="#000" fontWeight="bold" fontSize="14">
                    {`${productInfo.currency} ${productInfo.price}`}
                  </Text>
                </Stack>
              </Flex>
            ) : null}
            <Stack
              position="absolute"
              left="10px"
              top="10px"
              borderRadius="xl"
              p="5px"
              bg="#FFF"
              zIndex={10}
              style={{ marginTop: 0, justifyContent: "flex-start" }}
            >
              <Flex justify="space-between">
                <Avatar
                  size="xs"
                  name={sellerInfo.username}
                  src={sellerInfo.imageURL}
                />
                <Text fontWeight="bold" fontSize={10} pl="4px">
                  @{sellerInfo.username}
                </Text>
              </Flex>
              <Center style={{ marginTop: 0, justifyContent: "flex-start" }}>
                <Center>
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: animationData
                    }}
                    height={20}
                    width={20}
                  />
                  <Text pl="2px" fontSize={10}>
                    Live
                  </Text>
                </Center>
                <Center ml="5px" textAlign="center">
                  <FiEye size={14} />
                  <Text fontSize={10} textAlign="center" pl="2px">
                    {viewers}
                  </Text>
                </Center>
              </Center>
            </Stack>
          </Stack>

          <Stack
            p="10px"
            h="25vh"
            bg="#EEF2F8"
            borderRadius="xl"
            style={{ justifyContent: "space-between" }}
          >
            <CommentsList comments={comments} />
            <MessageInput
              onOpenModal={this.props.onOpenModal}
              username={username}
              eventId={eventInfo.id}
            />
          </Stack>

          <Flex
            p="10px"
            h="10vh"
            w="100%"
            bg="#EEF2F8"
            borderRadius="xl"
            overflow="hidden"
            style={{ justifyContent: "space-between" }}
          >
            {currentProductId && productInfo ? (
              <Center
                w="100%"
                p="10px"
                bg="#FFF"
                style={{ justifyContent: "space-between" }}
              >
                <Flex justify="space-between">
                  <Button
                    size="sm"
                    onClick={() => {
                      if (orderQuantity > 1) {
                        this.setState({ orderQuantity: orderQuantity - 1 });
                      }
                    }}
                  >
                    <FaMinus size={14} />
                  </Button>
                  <Text fontSize="xl">{orderQuantity}</Text>
                  <Button
                    size="sm"
                    onClick={() => {
                      if (orderQuantity < productInfo.currentStock - 1) {
                        this.setState({ orderQuantity: orderQuantity + 1 });
                      } else {
                        alert("Sold out");
                      }
                    }}
                  >
                    <FaPlus size={14} />
                  </Button>
                </Flex>

                <Center>
                  <Text fontWeight="light" fontSize={9}>
                    {productInfo.currency}
                  </Text>
                  <Text fontSize={22}>{productInfo.price * orderQuantity}</Text>
                </Center>

                <Button
                  style={{ marginLeft: 10, justifyContent: "space-between" }}
                  onClick={this.handleOrder}
                >
                  <Text pr="10px">Place Order</Text>
                  <FaArrowRight size={14} />
                </Button>
              </Center>
            ) : (
              <Center
                w="100%"
                p="10px"
                bg="#FFF"
                style={{ justifyContent: "center" }}
              >
                <Text
                  color="#000"
                  fontWeight="bold"
                  textAlign="center"
                  fontSize="md"
                >
                  {`Waiting for ${sellerInfo.username} to add a product...`}
                </Text>
              </Center>
            )}
          </Flex>
        </Stack>
      );
    }

    return (
      <Flex bg="#FFF" h="100vh" w="100vw" justify="space-between">
        <Stack w="70vw">
          <Flex
            justify="space-between"
            alignItems="center"
            p="20px"
            h="15vh"
            w="100%"
          >
            <Text fontWeight="bold" fontSize="2xl">
              seekr.
            </Text>
            <Flex
              h="100%"
              p="10px"
              w="85%"
              bg="#F2F4F9"
              borderRadius="xl"
              overflow="hidden"
              justify="space-between"
            >
              <Stack>
                <Text fontWeight="bold" fontSize={20}>
                  {eventInfo.title} by @{sellerInfo.username}
                </Text>
                <Text color="#718096" fontSize={14} style={{ marginTop: 0 }}>
                  {sellerInfo.category}
                </Text>
              </Stack>

              <Center>
                <Button
                  h="3em"
                  shadow="md"
                  ml="1em"
                  borderRadius="1.5em"
                  bg="#FFF"
                  onClick={this.handleShare}
                >
                  <Text pr="5px">Share</Text>
                  <FaShareSquare size={30} />
                </Button>
              </Center>
            </Flex>
          </Flex>
          <Center
            p="20px"
            pt="0px"
            pb="0px"
            h="70vh"
            w="100%"
            style={{ marginTop: 0 }}
          >
            <Stack
              h="100%"
              w="100%"
              bg="rgba(0,0,0,0.9)"
              borderRadius="xl"
              overflow="hidden"
              position="relative"
            >
              <AmazonIVS url={eventInfo.liveURL} />

              {/*<ReactPlayer
                className="bg-player"
                // url={eventInfo.liveURL || eventInfo.videoURL}
                url={
                  "https://a6a7debc4d73.us-east-1.playback.live-video.net/api/video/v1/us-east-1.655514092918.channel.QRSYRWg4Uk8K.m3u8"
                }
                width="100%"
                height="100%"
                playing
                loop
                mute
              />*/}
              {/*<ReactPlayer
                className="react-player"
                url={eventInfo.liveURL}
                width="100%"
                height="100%"
                style={{ marginTop: 0 }}
                playing
              />*/}
              <Center
                position="absolute"
                top="15px"
                left="15px"
                zIndex={10}
                borderRadius="xl"
                p="10px"
                bg="#FFF"
                style={{ marginTop: 0 }}
              >
                <Avatar name={sellerInfo.username} src={sellerInfo.imageURL} />
                <Stack justify="center" pl="5px">
                  <Text fontWeight="bold">@{sellerInfo.username}</Text>
                  <Flex style={{ marginTop: 0 }} justify="space-between">
                    <Center>
                      <Lottie
                        options={{
                          loop: true,
                          autoplay: true,
                          animationData: animationData
                        }}
                        height={20}
                        width={20}
                      />
                      <Text pl="4px">Live</Text>
                    </Center>
                    <Center ml="10px" textAlign="center">
                      <FiEye size={14} />
                      <Text textAlign="center" pl="4px">
                        {viewers}
                      </Text>
                    </Center>
                  </Flex>
                </Stack>
              </Center>
            </Stack>
          </Center>

          {currentProductId && productInfo ? (
            <Center p="20px" px="0" h="15vh" w="100%" style={{ marginTop: 0 }}>
              <Flex
                h="100%"
                w="100%"
                p="10px"
                bg="#F2F4F9"
                borderRadius="xl"
                overflow="hidden"
                style={{ justifyContent: "space-between", marginTop: 0 }}
              >
                <Center>
                  <Stack
                    borderRadius="xl"
                    p="10px"
                    bg="#FFF"
                    justifyContent="space-between"
                  >
                    <Text pl="6px" color="#000" fontWeight="bold" fontSize="xl">
                      {`${productInfo.currentStock} in stock`}
                    </Text>
                  </Stack>
                  <Center
                    ml="10px"
                    borderRadius="xl"
                    p="10px"
                    bg="#FFF"
                    justifyContent="space-between"
                  >
                    <AiFillTags size={30} />
                    <Text pl="6px" color="#000" fontWeight="bold" fontSize="xl">
                      {`${productInfo.currency} ${productInfo.price}`}
                    </Text>
                  </Center>
                </Center>
                <Center
                  w="40vw"
                  borderRadius="xl"
                  p="10px"
                  bg="#FFF"
                  justifyContent="space-between"
                >
                  <Flex justify="space-between">
                    <Button
                      size="sm"
                      onClick={() => {
                        if (orderQuantity > 1) {
                          this.setState({ orderQuantity: orderQuantity - 1 });
                        }
                      }}
                    >
                      <FaMinus size={14} />
                    </Button>
                    <Text px="10px" fontSize="xl">
                      {orderQuantity}
                    </Text>
                    <Button
                      size="sm"
                      onClick={() => {
                        if (orderQuantity < productInfo.currentStock - 1) {
                          this.setState({ orderQuantity: orderQuantity + 1 });
                        } else {
                          alert("Sold out");
                        }
                      }}
                    >
                      <FaPlus size={14} />
                    </Button>
                  </Flex>
                  <Center>
                    <Text fontWeight="light" fontSize={9}>
                      {productInfo.currency}
                    </Text>
                    <Text fontSize={22}>
                      {productInfo.price * orderQuantity}
                    </Text>
                  </Center>
                  <Button onClick={this.handleOrder}>
                    <Text pr="10px">Place Order</Text>
                  </Button>
                </Center>
              </Flex>
            </Center>
          ) : (
            <Center p="20px" h="15vh" w="100%" style={{ marginTop: 0 }}>
              <Flex
                h="100%"
                w="100%"
                p="10px"
                bg="#F2F4F9"
                borderRadius="xl"
                overflow="hidden"
                style={{ justifyContent: "space-between", marginTop: 0 }}
              >
                <Center w="100%">
                  <Stack
                    borderRadius="xl"
                    p="10px"
                    bg="#FFF"
                    w="100%"
                    align="center"
                    justify="center"
                  >
                    <Text color="#000" fontWeight="bold" fontSize="xl">
                      {`Waiting for ${sellerInfo.username} to add a product...`}
                    </Text>
                  </Stack>
                </Center>
              </Flex>
            </Center>
          )}
        </Stack>

        <Center p="20px" pl="0px" h="100vh" w="30vw">
          <Stack
            h="100%"
            p="20px"
            w="100%"
            bg="#EEF2F8"
            borderRadius="xl"
            style={{ justifyContent: "space-between" }}
          >
            <Text color="#000" fontWeight="bold">
              Chat with {sellerInfo.username}
            </Text>

            <CommentsList comments={comments} />
            <MessageInput
              onOpenModal={this.props.onOpenModal}
              username={username}
              eventId={eventInfo.id}
            />
          </Stack>
        </Center>
      </Flex>
    );
  }
}

const styles = {};

export default withRouter(LiveScreen);
