import { useState } from "react";
import {
  Flex,
  Modal,
  Button,
  Stack,
  Text,
  Link,
  Box,
  Center,
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

const ShareButton = ({ child, text, isOnMobile, ...rest }) => (
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

const ShareModalContent = ({ isOnMobile, username, onClose, ...rest }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const iconSize = isOnMobile ? "2em" : "3em";
  const url = `https://joinSeekr.com/u/${username}`;

  return (
    <Stack {...rest}>
      <Flex justify="Center" align="center">
        <CopyToClipboard
          text={url}
          onCopy={() => {
            toast({
              title: "Copied!",
              status: "success",
              duration: 2000,
              isClosable: false
            });
            onClose();
          }}
        >
          <Center cursor="pointer">
            <Text
              style={{
                fontSize: 18,
                backgroundColor: "#999",
                padding: 10,
                borderRadius: 10,
                marginRight: 10
              }}
            >
              {url}
            </Text>
            <FiLink size={26} />
          </Center>
        </CopyToClipboard>
      </Flex>
      <Flex justify="space-between" align="center">
        <ShareButton
          child={
            <TwitterShareButton title="A snippet via @snippet_club" url={url}>
              <FiTwitter size={iconSize} />
            </TwitterShareButton>
          }
          text="Twitter"
          isOnMobile={isOnMobile}
        />
        {/*  <ShareButton
            child={<FiInstagram size={iconSize} />}
            text="Instagram"
            isOnMobile={isOnMobile}
          />*/}

        <ShareButton
          child={
            <FacebookShareButton url={url}>
              <FiFacebook size={iconSize} />
            </FacebookShareButton>
          }
          text="Facebook"
          isOnMobile={isOnMobile}
        />
        <ShareButton
          isOnMobile={isOnMobile}
          child={
            <TelegramShareButton url={url}>
              <FaTelegramPlane size={iconSize} />
            </TelegramShareButton>
          }
          text="Telegram"
        />
        {/*  <ShareButton
            child={
              <LinkedinShareButton url={url}>
                <FiLinkedin size={iconSize} />
              </LinkedinShareButton>
            }
            text="LinkedIn"
            isOnMobile={isOnMobile}
          />*/}
        <ShareButton
          isOnMobile={isOnMobile}
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

export default ShareModalContent;
