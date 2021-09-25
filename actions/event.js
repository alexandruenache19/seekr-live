import firebase from '../firebase/clientApp'

// const auth = firebase.auth();
const databaseRef = firebase.database().ref()
const usersRef = databaseRef.child('users')
const eventsRef = databaseRef.child('events')

export const addComment = async (comment, eventId) => {
  eventsRef.child(`${eventId}/comments`).push({
    ...comment,
    timestamp: new Date()
  })
}
