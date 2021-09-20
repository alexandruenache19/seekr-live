import React, { PureComponent } from "react";
import { withRouter } from "next/router";
import { Center, Spinner } from "@chakra-ui/react";

import { Modal } from "../../components";

import LiveScreen from "./live";
import EventScreen from "./event";

const MODAL = {
  notify: "notify",
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
      isLive: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: false,
      isOnMobile: window.innerWidth <= 780,
      isLive: false
    });
  }

  handleOpenModal(type, props) {
    this.modal.openModal(type, props);
  }

  render() {
    const { loading, isOnMobile, isLive } = this.state;

    if (loading) {
      return (
        <Center bg="#FFF" w="100vw" h="100vh">
          <Spinner size="xl" thickness="3px" />
        </Center>
      );
    }

    return (
      <Center>
        <Modal ref={ref => (this.modal = ref)} isOnMobile={isOnMobile} />
        {isLive ? (
          <LiveScreen
            isOnMobile={isOnMobile}
            onOpenModal={this.handleOpenModal}
          />
        ) : (
          <EventScreen
            isOnMobile={isOnMobile}
            onOpenModal={this.handleOpenModal}
          />
        )}
      </Center>
    );
  }
}

SellerProfile.getInitialProps = async context => {
  try {
    const sellerId = context.query["seller-id"];
    return {};
  } catch (e) {
    return {};
  }
};

const styles = {};

export default withRouter(SellerProfile);
