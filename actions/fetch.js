import firebase from "../firebase/clientApp";

export const getShopProducts = async uid => {
  const snapshot = await firebase
    .database()
    .ref(`users/${uid}/shop/products`)
    .once("value");

  if (snapshot.exists()) {
    const productsObj = snapshot.val();
    return Object.values(productsObj);
  }
  return [];
};

export const getShopOrders = async uid => {
  const snapshot = await firebase
    .database()
    .ref(`users/${uid}/shop/orders`)
    .once("value");

  if (snapshot.exists()) {
    const ordersObj = snapshot.val();
    return Object.values(ordersObj);
  }
  return [];
};

// export const getSpaceItems = async (spaceId) => {
//   const snapshot = await firebase.database().ref(`spaces/${spaceId}/collected`).once('value')
//   if (snapshot.exists()) {
//     const collected = snapshot.val()
//     return collected
//   }
//   return []
// }
//
// export const getCollection= async (spaceId, collectionId) => {
//   const snapshot = await firebase.database().ref(`spaces/${spaceId}/collections/${collectionId}`).once('value')
//   if (snapshot.exists()) {
//     const items = snapshot.val()
//     return items
//   }
//   return {}
// }
//
// export const getItemsFromSpace = async (spaceId, itemsIds) => {
//   const snapshot = await firebase.database().ref(`spaces/${spaceId}/collected`).once('value')
//   const items = []
//   if (snapshot.exists()) {
//     const collected = snapshot.val()
//     for (var i = 0; i < itemsIds.length; i++) {
//       const id = itemsIds[i]
//       const item = collected[id]
//       if (item) {
//         items.push(item)
//       }
//     }
//
//     return items.sort((a, b) => {
//       if (a.timestamp > b.timestamp) {
//         return -1
//       } else {
//         return 1
//       }
//     })
//   }
//   return []
// }
//
// export const getCollections = async (spaceId) => {
//   const snapshot = await firebase.database().ref(`spaces/${spaceId}/collections`).once('value')
//   if (snapshot.exists()) {
//     const collections = Object.values(snapshot.val())
//
//     return collections
//   }
//   return []
// }
//
// export const getSpacesInfo = async (ids) => {
//   const promises = ids.map(async id => {
//     const spaceInfo = await getSpaceInfo(id)
//     return spaceInfo
//   })
//
//   const spaces = await Promise.all(promises)
//
//   return spaces.filter(space => !(space.hasOwnProperty('type') && space.type && space.type === 'private'))
// }
//
// export const getSpaceInfo = async (id) => {
//   const snapshot = await firebase.database().ref(`spaces/${id}/info`).once('value')
//   if (snapshot.exists()) {
//     return snapshot.val()
//   }
//   return null
// }
