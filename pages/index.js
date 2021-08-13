import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Stack,
  Flex,
  Text,
  Link,
  Image,
  useToast,
  Input,
  Button,
  Spinner,
  SimpleGrid
} from "@chakra-ui/react";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin
} from "react-icons/fa";
import * as emailjs from "emailjs-com";
import { isMobile } from "react-device-detect";
import { motion, useAnimation } from "framer-motion";

const MotionButton = motion(Button);

const randomDuration = () => Math.random() * 0.07 + 0.23;

const variants = {
  start: {
    rotate: [-1, 1.2, 0],
    scale: [1, 1.4, 1],
    transition: {
      repeat: 3,
      duration: randomDuration()
    }
  },
  reset: {
    rotate: 0
  }
};
// Adauga dosarele la care lucrezi si noi ne
// ocupam de restul.
export default function Home({}) {
  const [email, setEmail] = useState("");
  const [isOnMobile, setMobile] = useState();
  const [loading, setLoading] = useState(true);
  const [complete, setComplete] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setMobile(isMobile);
    setLoading(false);
  }, [setMobile]);
  const controls = useAnimation();

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
        bg="#FFFEF3"
        justifyContent="space-between"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Text style={styles.mobileLogo}>jurist</Text>
          <Button
            onClick={() => {
              controls.start("start");
            }}
            style={styles.button}
          >
            3 luni gratis!
          </Button>
        </Flex>

        <Stack justifyContent="center" alignItems="center">
          <Image
            w="60%"
            h="25%"
            objectFit="cover"
            position="absolute"
            top="100"
            src="/technology.png"
          />
          <Image
            w="50%"
            h="25%"
            objectFit="cover"
            position="absolute"
            top="220"
            left="2em"
            src="/support.png"
          />
          <Image
            w="50%"
            h="25%"
            objectFit="cover"
            position="absolute"
            top="220"
            right="2em"
            src="/data.png"
          />
        </Stack>

        <Stack>
          <Stack style={{ paddingBottom: 50 }}>
            <Text style={styles.mobileLarge}>
              Informaţiile de care ai nevoie in instanţa
            </Text>
            <Text style={styles.mobileNormal}>
              Obtine access la informaţiile de care ai nevoie in instanţa in
              doar cateva secunde. Înscrie-te pe lista de așteptare pentru a
              descarca aplicatia și primești 3 luni gratis!
            </Text>
          </Stack>

          <Link href="https://alexandruenache.typeform.com/to/DgSFPoWy">
            <MotionButton
              variants={variants}
              animate={controls}
              style={{ ...styles.button, width: "100%" }}
            >
              Înscrie-mă pe lista!
            </MotionButton>
          </Link>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack
      w="100vw"
      minH="100vh"
      h="100%"
      bg="#FFFEF3"
      pt="50px"
      pb="100px"
      pl="135px"
      pr="135px"
      style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
      bgImage="url('/bg2.png')"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text
          style={{
            fontWeight: 700,
            fontSize: 24,
            lineHeight: "1.3em",
            fontFamily: "Poppins"
          }}
        >
          jurist.
        </Text>
        <Text
          style={{
            fontWeight: 400,
            fontSize: 12,
            lineHeight: "1.3em",
            fontFamily: "Poppins"
          }}
        >
          Înscrie-te pe lista de așteptare pentru a descarca aplicatia și
          primești 3 luni gratis!
        </Text>
        <Button
          onClick={() => {
            controls.start("start");
          }}
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            backgroundColor: "#000",
            color: "#FFF",
            marginLeft: "5px"
          }}
        >
          3 luni gratis!
        </Button>
      </Flex>

      <Flex
        flex="1"
        justifyContent="space-between"
        pt="50px"
        alignItems="center"
      >
        <Stack w="70%" h="100%" justifyContent="space-between">
          <Stack pt="4em">
            <Text
              style={{
                width: "80%",
                fontWeight: 600,
                fontSize: 16,
                lineHeight: "1.5em",
                fontFamily: "Poppins"
              }}
            >
              ━━━ Pentru avocaţi, juriști, judecatori
            </Text>
            <Text
              style={{
                width: "60%",
                fontWeight: 800,
                fontSize: 55,
                lineHeight: "1.2em",
                fontFamily: "Poppins",
                paddingTop: 20
              }}
            >
              Informaţiile de care ai nevoie in instanţa
            </Text>
            <Text
              style={{
                width: "60%",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "1.5em",
                fontFamily: "Poppins",
                paddingTop: 20
              }}
            >
              Gasește informaţiile de care ai nevoie in instanţa in doar cateva
              secunde. Înscrie-te pe lista de așteptare pentru a descarca
              aplicatia și primești 3 luni gratis!
            </Text>
          </Stack>
          <Flex w="80%" pt={"4em"}>
            <Link href="https://alexandruenache.typeform.com/to/DgSFPoWy">
              <MotionButton
                variants={variants}
                animate={controls}
                style={styles.button}
              >
                Înscrie-mă pe lista!
              </MotionButton>
            </Link>
          </Flex>
        </Stack>
        <Image
          w="25%"
          h="40%"
          objectFit="cover"
          position="absolute"
          bottom="350"
          right="150"
          zIndex="0"
          src="/technology.png"
          alt="logo"
        />

        <Image
          w="25%"
          h="50%"
          objectFit="cover"
          position="absolute"
          bottom="100"
          zIndex="1"
          right="300"
          src="/support.png"
          alt="logo"
        />
        <Image
          w="25%"
          h="50%"
          objectFit="cover"
          position="absolute"
          bottom="100"
          right="100"
          zIndex="1"
          src="/data.png"
          alt="logo"
        />
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
    lineHeight: "1.5em"
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
