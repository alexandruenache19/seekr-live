import React from "react";
import moment from "moment";
import { Flex, Button, Stack, Text } from "@chakra-ui/react";

function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (
    ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
}

class Countdown2 extends React.Component {
  state = {
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const { timeTillDate, timeFormat } = this.props;
      const then = moment(timeTillDate, timeFormat);
      const now = moment();
      const countdown = moment(then - now);
      const days = countdown.format('D');
      const hours = countdown.format('HH');
      const minutes = countdown.format('mm');
      const seconds = countdown.format('ss');
      this.setState({ days, hours, minutes, seconds });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;

    // Mapping the date values to radius values
    const daysRadius = mapNumber(days, 30, 0, 0, 360);
    const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
    const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
    const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

    if (!seconds) {
      return null;
    }

    return (
      <Flex className="countdown-wrapper" align='center' style={{ marginTop: '1rem' }}>
        {/* <Text fontWeight='bold' color='#FFFFFF' fontSize='26px' lineHeight={1}>Suntem live in</Text> */}
        {days && (
          <Stack align='center' className="countdown-item" mr='10px'>
            <Text fontWeight='bold' color='#FFFFFF' fontSize='36px' lineHeight={1}>{days}</Text>
            <Text style={{ marginTop: 0 }} color='#FFFFFF' fontSize={15}>zile</Text>
          </Stack>
        )}
        {hours && (
          <Stack align='center' className="countdown-item" mr='10px'>
            <Text fontWeight='bold' color='#FFFFFF' fontSize='36px' lineHeight={1}>{hours}</Text>
            <Text style={{ marginTop: 0 }} color='#FFFFFF' fontSize={15}>ore</Text>
          </Stack>
        )}
        {minutes && (
          <Stack align='center' className="countdown-item" mr='10px'>
            <Text fontWeight='bold' color='#FFFFFF' fontSize='36px' lineHeight={1}>{minutes}</Text>
            <Text style={{ marginTop: 0 }} color='#FFFFFF' fontSize={15}>minute</Text>
          </Stack>
        )}
        {seconds && (
          <Stack align='center' className="countdown-item" mr='10px'>
            <Text fontWeight='bold' color='#FFFFFF' fontSize='36px' lineHeight={1}>{seconds}</Text>
            <Text style={{ marginTop: 0 }} color='#FFFFFF' fontSize={15}>secunde</Text>
          </Stack>
        )}
      </Flex>
    );
  }
}

class Countdown extends React.Component {
  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  componentDidMount() {
    const { timeTillDate, timeFormat } = this.props;
    const then = moment(timeTillDate, timeFormat);
    const now = moment();
    const countdown = moment(then - now);
    const days = countdown.format('D');
    const hours = countdown.format('HH');
    const minutes = countdown.format('mm');
    const seconds = countdown.format('ss');

    this.setState({ days, hours, minutes, seconds });

    this.interval = setInterval(() => {
      const then = moment(timeTillDate, timeFormat);
      const now = moment();
      const countdown = moment(then - now);
      const days = countdown.format('D');
      const hours = countdown.format('HH');
      const minutes = countdown.format('mm');
      const seconds = countdown.format('ss');

      this.setState({ days, hours, minutes, seconds });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;
    const { isOnMobile } = this.props

    // Mapping the date values to radius values
    const daysRadius = mapNumber(days, 30, 0, 0, 360);
    const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
    const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
    const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

    if (!seconds) {
      return null;
    }

    return (
      <Stack flexDir={isOnMobile ? 'column' : 'row'} align='flex-start' className="countdown-wrapper" style={{ marginTop: '1rem' }}>
        <Flex>
          {days && (
            <div className="countdown-item">
              <SVGCircle radius={daysRadius} />
              {days}
              <span>zile</span>
            </div>
          )}
          {hours && (
            <div className="countdown-item">
              <SVGCircle radius={hoursRadius} />
              {hours}
              <span>ore</span>
            </div>
          )}
        </Flex>
        <Flex>
          {minutes && (
            <div className="countdown-item">
              <SVGCircle radius={minutesRadius} />
              {minutes}
              <span>minute</span>
            </div>
          )}
          {seconds && (
            <div className="countdown-item">
              <SVGCircle radius={secondsRadius} />
              {seconds}
              <span>secunde</span>
            </div>
          )}
        </Flex>
      </Stack>
    );
  }
}

const SVGCircle = ({ radius }) => (
  <svg className="countdown-svg">
    <path
      fill="none"
      stroke="rgba(255,255,255,0.8)"
      stroke-width="4"
      d={describeArc(50, 50, 48, 0, radius)}
    />
  </svg>
);

// From StackOverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  var d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y
  ].join(' ');

  return d;
}

export default Countdown
