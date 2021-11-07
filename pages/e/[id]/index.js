import React, { PureComponent } from "react";
import { withRouter } from "next/router";
import { Center, Spinner } from "@chakra-ui/react";

import {
  Modal,
  LiveScreen,
  EventScreen,
  EndedScreen
} from "../../../components";

import {
  getSeller,
  getEvent,
  getEventInfo,
  getSellerInfo
} from "../../../fetchData/getData";
import { addComment } from "../../../actions/event";
import firebase from "../../../firebase/clientApp";

class EventPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isOnMobile: false,
      status: "scheduled",
      comments: [],
      username: "",
      evetInfo: null,
      sellerInfo: null
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handelCallback = this.handelCallback.bind(this);
    this.renderScreen = this.renderScreen.bind(this);
  }

  componentDidMount() {
    const { eventId } = this.props;

    this.eventInfoListener = firebase
      .database()
      .ref(`/events/${eventId}/info`)
      .on("value", async snapshot => {
        const eventInfo = snapshot.val();
        const liveStatus = false;
        if (eventInfo.sellerId && !this.state.sellerInfo) {
          const sellerInfo = await getSellerInfo(eventInfo.sellerId);
          this.setState({ sellerInfo: sellerInfo });
        }

        this.setState({
          eventInfo: eventInfo
        });
      });

    this.commentsListener = firebase
      .database()
      .ref(`/events/${eventId}/comments`)
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
          isOnMobile: window.innerWidth <= 780
        });
      });
  }

  handleOpenModal(type, props) {
    this.modal.openModal(type, props);
  }

  handelCallback(data) {
    if (data.type && data.type === "comment") {
      this.setState({ username: data.text });
    }
  }

  renderScreen() {
    const { isOnMobile } = this.props;
    const {
      loading,
      isLive,
      comments,
      username,
      eventInfo,
      sellerInfo,
      currentProductId
    } = this.state;
    switch (eventInfo.status) {
      case "scheduled":
        return (
          <EventScreen
            isOnMobile={isOnMobile}
            onOpenModal={this.handleOpenModal}
            sellerInfo={sellerInfo}
            eventInfo={eventInfo}
            comments={comments}
            username={username}
          />
        );
      case "live":
        return (
          <LiveScreen
            isOnMobile={isOnMobile}
            onOpenModal={this.handleOpenModal}
            sellerInfo={sellerInfo}
            eventInfo={eventInfo}
            comments={comments}
            username={username}
          />
        );
      case "ended":
        return (
          <EndedScreen
            isOnMobile={isOnMobile}
            onOpenModal={this.handleOpenModal}
            sellerInfo={sellerInfo}
            eventInfo={eventInfo}
            comments={comments}
            username={username}
          />
        );
      default:
        return (
          <EventScreen
            isOnMobile={isOnMobile}
            onOpenModal={this.handleOpenModal}
            sellerInfo={sellerInfo}
            eventInfo={eventInfo}
            comments={comments}
            username={username}
          />
        );
    }
  }

  render() {
    const { isOnMobile } = this.props;
    const {
      loading,
      isLive,
      comments,
      username,
      eventInfo,
      sellerInfo,
      currentProductId
    } = this.state;

    if (loading || !eventInfo || !sellerInfo) {
      return (
        <Center bg="#FFF" w="100vw" h="100vh">
          <Spinner color="#121212" size="md" />
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
        {this.renderScreen()}
      </Center>
    );
  }
}

export const getServerSideProps = async context => {
  const { id } = context.params;

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

  return { props: { eventId: id, isOnMobile } };
};

const styles = {};

export default withRouter(EventPage);
