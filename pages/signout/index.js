import React, { PureComponent, useState } from "react";
import { Button, Flex, Stack, Text, Spinner } from "@chakra-ui/react";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";

export const SignOutComponent = () => {
  const auth = useUser();
  const router = useRouter();

  if (auth.loadingUser) {
    return (
      <Flex bg="#FFF" w="100vw" h="100vh" justify="center" align="center">
        <Spinner color="#121212" size="md" />
      </Flex>
    );
  }

  if (!auth.user) {
    router.push("/signin");
  }

  return (
    <Stack w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Stack>
        <Button colorScheme="cyan" onClick={auth.signOut}>
          <Text style={{ color: "#FFFFFF" }}>Sign Out</Text>
        </Button>
      </Stack>
    </Stack>
  );
};

export default class SignIn extends PureComponent {
  render() {
    return <SignOutComponent />;
  }
}
