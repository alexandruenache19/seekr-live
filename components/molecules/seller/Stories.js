import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Pressable } from "react-native";
import { Flex, Button, Stack } from "@chakra-ui/react";
import { FaRegPaperPlane } from "react-icons/fa";
import AmazonIVSPreview from "./AmazonIVSPreview";
const Stories = ({ events }) => {
  return (
    <Flex
      borderRadius="20px"
      overflowX="scroll"
      style={{
        justifyContent: "flex-start"
      }}
    >
      {events.map(eventData => {
        return (
          <Pressable
            style={{ marginRight: 10 }}
            onPress={() => console.log("here")}
          >
            <Stack
              h="160px"
              width="90px"
              bg="#999"
              borderRadius="15px"
              key={eventData.event.id}
            >
              <AmazonIVSPreview
                id={eventData.event.id}
                url={
                  eventData.event.info.status === "live" &&
                  eventData.event.info.liveURL
                    ? eventData.event.info.liveURL
                    : eventData.event.info.videoURL
                }
              />
            </Stack>
          </Pressable>
        );
      })}
    </Flex>
  );
};

const styles = {};

export default Stories;
