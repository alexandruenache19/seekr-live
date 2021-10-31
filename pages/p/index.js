import React, { PureComponent, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spinner,
  Flex,
  useClipboard
} from "@chakra-ui/react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { generateId } from "../../actions/helper";
import { HiOutlineCamera } from "react-icons/hi";
import firebase from "../../firebase/clientApp";

const format = val => "RON " + val;
const parse = val => val.replace(/RON /, "");

function CopyLink({ value }) {
  const { hasCopied, onCopy } = useClipboard(value);

  return (
    <Flex justifyContent="center" alignItems="center" padding="10">
      <Text fontStyle="italic">{value}</Text>
      <Button onClick={onCopy} ml={2}>
        {hasCopied ? "Copied" : "Copy"}
      </Button>
    </Flex>
  );
}

export default class GeneratePaymentScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      price: 0,
      quantity: 1,
      isLinkFetched: false,
      title: "",
      imageUrl: "",
      loading: false,
      isComplete: false,
      productLink: ""
    };

    this.handleFetchPost = this.handleFetchPost.bind(this);
    this.handleGeneratePaymentLink = this.handleGeneratePaymentLink.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  async componentDidMount() {
    // await axios.post('/api/create-awb-order', {
    // })
  }

  async handleFetchPost() {
    const { link } = this.state;
    this.setState({ loading: true }, async () => {
      const postReq = await axios.post("/api/fetch-post", {
        uid: "NJv0oXqKUwcmWTW4VMjsr5HWJ4W2",
        url: link,
        saveInFirebase: false
      });

      this.setState({
        imageUrl: postReq.data.data.imageUrl,
        title: postReq.data.data.title,
        isLinkFetched: true,
        loading: false
      });

      console.log("post", postReq.data);
    });
  }

  async handleGeneratePaymentLink() {
    const { title, quantity, price, imageUrl, link } = this.state;
    this.setState(
      {
        loading: true
      },
      async () => {
        const productId = generateId(7);
        const req = await axios.post("/api/checkout", {
          productId: productId,
          name: title,
          quantity: quantity,
          price: price,
          imageUrl: imageUrl
        });

        this.setState({
          loading: false,
          productLink: `https://seekrlive.com/p/${productId}`,
          isComplete: true
        });

        await firebase
          .database()
          .ref(`products/${productId}`)
          .update({
            url: link,
            id: productId,
            name: title,
            price: parseFloat(price),
            imageUrl: imageUrl,
            quantity: parseFloat(quantity),
            paymentUrl: req.data.url,
            uid: this.props.uid,
            timestamp: +new Date()
          });

        await firebase
          .database()
          .ref(`users/${this.props.uid}/shop/products/${productId}`)
          .update({
            url: link,
            id: productId,
            name: title,
            price: parseFloat(price),
            imageUrl: imageUrl,
            quantity: parseFloat(quantity),
            paymentUrl: req.data.url,
            uid: this.props.uid,
            timestamp: +new Date()
          });

        //   try {
        //     window.open(req.data.url, '_self')
        //   } catch (err) {
        //     console.log('err', err)
        //   }
      }
    );
  }

  async handleUploadImage(event) {
    event.preventDefault();
    const file = event.target.files[0];

    if (file && file.name) {
      const fileParts = file.name.split(".");
      const fileName = fileParts[0];
      const fileType = fileParts[1];

      const options = {
        maxSizeMB: 1, // (default: Number.POSITIVE_INFINITY)
        fileType: "image/jpeg" // optional, fileType override
      };

      options.maxSizeMB = 0.3;

      console.log("options", options);

      const compressedFile = await imageCompression(file, options);
      const resizedImageBase64 = await imageCompression.getDataUrlFromFile(
        compressedFile
      );

      this.setState(
        {
          isUploadingImage: true
        },
        async () => {
          const base64String = resizedImageBase64;

          const config = {
            onUploadProgress: event => {
              console.log(
                "Current progress:",
                Math.round((event.loaded * 100) / event.total)
              );
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
          };

          const itemId = generateId(11);

          const req = await axios({
            method: "post",
            url: "/api/upload-image",
            data: {
              base64file: base64String,
              objectId: itemId,
              bucket: "odin-images",
              keyPrefix: "images"
            },
            ...config
          }).catch(err => console.log("err", err));

          // const req = await axios.post(`/api/${auth.user.uid}/upload-image`, {
          //   base64file: base64String,
          //   objectId: itemId,
          //   bucket: 'odin-images',
          //   keyPrefix: 'images'
          // }, config)

          // console.log(req.data.data)

          this.setState({
            imageUrl: req.data.data,
            isLinkFetched: true,
            isUploadingImage: false
          });
        }
      );
    }
  }

  render() {
    const {
      link,
      price,
      quantity,
      isLinkFetched,
      imageUrl,
      title,
      loading,
      isComplete,
      productLink
    } = this.state;

    if (isComplete) {
      return (
        <Stack
          maxW="md"
          borderRadius="xl"
          bg="#FFF"
          overflow="hidden"
          p="6"
          boxShadow="lg"
          justifyContent="canter"
          alignItems="center"
        >
          <Text fontWeight="bold">
            Add this link to your story to allow payment
          </Text>
          <CopyLink value={productLink} />
        </Stack>
      );
    }

    return (
      <Stack borderRadius="xl" bg="#FFF" p="6" boxShadow="lg">
        {loading && (
          <Stack
            w="100%"
            h="100%"
            position="absolute"
            top={0}
            left={0}
            zIndex={5}
            justifyContent="center"
            alignItems="center"
            bg="rgba(255,255,255,0.3)"
          >
            <Spinner color="#121212" size="md" />
          </Stack>
        )}

        {isLinkFetched ? (
          <Stack align="center">
            <img
              src={imageUrl}
              style={{
                backgroundColor: "#999",
                height: "auto",
                maxHeight: 250,
                borderRadius: 15,
                objectFit: "cover",
                marginBottom: "1rem"
              }}
            />
            <FormControl style={styles.formRow} id="title">
              <Input
                placeholder="Product Title"
                value={title}
                onChange={e => this.setState({ title: e.target.value })}
                _focus={{
                  border: "1px solid #999",
                  boxShadow: "none"
                }}
              />
            </FormControl>
            <FormControl style={styles.formRow} id="price">
              <FormLabel>Product Price</FormLabel>
              <NumberInput
                placeholder="Price (RON)"
                value={price}
                onChange={number => {
                  console.log("v", number);
                  this.setState({ price: number });
                }}
                _focus={{
                  border: "1px solid #999",
                  boxShadow: "none"
                }}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl style={styles.formRow} id="quantity">
              <FormLabel>Quantity</FormLabel>
              <NumberInput
                placeholder="Quantity"
                value={quantity}
                onChange={number => {
                  this.setState({ quantity: number });
                }}
                _focus={{
                  border: "1px solid #999",
                  boxShadow: "none"
                }}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </Stack>
        ) : (
          <FormControl id="link">
            <Input
              value={link}
              placeholder="Instagram Product Link"
              onChange={e => this.setState({ link: e.target.value })}
              _focus={{
                border: "1px solid #999",
                boxShadow: "none"
              }}
            />
          </FormControl>
        )}

        {!isLinkFetched ? (
          <Button
            style={{ backgroundColor: "#28A445", width: "100%" }}
            onClick={this.handleFetchPost}
          >
            <Text style={{ color: "#FFFFFF" }}>Fetch Product</Text>
          </Button>
        ) : (
          <Button
            style={{ backgroundColor: "#28A445", width: "100%" }}
            onClick={this.handleGeneratePaymentLink}
          >
            <Text style={{ color: "#FFFFFF" }}>Generate Payment Link</Text>
          </Button>
        )}
        <Text style={{ color: "#999", textAlign: "center" }}>or</Text>
        <Flex
          style={{
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: 20,
            borderRadius: 20
          }}
        >
          <HiOutlineCamera size={24} style={{ color: "#FFFFFF" }} />
          <Text style={{ color: "#FFFFFF", paddingLeft: 10 }}>
            Upload Image
          </Text>
          <input
            style={{ paddingLeft: 20 }}
            onChange={this.handleUploadImage}
            type="file"
          />
        </Flex>
      </Stack>
    );
  }
}

const styles = {
  formRow: {
    // marginTop: "1rem"
  }
};
