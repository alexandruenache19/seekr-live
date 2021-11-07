import React, { useEffect, useState } from "react";

import {
  Stack,
  Avatar,
  Button,
  Text,
  Flex,
  SimpleGrid,
  Box,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useClipboard
} from "@chakra-ui/react";
import { Pressable } from "react-native";
import { FiPlus } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { OrderModalContent } from "../../../components/modals/content";

const ShopItems = ({ isOnMobile, products, initialProduct, sellerInfo }) => {
  const [isModalOpen, setOpenModal] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [showCompleteAddress, setShowCompleteAddress] = useState(false);

  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  useEffect(() => {
    var currentTotal = 0;
    if (currentProducts) {
      for (var i = 0; i < currentProducts.length; i++) {
        const prod = currentProducts[i];
        currentTotal += prod.price;
      }
      setTotalOrder(currentTotal);
    }
  }, [currentProducts]);

  function addProductToCard(product) {
    const newCart = currentProducts.concat(product);
    setCurrentProducts(newCart);
  }

  async function handlePlaceOrder(details) {
    console.log(details);
    console.log(currentProducts);
    console.log(totalOrder);
  }

  return (
    <Stack
      maxWidth="850"
      style={{
        padding: "3rem 1rem",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}
    >
      {scrollTop > 100 && (
        <Button
          position="fixed"
          bottom="2rem"
          style={{
            backgroundColor: "#121212",
            padding: 20,
            zIndex: 10,
            minWidth: isOnMobile ? 250 : 350,
            justifyContent: "space-between"
          }}
          boxShadow="0px 0px 38px -2px rgba(0,0,0,0.62)"
          className="seekr-gradient-on-hover"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <Text style={{ color: "#FFFFFF" }}>Comanda ta</Text>
          <Flex justifyContent="center" alignItems="center">
            <Text style={{ color: "#FFFFFF" }}>
              {totalOrder} {initialProduct.currency || "RON"}
            </Text>
            <FaArrowRight color="#FFF" style={{ marginLeft: 10 }} />
          </Flex>
        </Button>
      )}

      <SimpleGrid
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          position: "relative"
        }}
        columns={{ sm: 2, md: 3, lg: 3 }}
        spacing="20px"
      >
        {products.map(product => (
          <Box
            w="100%"
            h="250px"
            bg="#999"
            borderRadius="15px"
            position="relative"
            key={product.id}
          >
            {product.quantity <= 0 ? (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.45)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 15
                }}
              >
                <Text color="#FFFFFF">Out of stock</Text>
              </div>
            ) : (
              <div
                className="product-layer"
                onClick={() =>
                  (window.location.href = `https://seekrlive.com/p/${product.id}`)
                }
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",

                  borderRadius: 15
                }}
              >
                <Stack py="6px" px="10px" className="quantity-label">
                  <Stack
                    borderRadius="xl"
                    style={{ padding: 10, backgroundColor: "rgba(0,0,0,0.8)" }}
                  >
                    <Text color="#FFFFFF" fontSize={14}>
                      {`${product.quantity} remaining`}
                    </Text>
                  </Stack>
                </Stack>

                <Flex
                  justify="space-between"
                  w="100%"
                  className="product-bottom-info"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(0,0,0,0.47522759103641454) 0%, rgba(0,0,0,0.623686974789916) 0%, rgba(0,0,0,0) 100%)",
                    padding: 8,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15
                  }}
                >
                  <Stack className="price-label">
                    <Text color="#FFFFFF" fontSize={18} fontWeight="bold">
                      {`${product.price} ${product.currency || "RON"}`}
                    </Text>
                  </Stack>

                  <Pressable
                    onPress={() => {
                      product.quantity -= 1;
                      addProductToCard(product);
                    }}
                  >
                    <Stack
                      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                      p="6px"
                      borderRadius="xl"
                      align="center"
                      justify="center"
                    >
                      <FiPlus style={{ fontSize: 20, color: "#FFFFFF" }} />
                    </Stack>
                  </Pressable>
                </Flex>
                <div
                  className="product-order-button"
                  style={{ display: "none", width: "100%", padding: 10 }}
                >
                  <Pressable
                    onPress={() => {
                      product.quantity -= 1;
                      addProductToCard(product);
                    }}
                    style={{ width: "100%" }}
                  >
                    <Stack
                      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                      py="6px"
                      px="10px"
                      borderRadius="xl"
                      className="price-label"
                    >
                      <Text color="#FFFFFF" fontSize={14} textAlign="center">
                        {`Add to card`}
                      </Text>
                    </Stack>
                  </Pressable>
                </div>
              </div>
            )}
            <img
              src={product.imageUrl}
              style={{
                borderRadius: 15,
                width: "100%",
                objectFit: "cover",
                height: "100%"
              }}
            />
          </Box>
        ))}
      </SimpleGrid>

      <Modal
        motionPreset="scale"
        isCentered
        isOpen={isModalOpen}
        onClose={() => setOpenModal(false)}
        size="2xl"
      >
        <ModalOverlay />

        <ModalContent
          p={isOnMobile ? 0 : 10}
          py={isOnMobile ? 5 : 10}
          borderRadius={isOnMobile ? 10 : 30}
        >
          <ModalHeader>
            <Text>{`Total: ${totalOrder}  ${initialProduct.currency ||
              "RON"}`}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {showCompleteAddress ? (
              <OrderModalContent
                isOnMobile={isOnMobile}
                handlePlaceOrder={handlePlaceOrder}
              />
            ) : (
              <Stack>
                <SimpleGrid
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem"
                  }}
                  columns={[3, null, 5]}
                  spacing="10px"
                >
                  {currentProducts.map(product => (
                    <img
                      key={product.id}
                      src={product.imageUrl}
                      style={{
                        borderRadius: 15,
                        width: "100px",
                        objectFit: "cover",
                        height: "100px"
                      }}
                    />
                  ))}
                </SimpleGrid>
                <div
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    textAlign: "center"
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "#000",
                      width: "100%",
                      marginTop: "0.5rem"
                    }}
                    onClick={() => setShowCompleteAddress(true)}
                  >
                    <Text style={{ color: "#FFFFFF" }}>Plata ramburs</Text>
                  </Button>
                </div>
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
export default ShopItems;
//
// {sellerInfo.paymentType === "card" ? (
//   <Button
//     style={{
//       backgroundColor: "#000",
//       width: "100%",
//       marginTop: "0.5rem"
//     }}
//     onClick={async () => {
//       const transportFee = sellerInfo.transportFee || 0;
//       const fullPrice = totalOrder + transportFee;
//       const req = await axios.post("/api/checkout", {
//         productId: initialProduct.id,
//         name: "Your Order",
//         quantity: 1,
//         price: fullPrice,
//         // imageUrl: product.imageUrl,
//         stripeSellerId: sellerInfo.stripeId
//       });
//       window.location.href = req.data.url;
//     }}
//   >
//     <Text style={{ color: "#FFFFFF" }}>Plata card</Text>
//   </Button>
// ) : sellerInfo.paymentType === "ramburs" ? (
//   <Button
//     style={{
//       backgroundColor: "#000",
//       width: "100%",
//       marginTop: "0.5rem"
//     }}
//     onClick={() => this.setState({ showAddress: true })}
//   >
//     <Text style={{ color: "#FFFFFF" }}>Plata ramburs</Text>
//   </Button>
// ) : (
//   <Stack>
//     <Button
//       style={{
//         backgroundColor: "#000",
//         width: "100%",
//         marginTop: "0.5rem"
//       }}
//       onClick={async () => {
//         const transportFee = sellerInfo.transportFee || 0;
//         const fullPrice = totalOrder + transportFee;
//         const req = await axios.post("/api/checkout", {
//           productId: initialProduct.id,
//           name: "Your order",
//           quantity: 1,
//           price: fullPrice,
//           // imageUrl: product.imageUrl,
//           stripeSellerId: sellerInfo.stripeId
//         });
//         window.location.href = req.data.url;
//       }}
//     >
//       <Text style={{ color: "#FFFFFF" }}>Plata card</Text>
//     </Button>
//     <Text style={{ color: "#666", marginTop: "0.5rem" }}>
//       or
//     </Text>
//
//     <Pressable onPress={() => setCompleteAddress(true)}>
//       <Text
//         style={{
//           marginTop: "0.5rem",
//           color: "#666",
//           textDecorationLine: "underline"
//         }}
//       >
//         Plata ramburs
//       </Text>
//     </Pressable>
//   </Stack>
// )}
