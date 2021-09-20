import { useState } from "react";
import { Center, useDisclosure, useToast } from "@chakra-ui/react";

const OrderModalContent = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  return <Center />;
};

export default OrderModalContent;
