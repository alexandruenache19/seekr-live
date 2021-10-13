// import admin from '../firebase/nodeApp'
import firebase from '../firebase/clientApp'

export const getSeller = async uid => {
  const snapshot = await firebase
    .database()
    .ref(`users/${uid}`)
    .once('value')

  if (snapshot.exists()) {
    return snapshot.val()
  }

  return null
}

export const getSellerInfo = async uid => {
  const snapshot = await firebase
    .database()
    .ref(`users/${uid}/info`)
    .once('value')

  if (snapshot.exists()) {
    return snapshot.val()
  }

  return null
}

export const getEvent = async id => {
  const snapshot = await firebase
    .database()
    .ref(`events/${id}`)
    .once('value')

  if (snapshot.exists()) {
    return snapshot.val()
  }

  return null
}

export const getEventInfo = async id => {
  const snapshot = await firebase
    .database()
    .ref(`events/${id}/info`)
    .once('value')

  if (snapshot.exists()) {
    return snapshot.val()
  }

  return null
}

export const getProductInfo = async (eventId, productId) => {
  const snapshot = await firebase
    .database()
    .ref(`events/${eventId}/products/${productId}`)
    .once('value')

  return snapshot.val()
}

export const addOrder = async (eventId, orderData) => {
  /**
     * add order in events/eventId/orders/orderId
     * decrease stock in events/eventId/products/productId
     */

  await firebase
    .database()
    .ref(`events/${eventId}/orders/${orderData.phoneNumber}`)
    .update({
      info: {
        id: orderData.phoneNumber,
        address: orderData.address,
        addressDetails: orderData.addressDetails,
        name: orderData.name,
        phoneNumber: orderData.phoneNumber,
        status: 'pending'
      }
    })

  const ref = await firebase
    .database()
    .ref(`events/${eventId}/orders/${orderData.phoneNumber}/products`)
    .push()

  ref.set({
    id: ref.key,
    priceToPay: orderData.priceToPay,
    productId: orderData.productId,
    quantity: orderData.quantity,
    currency: orderData.currency,
    imageURL: orderData.imageURL || null,
    isPacked: false
  })
  // .update({
  //   [orderData.phoneNumber]: orderData
  // })

  const currentStockRef = await firebase
    .database()
    .ref(`events/${eventId}/products/${orderData.productId}/currentStock`)

  await currentStockRef.transaction((current) => {
    if ((current || 0) >= 1 && orderData.quantity) {
      return (current || 0) - orderData.quantity
    }
  })
}
