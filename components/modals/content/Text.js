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
import { FiPhone } from "react-icons/fi";

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
          children={<FiPhone color="gray.300" />}
        />
        <Input type="tel" placeholder="Phone number" />
      </InputGroup>
      <Button ml="10px" onClick={handleSubmit} variant="outline">
        Submit
      </Button>
    </Center>
  );
};

export default EmailModalContent;
