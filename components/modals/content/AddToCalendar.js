import { useState } from "react";
import {
  Center,
  List,
  ListItem,
  Text,
  useDisclosure,
  useToast
} from "@chakra-ui/react";

const CalendarModalContent = props => {
  //props = {data: array of  options }
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <List>
      {props.data.map((link, i) => (
        <ListItem key={i} p="10px">
          <Text>{link}</Text>
        </ListItem>
      ))}
    </List>
  );
};

export default CalendarModalContent;
