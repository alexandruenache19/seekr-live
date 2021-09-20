import { useState } from "react";
import { Center, useDisclosure, useToast } from "@chakra-ui/react";

const NotifyModalContent = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  return <Center />;
};

export default NotifyModalContent;
