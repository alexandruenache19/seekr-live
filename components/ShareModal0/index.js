import { useState, forwardRef, useImperativeHandle } from "react";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  SlideIn,
  Button,
  Stack,
  Text,
  Link,
  Box,
  useDisclosure,
  useToast
} from "@chakra-ui/react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  TelegramShareButton,
  FacebookMessengerShareButton
} from "react-share";
import { AiOutlineReddit } from "react-icons/ai";
import { FaTelegramPlane, FaFacebookMessenger } from "react-icons/fa";
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiLink,
  FiLinkedin,
  FiDownload,
  FiYoutube
} from "react-icons/fi";

const ShareButton = ({ child, text, isOnMobile, item, ...rest }) => (
  <Stack
    m={2}
    w={isOnMobile ? "20%" : "6em"}
    position="relative"
    justify="center"
    align="center"
    // onClick={() =>
    //
    // }
    {...rest}
  >
    <Box
      d="flex"
      w="100%"
      flexDir="column"
      h={!isOnMobile && "6em"}
      shadow={!isOnMobile && "md"}
      borderRadius="3em"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      bg="#FFF"
      color="#000"
      cursor="pointer"
    >
      {child}
    </Box>
    {!isOnMobile && <Text fontSize="sm">{text}</Text>}
  </Stack>
);

const ShareContent = ({ auth, item, openAuthModal, isOnMobile, ...rest }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const iconSize = isOnMobile ? "2em" : "3em";
  const url = `https://snippet.club/snippet/${item.id}`;

  return (
    <Stack {...rest}>
      <Flex justify="space-between" align="center">
        <ShareButton
          child={
            <TwitterShareButton title="A snippet via @snippet_club" url={url}>
              <FiTwitter size={iconSize} />
            </TwitterShareButton>
          }
          item={item}
          text="Twitter"
          isOnMobile={isOnMobile}
        />
        <ShareButton
          child={<FiInstagram size={iconSize} />}
          text="Instagram"
          isOnMobile={isOnMobile}
        />
        <ShareButton
          child={
            <FacebookShareButton url={url}>
              <FiFacebook size={iconSize} />
            </FacebookShareButton>
          }
          item={item}
          text="Facebook"
          isOnMobile={isOnMobile}
        />
        <ShareButton
          child={
            <LinkedinShareButton url={url}>
              <FiLinkedin size={iconSize} />
            </LinkedinShareButton>
          }
          item={item}
          text="LinkedIn"
          isOnMobile={isOnMobile}
        />
      </Flex>
      <Flex justify="space-between" align="center">
        <ShareButton
          isOnMobile={isOnMobile}
          item={item}
          child={
            <RedditShareButton url={url}>
              <AiOutlineReddit size={iconSize} />
            </RedditShareButton>
          }
          text="Reddit"
        />

        <ShareButton
          isOnMobile={isOnMobile}
          item={item}
          child={
            <TelegramShareButton url={url}>
              <FaTelegramPlane size={iconSize} />
            </TelegramShareButton>
          }
          text="Telegram"
        />

        <ShareButton
          isOnMobile={isOnMobile}
          item={item}
          child={
            <CopyToClipboard
              text={url}
              onCopy={() =>
                toast({
                  title: "Copied!",
                  status: "success",
                  duration: 1000,
                  isClosable: false
                })
              }
            >
              <FiLink size={iconSize} />
            </CopyToClipboard>
          }
          text="Copy Link"
        />

        <ShareButton
          isOnMobile={isOnMobile}
          item={item}
          child={
            <FacebookMessengerShareButton appId={1190712697719040} url={url}>
              <FaFacebookMessenger size={iconSize} />
            </FacebookMessengerShareButton>
          }
          text="Messenger"
        />
      </Flex>
    </Stack>
  );
};

const ShareModal = ({ title, item, openAuthModal, isOnMobile }, ref) => {
  const { onClose, onOpen, isOpen } = useDisclosure();

  useImperativeHandle(ref, () => ({
    openModal() {
      onOpen();
    }
  }));

  return (
    <Modal
      enableBodyScroll={false}
      disableBodyScroll={false}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size={"2xl"}
    >
      <ModalOverlay />
      <ModalContent
        p={8}
        borderRadius={30}
        justify="center"
        align="center"
        {...styles}
      >
        <ModalHeader
          fontSize={22}
          fontWeight="bold"
          color="#000"
          d="flex"
          justifyContent="center"
          mb="1rem"
        >
          {title || "Share this snippet"}
        </ModalHeader>
        <ModalBody p={isOnMobile && "0px"}>
          <Flex align="center" justify="center">
            <ShareContent
              isOnMobile={isOnMobile}
              w="100%"
              item={item}
              openAuthModal={openAuthModal}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const styles = {
  loadingIcon: {
    fontSize: 30,
    color: "#FFFFFF"
  },
  loadingDiv: {
    zIndex: 1000,
    backdropFilter: "blur(6px)",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    background: "rgba(0,0,0,0.3)",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
};

export default forwardRef(ShareModal);
