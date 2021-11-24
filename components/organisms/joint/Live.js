import React, { Component, useState, useEffect } from "react";
import { Stack, Text, Spinner, Flex, Center } from "@chakra-ui/react";
import { ScrollView } from "react-native";
import firebase from "../../../firebase/clientApp";

import { Modal, LiveScreen } from "../../";

import { getEvent, getSellerInfo } from "../../../fetchData/getData";

export default class JoinEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      comments: [],
      events: [],
      participants: [],
      eventId: null,
      globalMuted: true,
      secondsRemaining: null,
      sellerInfo: {},
      eventInfo: {},
      username: "",
      /** for fast ordering */
      name: props.name || null,
      phoneNumber: props.phoneNumber || null,
      addressLine1: props.addressLine1 || null
    };

    this.handleGetSetEvent = this.handleGetSetEvent.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handelCallback = this.handelCallback.bind(this);
  }

  async componentDidMount() {
    const { jointEvent } = this.props;

    await firebase
      .database()
      .ref(`joint-events/${jointEvent.info.id}/info/currentLiveUserId`)
      .on("value", async snapshot => {
        if (snapshot.exists()) {
          this.setState({ loading: true }, async () => {
            const currentEventIdSnap = await firebase
              .database()
              .ref(`users/${snapshot.val()}/events/current`)
              .once("value");

            if (currentEventIdSnap.exists()) {
              const currentEventId = currentEventIdSnap.val();
              const eventInfoSnap = await firebase
                .database()
                .ref(`/events/${currentEventId}/info`)
                .once("value");
              if (eventInfoSnap.exists()) {
                const eventInfo = eventInfoSnap.val();
                const sellerInfo = await getSellerInfo(eventInfo.sellerId);
                this.setState({
                  loading: false,
                  sellerInfo: sellerInfo,
                  eventInfo: eventInfo
                });
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
                      comments: comments
                    });
                  });
              }
            }
          });
        }
      });

    await firebase
      .database()
      .ref(`joint-events/${jointEvent.info.id}/info/secondsRemaining`)
      .on("value", async snapshot => {
        if (snapshot.exists()) {
          this.setState({
            secondsRemaining: snapshot.val()
          });
        }
      });

    await firebase
      .database()
      .ref(`joint-events/${jointEvent.info.id}/info/refresh`)
      .on("value", async snapshot => {
        if (snapshot.exists() && snapshot.val() === true) {
          window.location.reload();
        }
      });

    if (jointEvent && jointEvent.participants) {
      const events = [];
      const sortedParticipants = Object.values(jointEvent.participants).sort(
        (a, b) => {
          return a.index - b.index;
        }
      );

      for (const participant of sortedParticipants) {
        const uid = participant.uid;
        /** get current event */
        const currentEventSn = await firebase
          .database()
          .ref(`users/${uid}/events/current`)
          .once("value");
        if (currentEventSn.exists()) {
          const eventId = currentEventSn.val();
          const eventData = await getEvent(eventId);
          const sellerInfo = await getSellerInfo(eventData.info.sellerId);
          this.setState({
            events: this.state.events.concat({
              event: eventData,
              sellerInfo: sellerInfo
            })
          });
        }
      }
    } else {
      this.setState({
        loading: false
      });
    }
  }

  handleGetSetEvent(eventId) {
    this.setState(
      {
        eventId: null
      },
      () => {
        const nextURL = `/e/${eventId}`;
        const nextTitle = "My new page title";
        const nextState = { additionalInformation: "Updated the URL with JS" };

        if (window && window.history) {
          // This will create a new entry in the browser's history, without reloading
          window.history.pushState(nextState, nextTitle, nextURL);
          // This will replace the current entry in the browser's history, without reloading
          window.history.replaceState(nextState, nextTitle, nextURL);
        }

        this.setState({
          eventId: eventId
        });
      }
    );
  }

  handleOpenModal(type, props) {
    this.modal.openModal(type, props);
  }

  handelCallback(data) {
    if (data.type && data.type === "comment") {
      this.setState({ username: data.text });
    }
  }

  render() {
    const {
      loading,
      events,
      eventId,
      participants,
      sellerInfo,
      comments,
      eventInfo,
      username,
      secondsRemaining
    } = this.state;
    const { isOnMobile, jointEvent } = this.props;
    if (loading) {
      return (
        <Stack w="100vw" h="100vh" justifyContent="center" alignItems="center">
          <Spinner color="#121212" size="md" />
        </Stack>
      );
    }
    return (
      <Center>
        <Modal
          callback={this.handelCallback}
          ref={ref => (this.modal = ref)}
          isOnMobile={isOnMobile}
        />
        <LiveScreen
          events={events}
          onOpenModal={this.handleOpenModal}
          sellerInfo={sellerInfo}
          eventInfo={eventInfo}
          comments={comments}
          username={username}
          isOnMobile={isOnMobile}
          secondsRemaining={secondsRemaining}
          name={this.props.name}
          phoneNumber={this.props.phoneNumber}
          addressLine1={this.props.addressLine1}
          participants={participants}
          eventId={eventInfo.id}
          isOnMobile={isOnMobile}
          handleGetSetEvent={this.handleGetSetEvent}
          handleGoBack={() => this.setState({ eventId: null })}
        />
      </Center>
    );
  }
}
