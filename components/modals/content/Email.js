import { useState } from "react";
import {
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  PhoneIcon,
  Button,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { FiMail } from "react-icons/fi";

const EmailModalContent = ({ onClose }) => {
  const toast = useToast();

  function handleSubmit() {
    toast({
      title: "Done.",
      description: "You will get an email 5 minutes before the event starts",
      status: "success",
      duration: 9000,
      isClosable: true
    });

    onClose();
  }

  return (
    <Center>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<FiMail color="gray.300" />}
        />
        <Input type="mail" placeholder="Email" />
      </InputGroup>
      <Button onClick={handleSubmit} ml="10px" variant="outline">
        Submit
      </Button>
    </Center>
  );
};

export default EmailModalContent;
