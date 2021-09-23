import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import {
  List,
  ListItem,
  Avatar,
  Flex,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";

const CommentsList = ({ comments }) => {
  const divRef = useRef();

  useEffect(() => {
    if (divRef.current) {
      console.log("hre");
      divRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
  });

  return (
    <List style={{ overflowY: "auto" }} spacing={3} pb="10px">
      {comments.map((comment, i) => (
        <ListItem>
          <Flex justify="flex-start">
            <Avatar size="sm" name={comment.username} />

            <Stack
              p="5px"
              justify="center"
              ml="5px"
              bg="#FFF"
              borderRadius="xl"
            >
              <Text fontWeight="bold" fontSize={12}>
                @{comment.username}
              </Text>
              <Text fontSize={10}>{comment.text}</Text>
            </Stack>
          </Flex>
        </ListItem>
      ))}
      <div ref={divRef}></div>
    </List>
  );
};

const styles = {};

export default CommentsList;
