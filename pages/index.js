import Head from "next/head";
import { useEffect, useState } from "react";
import { Stack, Flex, Text, Image, Button, Spinner } from "@chakra-ui/react";

import Link from "next/link";
import { isMobile } from "react-device-detect";

// {
//   "hosting": {
//     "public": "out",
//     "ignore": [
//       "firebase.json",
//       "**/.*",
//       "**/node_modules/**"
//     ]
//   }
// }

export default function Home({}) {
  const [isOnMobile, setMobile] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMobile(isMobile);
    setLoading(false);
  }, [setMobile]);

  if (loading) {
    return (
      <Stack
        w="100vw"
        h="100vh"
        justifyContent="center"
        alignItems="center"
        bg="#FFFEF3"
      >
        <Spinner color="red.500" size="xl" />
      </Stack>
    );
  }

  if (isOnMobile) {
    return (
      <Stack
        w="100vw"
        h="100vh"
        p="2em"
        bg="#F0F0F0"
        justifyContent="space-between"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Text style={styles.mobileLogo}>seekr.</Text>
          <a
            className="left"
            target="_blank"
            href="https://alexandruenache.typeform.com/to/XHmwEQ8j"
          >
            Join Waitlist
          </a>
        </Flex>

        <Image src="./technology.png" alt="logo" />
        <Stack>
          <Text style={styles.mobileLarge}>Buy & Sell products live</Text>
          {/*  <Text style={styles.mobileNormal}>Sell products live</Text>*/}
        </Stack>
        <Link href="https://alexandruenache.typeform.com/to/XHmwEQ8j">
          <Button style={styles.button}>Join Waitlist!</Button>
        </Link>
      </Stack>
    );
  }

  return (
    <Stack
      w="100vw"
      minH="100vh"
      h="100%"
      bg="#F0F0F0"
      pt="50px"
      pb="50px"
      pl="135px"
      pr="135px"
      justifyContent="space-between"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text style={styles.bold}>seekr.</Text>

        <a
          className="left"
          target="_blank"
          href="https://alexandruenache.typeform.com/to/XHmwEQ8j"
        >
          Join Waitlist
        </a>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center">
        <Stack width="50%">
          <Text style={styles.semiBold}>━━━ Cosmetics, clothes and more </Text>
          <Text>
            <Text style={styles.largeBold}>Buy & Sell products live</Text>
          </Text>
          {/*    <Text style={styles.normal}>Sell products live</Text>*/}
        </Stack>

        <Image w="50%" h="100%" src="/technology.png" alt="logo" />
      </Flex>

      <Flex alignItems="center">
        <Link href="https://alexandruenache.typeform.com/to/XHmwEQ8j">
          <Button style={styles.button}>Join Waitlist!</Button>
        </Link>
      </Flex>
    </Stack>
  );
}

const styles = {
  bold: {
    fontWeight: 800,
    fontSize: 24,
    color: "#081c15",
    lineHeight: "1.3em",
    fontFamily: "Poppins"
  },
  normal: {
    fontSize: 16,
    lineHeight: "1.5em",
    width: "70%"
  },
  mobileNormal: {
    fontSize: 16,
    lineHeight: "1.5em",
    textAlign: "center",
    paddingTop: 10
  },
  mobileLarge: {
    fontWeight: 800,
    fontSize: 30,
    lineHeight: "1.2em",
    textAlign: "center"
  },
  mobileLogo: {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: "1.3em"
  },
  semiBold: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: "1.5em"
  },
  webContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  largeNormal: {
    fontSize: 55,
    lineHeight: "1.2em"
  },
  largeBold: {
    fontWeight: 800,
    fontSize: 55,
    lineHeight: "1.2em"
  },
  button: {
    backgroundColor: "#081c15",
    color: "#FFF"
  }
};
