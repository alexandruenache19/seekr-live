import React, { Component, useState } from "react";
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
  ModalHeader,
  FormControl,
  Input,
  FormHelperText,
  useToast,
  useClipboard
} from "@chakra-ui/react";
import { Pressable } from "react-native";
import { MdArrowBack } from "react-icons/md";
import { FiInstagram } from "react-icons/fi";
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

const RegistrationModal = ({ isOpen, onClose, isOnMobile, jointEventId }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const toast = useToast();
  return (
    <Modal
      motionPreset="scale"
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent
        p={isOnMobile ? 0 : 10}
        py={isOnMobile ? 5 : 10}
        borderRadius={isOnMobile ? 10 : 30}
      >
        <ModalHeader px="0px">
          <Text>
            Rezerva un loc & primeste o notificare inainte de eveniment
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <Stack
          style={{
            overflow: "scroll",
            maxHeight: "60vh",
            paddingBottom: "1rem"
          }}
        >
          <FormControl id="name" isRequired style={{ marginBottom: 10 }}>
            <Text fontSize={15} color="#30313D" style={{ marginBottom: 4 }}>
              Nume si prenume
            </Text>
            <Input
              value={name}
              placeholder="Nume si prenume"
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="phone" isRequired style={{ marginBottom: 10 }}>
            <Text fontSize={15} color="#30313D" style={{ marginBottom: 4 }}>
              Numar de telefon
            </Text>
            <Input
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
            <FormHelperText>
              Vei primi un SMS cu 5 minute inainte de eveniment
            </FormHelperText>
          </FormControl>
          <Button
            style={{ backgroundColor: "#121212", flex: 1, padding: 10 }}
            onClick={async () => {
              if (name !== "" && phoneNumber !== "") {
                await firebase
                  .database()
                  .ref(`joint-events/${jointEventId}/waitlist`)
                  .push({
                    name: name,
                    phoneNumber: phoneNumber
                  });
                toast({
                  title: "Loc rezervat cu succes",
                  status: "success",
                  duration: 3000,
                  isClosable: false
                });
                onClose();
              } else {
                alert("Te rugam completeaza formularul");
              }
              // await props.completeRegistration({
              //   name: name,
              //   phoneNumber: phoneNumber
              // })
            }}
          >
            <Text style={{ color: "#FFFFFF" }}>Rezerva-mi locul</Text>
          </Button>
        </Stack>
      </ModalContent>
    </Modal>
  );
};

export default class JoinEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      events: [],
      displayEvent: false,
      eventId: null,
      showRegistrationModal: false
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
    const nextURL = `/e/${eventId}`;
    const nextTitle = "My new page title";
    const nextState = { additionalInformation: "Updated the URL with JS" };

    if (window && window.history) {
      // This will create a new entry in the browser's history, without reloading
      window.history.pushState(nextState, nextTitle, nextURL);

      // This will replace the current entry in the browser's history, without reloading
      window.history.replaceState(nextState, nextTitle, nextURL);
    }

    const that = this;
    window.onpopstate = function(e) {
      if (e.state) {
        that.setState({
          displayEvent: false,
          eventId: null
        });
        // document.getElementById("content").innerHTML = e.state.html;
        // document.title = e.state.pageTitle;
      }
    };

    this.setState({
      displayEvent: true,
      eventId: eventId
    });
  }

  render() {
    const {
      loading,
      events,
      displayEvent,
      eventId,
      showRegistrationModal
    } = this.state;
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
        {showRegistrationModal ? (
          <RegistrationModal
            isOpen={showRegistrationModal}
            onClose={() => this.setState({ showRegistrationModal: false })}
            isOnMobile={isOnMobile}
            jointEventId={jointEvent.info.id}
          />
        ) : null}

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
                        eventData.event.status === "live" &&
                        eventData.event.liveURL
                          ? eventData.event.info.liveURL
                          : eventData.event.info.videoURL
                      }
                    />
                    {/* {eventData.event.liveURL || eventData.sellerInfo.videoURL ? (
                      <AmazonIVSPreview
                        id={eventData.event.id}
                        url={
                          eventData.event.status === "live" &&
                            eventData.event.liveURL
                            ? eventData.event.info.liveURL
                            : eventData.sellerInfo.videoURL
                        }
                      />
                    ) : (
                      <div style={{ width: 'auto', height: '250px', backgroundColor: 'red', borderRadius: 15 }} />
                    )} */}
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
                      p="10px"
                      w="100%"
                      borderBottomLeftRadius="15px"
                      borderBottomRightRadius="15px"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Flex
                        align="center"
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
                          <FiInstagram color="#FFF" size={28} />
                        </Pressable>
                      )}
                    </Flex>
                  </Stack>
                </Pressable>
              );
            })}
          </SimpleGrid>
          <Flex position="absolute" bottom="2rem" justify="center" flex={1}>
            {jointEvent.info.timestamp &&
            jointEvent.info.timestamp > new Date().getTime() ? (
              <Stack style={{ justifyContent: "center", alignItems: "center" }}>
                <Button
                  style={{
                    backgroundColor: "#121212",
                    padding: 10,
                    flex: 1,
                    minWidth: isOnMobile ? 250 : 350
                  }}
                  maxW="500px"
                  boxShadow="0px 0px 38px -2px rgba(0,0,0,0.62)"
                  className="seekr-gradient-on-hover"
                  onClick={() => {
                    this.setState({ showRegistrationModal: true });
                  }}
                >
                  <Text style={{ color: "#FFFFFF" }}>Rezerva un loc</Text>
                </Button>
                <Text style={{ fontWeight: "bold" }}>
                  *primesti livrarea gratis
                </Text>
              </Stack>
            ) : (
              <Button
                style={{
                  backgroundColor: "#121212",
                  flex: 1,
                  minWidth: isOnMobile ? 250 : 350
                }}
                maxW="500px"
                boxShadow="0px 0px 38px -2px rgba(0,0,0,0.62)"
                className="seekr-gradient-on-hover"
                onClick={async () => {
                  this.handleGetSetEvent(
                    events[Math.floor(Math.random() * events.length)].event.id
                  );
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>Join random event</Text>
              </Button>
            )}
          </Flex>
        </Stack>
      </Stack>
    );
  }
}

const styles = {
  formRow: {}
};

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
