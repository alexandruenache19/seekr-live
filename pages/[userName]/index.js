import React, { PureComponent, useEffect, useState } from "react";
import { withRouter } from "next/router";
import { Pressable } from "react-native";

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
      loading: true
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
  }

  render() {
    const { currentEventId } = this.state;
    const { isOnMobile, userProfile } = this.props;
    if (currentEventId) {
      return <EventPage eventId={currentEventId} isOnMobile={isOnMobile} />;
    } else {
      return (
        <Stack style={{ marginTop: "3rem" }}>
          <Stack justifyContent="center" alignItems="center">
            <Avatar src={userProfile.info.imageURL} size="xl" />
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {`@${userProfile.info.username}`}
            </Text>
          </Stack>
          <ShopItems
            isOnMobile={isOnMobile}
            products={
              userProfile.shop && userProfile.shop.products
                ? Object.values(userProfile.shop.products)
                : []
            }
            sellerInfo={userProfile.info}
            showOrderButton
          />
          ;
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
