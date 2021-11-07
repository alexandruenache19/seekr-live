import React, { Component } from "react";
import {
  Stack,
  Avatar,
  Button,
  Text,
  Spinner,
  Flex,
  Grid,
  SimpleGrid,
  Box,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  useClipboard
} from "@chakra-ui/react";
import { Pressable } from "react-native";
import { MdArrowBack } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { getJointEvent } from "../../actions/fetch";
import firebase from "../../firebase/clientApp";
import EventPage from "../e/[id]";
import {
  getSeller,
  getEvent,
  getEventInfo,
  getSellerInfo
} from "../../fetchData/getData";
import AmazonIVSPreview from "../../components/molecules/seller/AmazonIVSPreview";

export default class JoinEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      events: [],
      displayEvent: false,
      eventId: null
    };

    this.handleGetSetEvent = this.handleGetSetEvent.bind(this);
  }

  async componentDidMount() {
    const { jointEvent } = this.props;
    if (jointEvent && jointEvent.participants) {
      const events = [];
      for (const uid in jointEvent.participants) {
        /** get current event */
        const currentEventSn = await firebase
          .database()
          .ref(`users/${uid}/events/current`)
          .once("value");
        if (currentEventSn.exists()) {
          const eventId = currentEventSn.val();
          const eventData = await getEvent(eventId);
          const sellerInfo = await getSellerInfo(eventData.info.sellerId);
          this.setState({
            events: this.state.events.concat({
              event: eventData,
              sellerInfo: sellerInfo
            }),
            loading: false
          });
        }
      }

      // this.setState({
      //   // events: events,
      //   loading: false
      // });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  handleGetSetEvent(eventId) {
    this.setState({
      displayEvent: true,
      eventId: eventId
    });
  }

  render() {
    const { loading, events, displayEvent, eventId } = this.state;
    const { isOnMobile, jointEvent } = this.props;

    if (loading) {
      return (
        <Stack
          w="100vw"
          h="100vh"
          top={0}
          zIndex={5}
          justifyContent="center"
          alignItems="center"
          bg="rgba(255,255,255,0.3)"
        >
          <Spinner color="#121212" size="md" />
        </Stack>
      );
    }

    if (displayEvent) {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <EventPage
            eventId={eventId}
            isOnMobile={isOnMobile}
            handleGoBack={() =>
              this.setState({ displayEvent: false, eventId: null })
            }
          />
        </div>
      );
    }

    return (
      <Stack w="100vw" h="100%" justifyContent="center" alignItems="center">
        <Stack
          maxW="1000px"
          height="100vh"
          overflow="scroll"
          px="1rem"
          pt="2rem"
          position="relative"
          alignItems="center"
        >
          {jointEvent.info ? (
            <div className="header">
              <Text fontWeight="bold" fontSize="36px" lineHeight="1.3">
                {jointEvent.info.title}
              </Text>
              <Text
                fontWeight="normal"
                fontSize="18px"
                style={{ marginTop: 10 }}
              >
                {jointEvent.info.description}
              </Text>
            </div>
          ) : null}
          <SimpleGrid
            style={{
              marginTop: "2rem",
              marginBottom: "2rem",
              justifyContent: "center"
            }}
            columns={[2, null, 3]}
            // columns={{ xs: 2, sm: 2, md: 3, lg: 3 }}
            maxWidth="1000px"
            spacing="20px"
          >
            {events.map(eventData => {
              console.log(eventData);
              return (
                <Pressable
                  onPress={() => this.handleGetSetEvent(eventData.event.id)}
                >
                  <Stack
                    h="250px"
                    w="100%"
                    bg="#999"
                    borderRadius="15px"
                    position="relative"
                    key={eventData.event.id}
                    style={{ boxShadow: "0px 0px 36px 2px rgba(0,0,0,0.12)" }}
                  >
                    <AmazonIVSPreview
                      id={eventData.event.id}
                      url={
                        "https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4"
                      }
                    />
                    <Flex
                      style={{
                        flex: 1,
                        marginTop: 0,
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.47522759103641454) 10%, rgba(255,255,255,0) 100%)"
                      }}
                      position="absolute"
                      top="0"
                      p={2}
                      w="100%"
                      borderTopLeftRadius="15px"
                      borderTopRightRadius="15px"
                    >
                      <Text
                        style={{
                          flex: 1,
                          paddingLeft: 4,
                          color: "#FFF",
                          fontWeight: "bold",
                          fontSize: 14,
                          position: "relative"
                        }}
                      >
                        {eventData.event.info.title}
                      </Text>
                    </Flex>
                    <Flex
                      style={{
                        flex: 1,
                        background:
                          "linear-gradient(0deg, rgba(0,0,0,0.47522759103641454) 44%, rgba(255,255,255,0) 100%)"
                      }}
                      position="absolute"
                      bottom="0"
                      p={2}
                      w="100%"
                      borderBottomLeftRadius="15px"
                      borderBottomRightRadius="15px"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Flex
                        style={{
                          flex: 1,
                          overflow: "hidden"
                        }}
                      >
                        <Avatar
                          size="xs"
                          name={eventData.sellerInfo.username}
                          src={eventData.sellerInfo.imageURL}
                        />

                        <Text
                          noOfLines={1}
                          textOverflow="ellipsis"
                          style={{
                            flex: 1,
                            paddingLeft: 4,
                            color: "#FFF",
                            fontWeight: "bold",
                            fontSize: 12,
                            position: "relative"
                          }}
                        >
                          @{eventData.sellerInfo.username}
                        </Text>
                      </Flex>
                      {eventData.sellerInfo.instagramUrl && (
                        <Pressable
                          onPress={() =>
                            window.open(
                              eventData.sellerInfo.instagramUrl,
                              "_blank"
                            )
                          }
                        >
                          <AiFillInstagram color="#FFF" size={30} />
                        </Pressable>
                      )}
                    </Flex>
                  </Stack>
                </Pressable>
              );
            })}
          </SimpleGrid>
          <Flex position="absolute" bottom="2rem" justify="center" flex={1}>
            <Button
              style={{
                backgroundColor: "#121212",
                flex: 1,
                minWidth: isOnMobile ? 250 : 350
              }}
              maxW="500px"
              boxShadow="0px 0px 38px -2px rgba(0,0,0,0.62)"
              className="seekr-gradient-on-hover"
              // borderRadius='15px'
              onClick={async () => {
                this.handleGetSetEvent(
                  events[Math.floor(Math.random() * events.length)].event.id
                );
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>Join random event</Text>
            </Button>
          </Flex>
        </Stack>
      </Stack>
    );
  }
}

export const getServerSideProps = async context => {
  const { jointEventId } = context.params;

  const jointEvent = await getJointEvent(jointEventId);

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
      jointEvent: jointEvent,
      isOnMobile: isOnMobile
    }
  };
};
