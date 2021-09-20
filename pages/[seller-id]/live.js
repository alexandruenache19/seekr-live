import React, { PureComponent } from "react";
import { withRouter } from "next/router";
import {
  Flex,
  Stack,
  Text,
  Avatar,
  List,
  Center,
  Input,
  ListItem,
  Button
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import Lottie from "react-lottie";
import {
  FaShareSquare,
  FaRegPaperPlane,
  FaPlus,
  FaMinus,
  FaArrowRight,
  FaHeart
} from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { AiFillTags } from "react-icons/ai";

import * as animationData from "./live.json";

class LiveScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOrder = this.handleOrder.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
  }

  handleOrder() {
    this.props.onOpenModal("order", {});
  }

  handleShare() {
    this.props.onOpenModal("share", {});
  }
  handleFollow() {
    this.props.onOpenModal("follow", {});
  }
  render() {
    if (this.props.isOnMobile) {
      return (
        <Stack h="100vh" w="100vw" p="10px" bg="#FFF">
          <Flex h="10vh" justify="space-between" alignItems="center">
            <Text p="10px" fontWeight="bold" fontSize="sm">
              seekr.
            </Text>
            <Flex
              flex={1}
              bg="#F2F4F9"
              p="10px"
              borderRadius="xl"
              overflow="hidden"
              justify="space-between"
            >
              <Stack justify="space-between">
                <Text noOfLines={2} fontSize={10}>
                  Summer sale by Maria das das
                </Text>
              </Stack>

              <Center>
                <Button
                  bg="#FFF"
                  borderRadius="1em"
                  onClick={this.handleFollow}
                >
                  <Text fontSize={10} pr="5px">
                    Follow
                  </Text>
                  <FaPlus size={20} />
                </Button>
                <Button
                  ml="0.2em"
                  borderRadius="1em"
                  bg="#FFF"
                  onClick={this.handleShare}
                  o
                >
                  <FaShareSquare size={20} />
                </Button>
              </Center>
            </Flex>
          </Flex>
          <Stack
            h="50vh"
            bg="rgba(0,0,0,0.9)"
            borderRadius="xl"
            overflow="hidden"
          >
            <ReactPlayer
              // className="react-player"
              url={"https://event-preview.s3.amazonaws.com/file.name"}
              width="100%"
              height="100%"
              playing
              loop
            />

            <Center
              position="absolute"
              left="20px"
              borderRadius="xl"
              p="10px"
              bg="#FFF"
            >
              <Avatar
                size="sm"
                name="Alex getInitialProps"
                src="https://bit.ly/tioluwani-kolawole"
              />

              <Stack justify="center" pl="5px">
                <Text fontWeight="bold" fontSize={12}>
                  @maria
                </Text>
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
                      22
                    </Text>
                  </Center>
                </Flex>
              </Stack>
            </Center>
          </Stack>
          <Stack
            p="10px"
            h="25vh"
            bg="#EEF2F8"
            borderRadius="xl"
            style={{ justifyContent: "space-between" }}
          >
            <List overflow="scroll" spacing={3} pb="10px">
              <ListItem>
                <Flex justify="flex-start">
                  <Avatar
                    name="Alex getInitialProps"
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                  <Stack
                    p="5px"
                    justify="center"
                    ml="5px"
                    bg="#FFF"
                    borderRadius="xl"
                  >
                    <Text fontSize={12} fontWeight="bold">
                      @remus
                    </Text>
                    <Text fontSize={10}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </Text>
                  </Stack>
                </Flex>
              </ListItem>
            </List>

            <Flex
              borderRadius="xl"
              p="10px"
              bg="#FFF"
              style={{ justifyContent: "space-between", marginTop: 0 }}
            >
              <Input placeholder="write your message..." />
              <Button style={{ marginLeft: 10 }}>
                <FaRegPaperPlane size="22" />
              </Button>
            </Flex>
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
            <Center
              w="100%"
              p="10px"
              bg="#FFF"
              style={{ justifyContent: "space-between" }}
            >
              <Flex w="100px" justify="space-between">
                <Button size="sm">
                  <FaMinus size={14} />
                </Button>
                <Text fontSize="xl">1</Text>
                <Button size="sm">
                  <FaPlus size={14} />
                </Button>
              </Flex>

              <Center>
                <Text fontSize={22}>50</Text>
                <Text fontWeight="light" fontSize={8}>
                  $
                </Text>
              </Center>

              <Button
                style={{ marginLeft: 10, justifyContent: "space-between" }}
                onClick={this.handleOrder}
              >
                <Text pr="10px">Buy</Text>
                <FaArrowRight size={14} />
              </Button>
            </Center>
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
                <Text fontWeight="bold" fontSize="lg">
                  Summer sale by @maria
                </Text>
                <Text color="#718096" fontSize="sm">
                  Cosemtics
                </Text>
              </Stack>

              <Center>
                <Button
                  h="3em"
                  shadow="md"
                  borderRadius="1.5em"
                  bg="#FFF"
                  onClick={this.handleFollow}
                >
                  <Text pr="5px">Follow</Text>
                  <FaPlus size={26} />
                </Button>
                <Button
                  // w="3em"
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
          <Center p="20px" pt="0px" pb="0px" h="70vh" w="100%">
            <Stack
              h="100%"
              w="100%"
              bg="rgba(0,0,0,0.9)"
              borderRadius="xl"
              overflow="hidden"
            >
              <ReactPlayer
                // className="react-player"
                url={"https://event-preview.s3.amazonaws.com/file.name"}
                width="100%"
                height="100%"
                playing
                loop
              />
              <Flex
                position="absolute"
                left="40px"
                top="130px"
                borderRadius="xl"
                p="10px"
                bg="#FFF"
                styles={{ justifyContent: "center", alignItems: "center" }}
              >
                <Avatar
                  name="Alex getInitialProps"
                  src="https://bit.ly/tioluwani-kolawole"
                />
                <Stack justify="center" pl="5px">
                  <Text fontWeight="bold">@maria</Text>
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
                        22
                      </Text>
                    </Center>
                  </Flex>
                </Stack>
              </Flex>
            </Stack>
          </Center>

          <Center p="20px" h="15vh" w="100%">
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
                    22 in stock
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
                    22$
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
                  <Button size="sm">
                    <FaMinus size={14} />
                  </Button>
                  <Text px="10px" fontSize="xl">
                    1
                  </Text>
                  <Button size="sm">
                    <FaPlus size={14} />
                  </Button>
                </Flex>
                <Center>
                  <Text fontSize={22}>50</Text>
                  <Text fontWeight="light" fontSize={8}>
                    $
                  </Text>
                </Center>
                <Button onClick={this.handleOrder}>
                  <Text pr="10px">Buy Product</Text>
                  {/*<FaArrowRight size={14} />*/}
                </Button>
              </Center>
            </Flex>
          </Center>
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
              Chat with Maria
            </Text>
            <List pb="10px" overflow="scroll" spacing={3}>
              <ListItem>
                <Flex justify="flex-start">
                  <Avatar
                    name="Alex getInitialProps"
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                  <Stack
                    p="10px"
                    justify="center"
                    ml="5px"
                    bg="#FFF"
                    borderRadius="xl"
                  >
                    <Text color="#000" fontWeight="bold">
                      @remus
                    </Text>
                    <Text margin="0px" color="#000">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </Text>
                  </Stack>
                </Flex>
              </ListItem>
            </List>
            <Flex
              borderRadius="xl"
              p="10px"
              bg="#FFF"
              style={{ justifyContent: "space-between", marginTop: 0 }}
            >
              <Input placeholder="write your message..." />
              <Button style={{ marginLeft: 10 }}>
                <FaRegPaperPlane size="22" />
              </Button>
            </Flex>
          </Stack>
        </Center>
      </Flex>
    );
  }
}

const styles = {};

export default withRouter(LiveScreen);
