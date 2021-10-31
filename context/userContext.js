import { useState, useEffect, createContext, useContext } from "react";
import firebase from "../firebase/clientApp";
import { useToast } from "@chakra-ui/react";

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);
  const [hasCode, setHasCode] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async user => {
      try {
        if (user) {
          const { uid, displayName, email, photoURL } = user;
          setUser({ uid, displayName, email, photoURL });
        } else setUser(null);
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  const sendCode = async phoneNumber => {
    setLoadingUser(true);
    try {
      window.confirmationResult = await firebase
        .auth()
        .signInWithPhoneNumber(`+${phoneNumber}`, window.recaptchaVerifier);
      setHasCode(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingUser(false);
    }
  };

  const verifyCode = async enteredCode => {
    setLoadingUser(true);
    try {
      if (window.confirmationResult) {
        // verify code against auth result
        firebase
          .auth()
          .signInWithCredential(
            firebase.auth.PhoneAuthProvider.credential(
              window.confirmationResult.verificationId,
              enteredCode
            )
          );
      } else {
        throw new Error("SMS code cannot be verified. Please try again.");
      }
    } catch (err) {}
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        hasCode,
        loadingUser,
        sendCode,
        verifyCode,
        signOut
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext);
