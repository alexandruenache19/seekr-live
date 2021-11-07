import React, { PureComponent } from "react";
import { withRouter } from "next/router";
import { Flex, Stack, Text, Avatar, Center, Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

import { CommentsList } from "../../../components";

class EndedScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.handleFollow = this.handleFollow.bind(this);
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
      username
    } = this.props;

    if (isOnMobile) {
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
                <Flex>
                  <Avatar
                    size="xs"
                    name={sellerInfo.name}
                    src={sellerInfo.imageURL}
                  />
                  <Text
                    ml="0.2em"
                    noOfLines={1}
                    fontSize={10}
                    fontWeight="bold"
                  >
                    @{sellerInfo.username}
                  </Text>
                </Flex>
                <Text style={{ marginTop: 0 }} noOfLines={1} fontSize="sm">
                  {eventInfo.title}
                </Text>
              </Stack>

              <Center>
                <Button
                  bg="#FFF"
                  borderRadius="1em"
                  onClick={this.handleFollow}
                >
                  <FaPlus size={20} />
                </Button>
              </Center>
            </Flex>
          </Flex>
          <Stack
            h="50vh"
            bg="rgba(0,0,0,0.9)"
            borderRadius="xl"
            overflow="hidden"
            position="relative"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="#FFF" fontWeight="bold">
              The event has already ended
            </Text>
          </Stack>
          <Stack
            p="10px"
            h="20vh"
            bg="#EEF2F8"
            borderRadius="xl"
            style={{ justifyContent: "space-between" }}
          >
            <CommentsList comments={comments} />
          </Stack>

          <Stack
            p="10px"
            h="15vh"
            w="100%"
            bg="#EEF2F8"
            borderRadius="xl"
            overflow="hidden"
            style={{ justifyContent: "flex-end" }}
          >
            <Button
              h="100%"
              flexDirection="column"
              shadow="md"
              borderRadius="1em"
              bg="#FFF"
              onClick={this.handleReminderText}
            >
              <FaPlus size={26} />
              <Text fontSize={10} fontWeight="normal" paddingTop="2">
                {`Follow @${sellerInfo.username} for more events`}
              </Text>
            </Button>
          </Stack>
        </Stack>
      );
    }

    return (
      <Flex bg="#FFF" h="100vh" w="100vw" justify="space-between" p={5}>
        <Stack flex={1}>
          <Flex justify="space-between" alignItems="center" p="20px" w="100%">
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
              <Center>
                <Avatar name={sellerInfo.name} src={sellerInfo.imageURL} />

                <Stack ml="10px">
                  <Text fontWeight="bold" fontSize="lg">
                    {eventInfo.title} by @{sellerInfo.username}
                  </Text>
                  <Text color="#718096" fontSize="sm">
                    {sellerInfo.category}
                  </Text>
                </Stack>
              </Center>
            </Flex>
          </Flex>
          <Center
            style={{ marginTop: 0 }}
            p="20px"
            // h="70vh"
            flex={1}
          >
            <Stack
              h="100%"
              w="100%"
              bg="rgba(0,0,0,0.9)"
              borderRadius="xl"
              overflow="hidden"
              position="relative"
              justifyContent="center"
              alignItems="center"
            >
              <Text color="#FFF" fontWeight="bold">
                The event has already ended
              </Text>
            </Stack>
          </Center>
        </Stack>
      </Flex>
    );
  }
}

const styles = {};

export default withRouter(EndedScreen);
