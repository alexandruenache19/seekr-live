import { useState, forwardRef, useImperativeHandle } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Center,
  useDisclosure
} from "@chakra-ui/react";

import {
  OrderModalContent,
  CalendarModalContent,
  ShareModalContent,
  FollowModalContent,
  NotifyModelContent,
  TextModalContent,
  EmailModalContent
} from "./content";

const title = {
  share: "Share this event",
  calendar: "Add Event to Your Calendar",
  notify: "Reminder",
  text: "Get a text 5 min before",
  email: "Get an email 5 min before",
  order: "Complete order",
  follow: "Follow"
};

const renderContent = (type, props) => {
  switch (type) {
    case "share":
      return <ShareModalContent {...props} />;
    case "calendar":
      return <CalendarModalContent {...props} />;
    case "notify":
      return <NotifyModelContent {...props} />;
    case "text":
      return <TextModalContent {...props} />;
    case "email":
      return <EmailModalContent {...props} />;
    case "follow":
      return <FollowModalContent {...props} />;
    case "order":
      return <OrderModalContent {...props} />;
    default:
  }
};

const CustomModal = ({ openAuthModal, isOnMobile }, ref) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [type, setType] = useState("");
  const [props, setProps] = useState({});
  useImperativeHandle(ref, () => ({
    openModal(type, props) {
      setType(type);
      setProps(props);
      onOpen();
    }
  }));

  return (
    <Modal motionPreset="scale" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={30} {...styles}>
        <ModalHeader>{title[type]}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>{renderContent(type, { ...props, isOnMobile })}</Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const styles = {};

export default forwardRef(CustomModal);
