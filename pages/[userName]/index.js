import React, { PureComponent, useEffect, useState } from "react";
import { withRouter } from "next/router";
import { Pressable } from "react-native";
import { FiInstagram } from "react-icons/fi";
import { getUser, getUserId } from "../../actions/auth";

import EventPage from "../e/[id]";
import ShopItems from "../../components/molecules/profile/ShopItems";

import {
  Stack,
  Avatar,
  Button,
  Text,
  Spinner,
  Flex,
  Box
} from "@chakra-ui/react";

class UserPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentEventId: null,
      loading: true,
      globalMuted: true,
      products: []
    };
  }

  componentDidMount() {
    const { userProfile } = this.props;
    if (userProfile && userProfile.events && userProfile.events.current) {
      this.setState({
        currentEventId: userProfile.events.current,
        loading: false
      });
    }
    if (userProfile.shop && userProfile.shop.products) {
      this.setState({ products: Object.values(userProfile.shop.products) });
    }
  }

  render() {
    const { currentEventId, products } = this.state;
    const { isOnMobile, userProfile } = this.props;
    if (currentEventId) {
      return (
        <EventPage
          eventId={currentEventId}
          isOnMobile={isOnMobile}
          setGlobalMuted={bool => this.setState({ globalMuted: bool })}
          globalMuted={this.state.globalMuted}
        />
      );
    } else {
      return (
        <Stack
          style={{
            paddingTop: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <Stack justifyContent="center" alignItems="center">
            <Avatar src={userProfile.info.imageURL} size="xl" />
            <Flex justify="center" alignItems="center">
              <Pressable
                onPress={() =>
                  window.open(userProfile.info.instagramUrl, "_blank")
                }
              >
                <FiInstagram color="#000" size={26} />
              </Pressable>
              <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 5 }}>
                {`@${userProfile.info.username}`}
              </Text>
            </Flex>
          </Stack>

          {products.length !== 0 ? (
            <ShopItems
              isOnMobile={isOnMobile}
              products={products}
              sellerInfo={userProfile.info}
              showOrderButton
            />
          ) : (
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Other events are coming.
            </Text>
          )}
          <Stack />
        </Stack>
      );
    }
  }
}

export const getServerSideProps = async context => {
  const { userName } = context.params;

  const uid = await getUserId(userName);
  const userProfile = await getUser(uid);

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

  return { props: { userProfile: userProfile, isOnMobile } };
};

const styles = {};

export default withRouter(UserPage);
