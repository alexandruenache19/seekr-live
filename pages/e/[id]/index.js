import React, { Component } from "react";
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

class EventPage extends Component {
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

    this.refreshListener = firebase
      .database()
      .ref(`/events/${eventId}/info/refresh`)
      .on('value', async snapshot => {
        if (snapshot.exists() && snapshot.val() === true) {
          window.location.reload()
        }
      })

    this.eventInfoListener = firebase
      .database()
      .ref(`/events/${eventId}/info`)
      .on("value", async snapshot => {
        const eventInfo = snapshot.val();
        const liveStatus = false;
        if (eventInfo && eventInfo.sellerId && !this.state.sellerInfo) {
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

  componentWillUnmount() {
    const { eventId } = this.props
    this.refreshListener && firebase
      .database()
      .ref(`/events/${eventId}/info/refresh`)
      .off('value', this.refreshListener)

    this.eventInfoListener && firebase
      .database()
      .ref(`/events/${eventId}/info`)
      .off('value', this.eventInfoListener)

    this.commentsListener && firebase
      .database()
      .ref(`/events/${eventId}/comments`)
      .off('value', this.commentsListener)
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

    if (eventInfo.status === "scheduled") {
      return (
        <EventScreen
          isOnMobile={isOnMobile}
          onOpenModal={this.handleOpenModal}
          sellerInfo={sellerInfo}
          eventInfo={eventInfo}
          comments={comments}
          username={username}
          handleGoBack={this.props.handleGoBack}
        />
      );
    } else if (
      eventInfo.status === "live" &&
      eventInfo.hasOwnProperty("liveURL")
    ) {
      return (
        <LiveScreen
          isOnMobile={isOnMobile}
          events={this.props.events}
          onOpenModal={this.handleOpenModal}
          sellerInfo={sellerInfo}
          eventInfo={eventInfo}
          comments={comments}
          username={username}
          name={this.props.name}
          phoneNumber={this.props.phoneNumber}
          addressLine1={this.props.addressLine1}
          {...this.props}
        />
      );
    } else if (
      eventInfo.status === "live" &&
      !eventInfo.hasOwnProperty("liveURL")
    ) {
      return (
        <EventScreen
          isOnMobile={isOnMobile}
          onOpenModal={this.handleOpenModal}
          sellerInfo={sellerInfo}
          eventInfo={eventInfo}
          comments={comments}
          username={username}
          handleGoBack={this.props.handleGoBack}
        />
      );
    } else {
      return (
        <EndedScreen
          isOnMobile={isOnMobile}
          onOpenModal={this.handleOpenModal}
          sellerInfo={sellerInfo}
          eventInfo={eventInfo}
          comments={comments}
          username={username}
          handleGoBack={this.props.handleGoBack}
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
