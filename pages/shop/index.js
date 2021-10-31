import React, { PureComponent, useEffect, useState } from "react";
import { Stack, Button, Text, Spinner, Flex, Grid } from "@chakra-ui/react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import firebase from "../../firebase/clientApp";
import { useRouter } from "next/router";
import axios from "axios";

import { useUser } from "../../context/userContext";
import { FetchingActions } from "../../actions";
import GenerateNewProduct from "../p/index";

const { getShopProducts } = FetchingActions;
export const SignInComponent = () => {
  const auth = useUser();
  const { user } = auth;
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const products = await getShopProducts(user.uid);
  });

  if (auth.loadingUser) {
    return (
      <Flex bg="#FFF" w="100vw" h="100vh" justify="center" align="center">
        <Spinner color="#121212" size="md" />
      </Flex>
    );
  }

  return (
    <Stack
      w="100vw"
      h="100vh"
      style={{
        justifyContent: "'flex-start'",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 40
      }}
    >
      <GenerateNewProduct uid={user.uid} />
      <Grid
        style={{ marginTop: "2rem" }}
        w="100%"
        templateColumns="repeat(3, 1fr)"
        gap={6}
      >
        {products.map(post => (
          <Box w="100%" h="250" bg="#999">
            <img
              src={imgSrc}
              style={{ width: "100%", objectFit: "cover", height: "100%" }}
            />
          </Box>
        ))}
      </Grid>
    </Stack>
  );
};

export default class ShopScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      loading,
      isAvailable,
      paymentUrl,
      product,
      paidProduct
    } = this.state;

    return <SignInComponent />;
  }
}

const styles = {};

export const getServerSideProps = async context => {
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
      isOnMobile
      // query: router.query
    }
  };
};
