import React, { PureComponent } from "react";
import { withRouter } from "next/router";
import { Center, Spinner } from "@chakra-ui/react";

import { Modal, LiveScreen, EventScreen } from "../../../components";

import { getSeller, getEvent } from "../../../fetchData/getData";
import firebase from "../../../firebase/clientApp";

const MODAL = {
  comment: "comment",
  follow: "follow",
  share: "share",
  order: "order",
  calendar: "calendar",
  email: "email",
  text: "text"
};

class SellerProfile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isOnMobile: false,
      isLive: false,
      comments: [],
      username: ""
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handelCallback = this.handelCallback.bind(this);
  }

  componentDidMount() {
    const { eventInfo } = this.props;
    this.commentsListener = firebase
      .database()
      .ref(`/events/${eventInfo.id}/comments`)
      .orderByChild("timestamp")
      .limitToLast(20)
      .on("value", snapshot => {
        const comments = [];
        snapshot.forEach(commentSnapshot => {
          const comment = commentSnapshot.val();
          comments.push(comment);
        });
        this.setState({
          comments: comments,
          loading: false,
          isOnMobile: window.innerWidth <= 780,
          isLive: false
        });
      });
  }

  handleOpenModal(type, props) {
    this.modal.openModal(type, props);
  }

  handelCallback(data) {
    if (data.type === "comment") {
      this.setState({ username: data.text });
    }
  }
  render() {
    const { isOnMobile, sellerInfo, eventInfo } = this.props;
    const { loading, isLive, comments, username } = this.state;

    if (loading) {
      return (
        <Center bg="#FFF" w="100vw" h="100vh">
          <Spinner size="xl" thickness="3px" />
        </Center>
      );
    }

    return (
      <Center>
        <Modal
          callback={this.handelCallback}
          ref={ref => (this.modal = ref)}
          isOnMobile={isOnMobile}
        />

        {isLive ? (
          <LiveScreen
            isOnMobile={isOnMobile}
            onOpenModal={this.handleOpenModal}
            sellerInfo={sellerInfo}
            eventInfo={eventInfo}
            comments={comments}
            username={username}
          />
        ) : (
          <EventScreen
            isOnMobile={isOnMobile}
            onOpenModal={this.handleOpenModal}
            sellerInfo={sellerInfo}
            eventInfo={eventInfo}
            comments={comments}
            username={username}
          />
        )}
      </Center>
    );
  }
}

export const getServerSideProps = async context => {
  const { id } = context.params;
  const seller = await getSeller(id);
  const eventId = seller.events ? seller.events.current : null;
  let eventInfo;

  if (eventId) {
    eventInfo = await getEvent(eventId);
  }

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

  return { props: { eventInfo, id, sellerInfo: seller.info, isOnMobile } };
};

const styles = {};

export default withRouter(SellerProfile);
