import { useState } from "react";
import {
  Center,
  List,
  ListItem,
  Text,
  useDisclosure,
  useToast
} from "@chakra-ui/react";

const CalendarModalContent = ({ data, onClose, callback }) => {
  const toast = useToast();
  function handleSubmit() {
    toast({
      title: "Done",
      description: "You will get an email 5 minutes before the event starts",
      status: "success",
      duration: 19000,
      isClosable: true
    });

    onClose();
    callback();
  }

  return (
    <Center>
      <List>
        {data.map((link, i) => (
          <ListItem key={i} p="10px">
            <Text onClick={handleSubmit}>{link}</Text>
          </ListItem>
        ))}
      </List>
    </Center>
  );
};

export default CalendarModalContent;
