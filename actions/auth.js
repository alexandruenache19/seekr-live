import firebase from '../firebase/clientApp'

export const getUser = async (uid) => {
  const snapshot = await firebase.database().ref(`users/${uid}`).once('value')

  if (snapshot.exists()) {
    return snapshot.val()
  }
  return null
}

export const updateFirebaseUser = async (user) => {
  const snapshot = await firebase.database().ref(`users/${user.uid}`).once('value')
  if (!snapshot.exists()) {
    firebase
      .database()
      .ref(`users/${user.uid}`)
      .set({
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        dateRegistered: new Date(),
        finishOnboarding: false
      })
  }
}
