import React from "react";
import moment from "moment";
import { Flex, Button, Stack, Text } from "@chakra-ui/react";

class Countdown extends React.Component {
  state = {
    seconds: 0
  };

  componentDidMount() {
    var t = new Date();
    t.setSeconds(t.getSeconds() + 60);
    this.interval = setInterval(() => {
      const then = moment(t);
      const now = moment();
      const countdown = moment(then - now);
      const seconds = countdown.format("ss");

      this.setState({ seconds });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { seconds } = this.state;

    return (
      <Flex>
        <Text style={{ color: "#FFF", marginRight: 2 }}>{seconds}</Text>
      </Flex>
    );
  }
}

export default Countdown;
