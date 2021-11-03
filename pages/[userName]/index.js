import React, { PureComponent } from "react";
import { withRouter } from "next/router";
import { Center, Spinner, Text, Avatar, Stack } from "@chakra-ui/react";

import { getUser, getUserId } from "../../actions/auth";

import EventPage from "../e/[id]";

class UserPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentEventId: null
    };
  }

  componentDidMount() {
    const { userProfile } = this.props;
    if (userProfile && userProfile.events && userProfile.events.current) {
      this.setState({ currentEventId: userProfile.events.current });
    }
  }

  render() {
    const { currentEventId } = this.state;
    const { isOnMobile, userProfile } = this.props;
    console.log(userProfile);
    if (currentEventId) {
      return <EventPage eventId={currentEventId} isOnMobile={isOnMobile} />;
    } else {
      return (
        <Stack justifyContent="center" alignItems="center" h="100vh">
          <Center>
            <Avatar src={userProfile.info.imageURL} size="xl" />
            <Text style={{ fontWeight: "bold", fontSize: 30 }}>
              {`${userProfile.info.username}`}
            </Text>
          </Center>
          <Text style={{ fontSize: 20 }}>The live event has already ended</Text>
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
