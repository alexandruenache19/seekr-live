import React, { Component, useState, useEffect } from "react";
import { Stack, Spinner } from "@chakra-ui/react";

import { getJointEvent } from "../../actions/fetch";
import router from "next/router";

import JointEventEndedPage from "../../components/organisms/joint/Ended";
import JointEventScheduledPage from "../../components/organisms/joint/Scheduled";
import JointEventLivePage from "../../components/organisms/joint/Live";

export default class JoinEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      /** for fast ordering */
      name: "",
      phoneNumber: "",
      addressLine1: ""
    };
  }

  componentDidMount() {
    this.setState({
      name: router.query.n,
      phoneNumber: router.query.p,
      addressLine1: router.query.a,
      loading: false
    });
  }

  render() {
    const { loading } = this.state;
    const { isOnMobile, jointEvent } = this.props;
    const { info } = jointEvent;

    if (loading) {
      return (
        <Stack w="100vw" h="100vh" justifyContent="center" alignItems="center">
          <Spinner color="#121212" size="md" />
        </Stack>
      );
    }

    switch (info.status) {
      case "scheduled":
        return (
          <JointEventScheduledPage
            isOnMobile={isOnMobile}
            jointEvent={jointEvent}
          />
        );
      case "ended":
        return (
          <JointEventEndedPage
            isOnMobile={isOnMobile}
            jointEvent={jointEvent}
          />
        );
      case "live":
        return (
          <JointEventLivePage isOnMobile={isOnMobile} jointEvent={jointEvent} />
        );
      default:
        return <Stack></Stack>;
    }
  }
}

export const getServerSideProps = async context => {
  let { jointEventId } = context.params;
  const jointEvent = await getJointEvent(jointEventId);

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
      jointEvent: jointEvent,
      jointEventId: jointEventId,
      isOnMobile: isOnMobile
    }
  };
};
