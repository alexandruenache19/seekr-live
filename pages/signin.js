import React, { PureComponent, useState } from "react";
import { Button, Flex, Stack, Text, Spinner } from "@chakra-ui/react";
import { useUser } from "../context/userContext";
import PhoneInput from "react-phone-input-2";
import ReactCodeInput from "react-verification-code-input";
import "react-phone-input-2/lib/bootstrap.css";

import firebase from "../firebase/clientApp";
import { useRouter } from "next/router";

export const SignInComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const auth = useUser();

  const router = useRouter();
  // auth.signOut();
  if (auth.user) {
    router.push("/");
  }
  if (auth.loadingUser) {
    return (
      <Flex bg="#FFF" w="100vw" h="100vh" justify="center" align="center">
        <Spinner size="xl" thickness="3px" />
      </Flex>
    );
  }

  if (auth.hasCode) {
    return (
      <Stack w="100vw" h="100vh" alignItems="center" justifyContent="center">
        <Stack>
          <ReactCodeInput value={code} onChange={code => setCode(code)} />;
          <Button colorScheme="cyan" onClick={() => auth.verifyCode(code)}>
            <Text style={{ color: "#FFFFFF" }}>Verify</Text>
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Stack>
        <PhoneInput
          country={"ro"}
          value={phoneNumber}
          onChange={phone => setPhoneNumber(phone)}
        />

        <Button colorScheme="cyan" onClick={() => auth.sendCode(phoneNumber)}>
          <Text style={{ color: "#FFFFFF" }}>Sign In</Text>
        </Button>
      </Stack>
    </Stack>
  );
};

export default class SignIn extends PureComponent {
  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      this.recaptcha,
      {
        size: "invisible",
        callback: function(response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        "expired-callback": function() {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      }
    );
    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
  }
  render() {
    return (
      <div>
        <div ref={ref => (this.recaptcha = ref)}></div>
        <SignInComponent />
      </div>
    );
  }
}
