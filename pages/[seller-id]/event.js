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
import AddToCalendarHOC from "react-add-to-calendar-hoc";
import {
  FaShareSquare,
  FaRegPaperPlane,
  FaPlus,
  FaMinus,
  FaArrowRight,
  FaHeart
} from "react-icons/fa";
import { FiShare, FiEye } from "react-icons/fi";
import {
  BiCalendarHeart,
  BiTimeFive,
  BiMailSend,
  BiCalendarPlus,
  BiMessageSquareDots
} from "react-icons/bi";
import moment from "moment";

class EventScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.handleReminder = this.handleReminder.bind(this);
    this.handleReminderText = this.handleReminderText.bind(this);
    this.handleReminderEmail = this.handleReminderEmail.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  handleShare() {
    this.props.onOpenModal("share", {});
  }
  handleReminder() {
    this.props.onOpenModal("notify", {});
  }

  handleReminderText() {
    this.props.onOpenModal("text", {});
  }

  handleReminderEmail() {
    this.props.onOpenModal("email", {});
  }
  render() {
    const { isOnMobile } = this.props;
    const startDatetime = moment()
      .utc()
      .add(2, "days");
    const endDatetime = startDatetime.clone().add(2, "hours");
    const duration = moment.duration(endDatetime.diff(startDatetime)).asHours();
    const event = {
      description: "Cosmetics sale on Seekr",
      duration: duration,
      endDatetime: endDatetime.format("YYYYMMDDTHHmmssZ"),
      startDatetime: startDatetime.format("YYYYMMDDTHHmmssZ"),
      title: "Summer Sale by @maria"
    };

    const Modal = args => {
      this.props.onOpenModal("calendar", { data: args.children });
      return <Center />;
    };

    const MobileButton = args => (
      <Button
        flexDirection="column"
        h="3em"
        shadow="md"
        borderRadius="1em"
        onClick={args.onClick}
        bg="#FFF"
      >
        <BiCalendarPlus size={26} />
        <Text fontSize={10} fontWeight="normal">
          {args.children}
        </Text>
      </Button>
    );
    const WebButton = args => (
      <Button
        onClick={args.onClick}
        h="3em"
        shadow="md"
        borderRadius="1.5em"
        bg="#FFF"
      >
        <a>{args.children}</a>
        <Center pl="5px">
          <BiCalendarPlus size={26} />
        </Center>
      </Button>
    );

    const AddToCalendarComp = AddToCalendarHOC(
      isOnMobile ? MobileButton : WebButton,
      Modal
    );

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
                    name="Alex getInitialProps"
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                  <Text
                    ml="0.2em"
                    noOfLines={1}
                    fontSize={10}
                    fontWeight="bold"
                  >
                    @maria
                  </Text>
                </Flex>
                <Text style={{ marginTop: 0 }} noOfLines={1} fontSize="sm">
                  Summer sale
                </Text>
              </Stack>

              <Center>
                <Button
                  bg="#FFF"
                  borderRadius="1em"
                  onClick={this.handleReminder}
                >
                  <FaPlus size={20} />
                </Button>
                <Button
                  ml="0.2em"
                  borderRadius="1em"
                  bg="#FFF"
                  onClick={this.handleShare}
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
          </Stack>
          <Stack
            p="10px"
            h="20vh"
            bg="#EEF2F8"
            borderRadius="xl"
            style={{ justifyContent: "space-between" }}
          >
            <List overflow="scroll" spacing={3} pb="10px">
              <ListItem>
                <Flex justify="flex-start">
                  <Avatar
                    size="sm"
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
                    <Text fontWeight="bold" fontSize={12}>
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

          <Stack
            p="10px"
            h="15vh"
            w="100%"
            bg="#EEF2F8"
            borderRadius="xl"
            overflow="hidden"
            style={{ justifyContent: "space-between" }}
          >
            <Text fontWeight="bold" fontSize={20} textAlign="center">
              Choose your reminder
            </Text>
            <Center>
              <AddToCalendarComp event={event} />
              <Button
                h="3em"
                ml="10px"
                flexDirection="column"
                shadow="md"
                borderRadius="1em"
                bg="#FFF"
                onClick={this.handleReminderEmail}
              >
                <BiMailSend size={26} />
                <Text fontSize={10} fontWeight="normal">
                  Email me
                </Text>
              </Button>

              <Button
                h="3em"
                ml="10px"
                flexDirection="column"
                shadow="md"
                borderRadius="1em"
                bg="#FFF"
                onClick={this.handleReminderText}
              >
                <BiMessageSquareDots size={26} />
                <Text fontSize={10} fontWeight="normal">
                  Text me
                </Text>
              </Button>
            </Center>
          </Stack>
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
              <Center>
                <Avatar
                  name="Alex getInitialProps"
                  src="https://bit.ly/tioluwani-kolawole"
                />
                <Stack ml="10px">
                  <Text fontWeight="bold" fontSize="lg">
                    Summer sale by @maria
                  </Text>
                  <Text color="#718096" fontSize="sm">
                    Cosemtics
                  </Text>
                </Stack>
              </Center>

              <Center>
                <Button
                  h="3em"
                  shadow="md"
                  borderRadius="1.5em"
                  bg="#FFF"
                  onClick={this.handleReminder}
                >
                  <a style={{ paddingRight: "5px" }}>Remind me</a>
                  <FaPlus size={26} />
                </Button>
                <Button
                  h="3em"
                  shadow="md"
                  ml="1em"
                  borderRadius="1.5em"
                  bg="#FFF"
                  onClick={this.handleShare}
                >
                  <a style={{ paddingRight: "5px" }}>Share</a>
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

              <Center position="absolute" top="130" left="30">
                <Center
                  ml="10px"
                  borderRadius="xl"
                  p="10px"
                  bg="#FFF"
                  justifyContent="space-between"
                >
                  <BiCalendarHeart size={30} />
                  <Text pl="6px" color="#000" fontWeight="bold" fontSize="xl">
                    Sunday, 22 Sep
                  </Text>
                </Center>
                <Center
                  ml="10px"
                  borderRadius="xl"
                  p="10px"
                  bg="#FFF"
                  justifyContent="space-between"
                >
                  <BiTimeFive size={30} />
                  <Text pl="6px" color="#000" fontWeight="bold" fontSize="xl">
                    22:00
                  </Text>
                </Center>
              </Center>
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
              style={{
                justifyContent: "center",
                marginTop: 0,
                alignItems: "center"
              }}
            >
              <AddToCalendarComp event={event} />

              <Button
                h="3em"
                ml="10px"
                shadow="md"
                borderRadius="1.5em"
                bg="#FFF"
                onClick={this.handleReminderEmail}
              >
                <a>Notify me via email</a>
                <Center pl="5px">
                  <BiMailSend size={26} />
                </Center>
              </Button>

              <Button
                h="3em"
                ml="10px"
                shadow="md"
                borderRadius="1.5em"
                bg="#FFF"
                onClick={this.handleReminderText}
              >
                <a>Text me 5 min before</a>
                <Center pl="5px">
                  <BiMessageSquareDots size={26} />
                </Center>
              </Button>
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
              Ask a question before the event
            </Text>
            <List pb="10px" overflow="scroll" spacing={3}></List>
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

export default withRouter(EventScreen);
