import React, { Component, useState, useEffect } from "react";
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
import ReactPlayer from "react-player";
import { Pressable, ScrollView } from "react-native";
import { MdArrowBack } from "react-icons/md";
import { FiInstagram, FiPlus } from "react-icons/fi";
import firebase from "../../../firebase/clientApp";
import router from "next/router";
import { getEvent, getSellerInfo } from "../../../fetchData/getData";
import Countdown from "../../molecules/seller/Countdown";
import AmazonIVSPreview from "../../molecules/seller/AmazonIVSPreview";

const RegistrationModal = ({
  title,
  isOpen,
  onClose,
  baseDetails,
  isOnMobile,
  jointEventId,
  isConfirmModal,
  ...props
}) => {
  const [name, setName] = useState(baseDetails.name || "");
  const [phoneNumber, setPhoneNumber] = useState(baseDetails.phoneNumber || "");
  const [addressLine1, setAddressLine1] = useState(
    baseDetails.addressLine1 || ""
  );

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
        p={isOnMobile ? 10 : 10}
        py={isOnMobile ? 5 : 10}
        px="1.5rem"
        borderRadius={isOnMobile ? 10 : 30}
      >
        <ModalHeader px="0px">
          {isConfirmModal ? (
            <Text>✅ Confirma detaliile pentru a comanda mai rapid</Text>
          ) : (
            <Text>
              Rezerva loc pentru livrarea gratis. Vei primi un SMS cu 5 minute
              inainte de eveniment
            </Text>
          )}
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <Stack
          style={{
            overflow: "scroll",
            maxHeight: "60vh",
            paddingBottom: "1rem"
          }}
        >
          <FormControl id="name" isRequired style={{ marginBottom: 10 }}>
            <Input
              value={name}
              placeholder="Nume si prenume"
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="phone" isRequired style={{ marginBottom: 10 }}>
            <Input
              placeholder="Numar de telefon"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </FormControl>
          <FormControl id="address" isRequired style={{ marginBottom: 10 }}>
            <FormControl id="address-line-1">
              <Input
                placeholder="Adresa de livrare"
                value={addressLine1}
                onChange={e => setAddressLine1(e.target.value)}
              />
            </FormControl>
          </FormControl>
          <Button
            style={{ backgroundColor: "#121212", flex: 1, padding: 10 }}
            onClick={async () => {
              if (isConfirmModal) {
                props.setDetails({
                  name: name,
                  phoneNumber: phoneNumber,
                  addressLine1: addressLine1
                });
                toast({
                  title: "Confirmat",
                  status: "success",
                  duration: 1500,
                  isClosable: false
                });
                onClose();
              } else {
                if (name !== "" && phoneNumber !== "") {
                  await firebase
                    .database()
                    .ref(`joint-events/${jointEventId}/waitlist`)
                    .push({
                      name: name,
                      phoneNumber: phoneNumber,
                      addressLine1: addressLine1
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
              }
            }}
          >
            <Text style={{ color: "#FFFFFF" }}>
              {isConfirmModal ? "Confirm" : "Rezerva-mi locul"}
            </Text>
          </Button>
        </Stack>
      </ModalContent>
    </Modal>
  );
};

export default class JointEventScheduledPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      participants: [],
      showRegistrationModal: false,
      showRegistrationButton: false,

      /** for fast ordering */
      name: props.name || null,
      phoneNumber: props.phoneNumber || null,
      addressLine1: props.addressLine1 || null
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    const { jointEvent, jointEventId } = this.props;
    const { info } = jointEvent;

    window.addEventListener("scroll", this.handleScroll);

    if (router.query) {
      this.setState({
        name: router.query.n,
        phoneNumber: router.query.p,
        addressLine1: router.query.a
      });
    }

    if (jointEvent && jointEvent.participants) {
      const sortedParticipants = Object.values(jointEvent.participants).sort(
        (a, b) => {
          return a.index - b.index;
        }
      );

      this.setState({
        participants: sortedParticipants,
        loading: false
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(event) {
    let scrollTop = event.nativeEvent.contentOffset.y;
    if (scrollTop > 300) {
      this.setState({
        showRegistrationButton: true
      });
    }
  }

  render() {
    const {
      loading,
      showRegistrationModal,
      showRegistrationButton,
      participants
    } = this.state;
    const { isOnMobile, jointEvent, isConfirmModal } = this.props;
    const { info } = jointEvent;

    return (
      <Stack w="100vw" h="100%" justifyContent="center" alignItems="center">
        {showRegistrationModal && (
          <RegistrationModal
            isOpen={showRegistrationModal}
            onClose={() => this.setState({ showRegistrationModal: false })}
            isOnMobile={isOnMobile}
            jointEventId={info.id}
            isConfirmModal={false}
            baseDetails={{
              name: this.state.name,
              phoneNumber: this.state.phoneNumber,
              addressLine1: this.state.addressLine1
            }}
            setDetails={details => {
              this.setState({
                name: details.name,
                phoneNumber: details.phoneNumber,
                addressLine1: details.addressLine1
              });
            }}
          />
        )}

        <Stack
          height="100vh"
          overflow="scroll"
          position="relative"
          alignItems="center"
          w="100%"
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={this.handleScroll}
            scrollEventThrottle={16}
            style={{ width: "100%" }}
            contentContainerStyle={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <Stack
              className="header"
              minHeight="50vh"
              w="100%"
              background='url("https://s3.amazonaws.com/odin-images/images/rpDUoOvgxFT.jpeg")'
              backgroundSize="cover"
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 100%)",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "3rem 1.1rem"
                }}
              >
                <Stack
                  w={isOnMobile ? "100%" : "1100px"}
                  h="100%"
                  justify="center"
                  maxW="1100px"
                >
                  <Text
                    fontWeight="bold"
                    fontSize="46px"
                    color="#FFFFFF"
                    lineHeight="1.3"
                    maxW="650px"
                  >
                    {info.title}
                  </Text>
                  <Text
                    color="#FFFFFF"
                    fontWeight="normal"
                    fontSize="18px"
                    maxW="650px"
                    style={{ marginTop: 10 }}
                  >
                    {info.description}
                  </Text>
                  <Countdown
                    isOnMobile={isOnMobile}
                    timeTillDate="11 17 2021, 6:30 pm"
                    timeFormat="MM DD YYYY, h:mm a"
                  />
                  <Button
                    style={{
                      background: "rgb(63,60,145)",
                      background:
                        "linear-gradient(48deg, rgba(63,60,145,1) 0%, rgba(242,67,106,1) 100%)",
                      padding: 12,
                      width: "100%",
                      marginTop: 10
                    }}
                    maxW="400px"
                    boxShadow="0px 0px 38px -2px rgba(0,0,0,0.62)"
                    className="seekr-gradient-on-hover"
                    onClick={() => {
                      this.setState({ showRegistrationModal: true });
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontWeight: "bold",
                        fontSize: 18
                      }}
                    >
                      Rezerva loc
                    </Text>
                  </Button>
                  <Text style={{ color: "#FFF", fontSize: 14, marginTop: 8 }}>
                    si primesti livrarea gratis la orice comanda
                  </Text>
                </Stack>
              </div>
            </Stack>
            <Stack
              px="1rem"
              pt="2rem"
              pb="9rem"
              w="100%"
              style={{
                width: isOnMobile ? "100%" : "1100px",
                maxWidth: "1100px"
              }}
            >
              <Stack
                w="100%"
                pt={isOnMobile ? 0 : "1rem"}
                pb="0rem"
                style={{ marginTop: 0 }}
              >
                <Text
                  fontWeight="bold"
                  fontSize="20px"
                  style={{ marginBottom: "1rem" }}
                >
                  Arunca o privire la insta-ul expozantilor
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {participants.map(sellerInfo => {
                    return (
                      <Pressable
                        style={{ marginRight: "1rem" }}
                        onPress={() => {
                          if (sellerInfo.instagramUrl) {
                            window.open(`${sellerInfo.instagramUrl}`, "_blank");
                          }
                        }}
                      >
                        <Stack
                          align="center"
                          w="120px"
                          align="center"
                          style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis"
                          }}
                        >
                          <img
                            src={sellerInfo.imageURL}
                            style={{
                              objectFit: "cover",
                              width: 100,
                              height: 100,
                              borderRadius: "50%",
                              border: "1px solid rgba(0,0,0,0.2)"
                            }}
                          />
                          <p
                            style={{
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textAlign: "center",
                              width: 120,
                              color: "rgba(0,0,0,0.8)"
                            }}
                          >
                            @{sellerInfo.username}
                          </p>
                        </Stack>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </Stack>
              <SimpleGrid
                style={{
                  marginTop: "2rem",
                  marginBottom: "2rem",
                  justifyContent: "center"
                }}
                columns={[2, null, 3]}
                // columns={{ xs: 2, sm: 2, md: 3, lg: 3 }}
                maxWidth="1100px"
                spacing="15px"
              >
                {participants.map(participant => (
                  <Stack
                    h={isOnMobile ? "250px" : "400px"}
                    w="100%"
                    bg="#999"
                    borderRadius="15px"
                    position="relative"
                    key={participant.username}
                    style={{
                      boxShadow: "0px 0px 36px 2px rgba(0,0,0,0.12)"
                    }}
                  >
                    <AmazonIVSPreview
                      id={participant.username}
                      // isLive={
                      //   eventData.event.info.status === "live" &&
                      //   eventData.event.info.liveURL
                      // }
                      url={participant.videoURL}
                    />
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
                          size="sm"
                          name={participant.username}
                          src={participant.imageURL}
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
                          @{participant.username}
                        </Text>
                      </Flex>
                      {participant.instagramUrl && (
                        <Pressable
                          onPress={() =>
                            window.open(participant.instagramUrl, "_blank")
                          }
                        >
                          <FiInstagram color="#FFF" size={26} />
                        </Pressable>
                      )}
                    </Flex>
                  </Stack>
                ))}
              </SimpleGrid>
            </Stack>
          </ScrollView>

          <Stack
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
              bottom: "0rem",
              width: "100%",
              padding: "1rem 0.6rem 1rem 0.6rem",
              display: showRegistrationButton ? "flex" : "none"
            }}
            px={isOnMobile ? "1rem" : 0}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, .15)",
                backdropFilter: "blur(5px)"
              }}
            />
            <Button
              style={{
                // backgroundColor: "#121212",
                background: "rgb(63,60,145)",
                background:
                  "linear-gradient(48deg, rgba(63,60,145,1) 0%, rgba(242,67,106,1) 100%)",
                padding: 12,
                flex: 1,
                flexDirection: "column",
                minWidth: isOnMobile ? 250 : 350,
                borderRadius: 10,
                width: "100%"
              }}
              maxW="500px"
              boxShadow="0px 0px 38px -2px rgba(0,0,0,0.62)"
              className="seekr-gradient-on-hover"
              onClick={() => {
                this.setState({ showRegistrationModal: true });
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: 18
                }}
              >
                Rezerva loc
              </Text>
              <Text style={{ color: "#FFF", fontSize: 12, marginTop: 5 }}>
                si primesti livrarea gratis la orice comanda
              </Text>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
