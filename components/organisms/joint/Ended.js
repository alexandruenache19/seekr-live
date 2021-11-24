import React, { Component, useState, useEffect } from "react";
import {
  Stack,
  Avatar,
  Button,
  Text,
  Flex,
  Grid,
  SimpleGrid,
  Box
} from "@chakra-ui/react";
import { Pressable, ScrollView } from "react-native";
import { FiInstagram } from "react-icons/fi";
import AmazonIVSPreview from "../../molecules/seller/AmazonIVSPreview";

export default class JointEventEndedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: []
    };
  }

  async componentDidMount() {
    const { jointEvent } = this.props;

    if (jointEvent && jointEvent.participants) {
      const sortedParticipants = Object.values(jointEvent.participants).sort(
        (a, b) => {
          return a.index - b.index;
        }
      );
      this.setState({ participants: sortedParticipants });
    }
  }

  render() {
    const { participants } = this.state;
    const { isOnMobile, jointEvent } = this.props;
    const { info } = jointEvent;
    console.log(participants);
    return (
      <Stack
        h="100vh"
        w="100vw"
        overflow="scroll"
        position="relative"
        alignItems="center"
        justifyContent="center"
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
                Arunca o privire la magazinele expozantilor
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {participants.map(sellerInfo => {
                  return (
                    <Pressable
                      style={{ marginRight: "1rem" }}
                      onPress={() => {
                        if (sellerInfo.instagramUrl) {
                          window.open(`/${sellerInfo.username}`, "_blank");
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
              maxWidth="1100px"
              spacing="15px"
            >
              {participants.map(participant => (
                <Pressable
                  onPress={() =>
                    window.open(`/${participant.username}`, "_blank")
                  }
                >
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
                </Pressable>
              ))}
            </SimpleGrid>
          </Stack>
        </ScrollView>
      </Stack>
    );
  }
}
