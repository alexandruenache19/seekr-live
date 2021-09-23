import admin from "../firebase/nodeApp";

export const getSeller = async uid => {
  const snapshot = await admin
    .database()
    .ref(`users/${uid}`)
    .once("value");

  if (snapshot.exists()) {
    return snapshot.val();
  }

  return null;
};

export const getEvent = async id => {
  const snapshot = await admin
    .database()
    .ref(`events/${id}/info`)
    .once("value");

  if (snapshot.exists()) {
    return snapshot.val();
  }

  return null;
};
