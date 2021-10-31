import React, { PureComponent, useState } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Spinner
} from '@chakra-ui/react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import firebase from '../../firebase/clientApp'
import router from 'next/router';

const format = (val) => 'RON ' + val
const parse = (val) => val.replace(/RON /, '')

export default class PaymentScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            isAvailable: false,
            paymentUrl: null,
            paidProduct: true,
            product: null
        }
    }

    async componentDidMount() {
        const { id } = this.props
        const productSn = await firebase.database().ref(`products/${id}`).once('value')
        if (productSn.val()) {
            if (router.query && router.query.success) {
                this.setState({
                    product: productSn.val(),
                    paidProduct: true,
                    loading: false
                }, async () => {
                    await firebase.database().ref(`products/${id}/quantity`).set(firebase.database.ServerValue.increment(-1))
                })
            } else if (router.query && router.query.canceled) {
                this.setState({
                    product: productSn.val(),
                    paidProduct: false,
                    loading: false
                })
            } else {
                this.setState({
                    product: productSn.val(),
                    paidProduct: false
                }, () => {
                    if (productSn.val().quantity >= 1) {
                        // window.open(productSn.val().paymentUrl)
                        // let newTab = window.open('_self');
                        window.location.href = productSn.val().paymentUrl;
                        // this.setState({
                        //     paymentUrl: productSn.val().paymentUrl,
                        //     isAvailable: true,
                        //     loading: false
                        // })
                    }
                })
            }
        }
    }

    render() {
        const { loading, isAvailable, paymentUrl, product, paidProduct } = this.state
        return (
            <Stack align='center' w='100vw' h='100vh' justify='center'>
                {loading ? (
                    <Stack
                        w='100%'
                        h='100%'
                        position='absolute'
                        top={0}
                        zIndex={5}
                        justifyContent='center'
                        alignItems='center'
                        bg='rgba(255,255,255,0.3)'
                    >
                        <Spinner color='#121212' size='md' />
                    </Stack>
                ) : null}
                {product ? (
                    paidProduct ? (
                        <Stack align='center' maxW='500px' px='1rem'>
                            <AiOutlineCheckCircle style={{ fontSize: 40, color: '#28A445' }} />
                            <Text textAlign='center'>Order confirmed</Text>
                            <img
                                src={product.imageUrl}
                                style={{
                                    marginTop: '1.5rem',
                                    // boxShadow: '0px 0px 36px -9px rgba(0,0,0,0.49)',
                                    backgroundColor: '#999',
                                    maxWidth: '90%',
                                    height: 'auto',
                                    maxHeight: 250,
                                    borderRadius: 15,
                                    objectFit: 'cover',
                                    marginBottom: '1.5rem'
                                }}
                            />
                            <Text textAlign='center'>Thank you for your order!</Text>
                            <Text textAlign='center'>We'll contact you to confirm shipping details in the next 24h.</Text>
                        </Stack>
                    ) : (
                        <Stack align='center' maxW='500px' px='1rem'>
                            <Text textAlign='center'>{product.name}</Text>
                            <img
                                src={product.imageUrl}
                                style={{
                                    marginTop: '1.5rem',
                                    // boxShadow: '0px 0px 36px -9px rgba(0,0,0,0.49)',
                                    backgroundColor: '#999',
                                    maxWidth: '90%',
                                    height: 'auto',
                                    maxHeight: 250,
                                    borderRadius: 15,
                                    objectFit: 'cover',
                                    marginBottom: '1.5rem'
                                }}
                            />
                            <Text textAlign='center' fontSize={'18px'}>{`RON ${product.price}`}</Text>
                            <Text textAlign='center'>{`Only ${product.quantity} left at this price!`}</Text>
                            <Button style={{ backgroundColor: '#28A445', width: '100%', marginTop: '1rem' }} onClick={() => window.location.href = product.paymentUrl}>
                                <Text style={{ color: '#FFFFFF' }}>
                                    {'Buy Now'}
                                </Text>
                            </Button>
                        </Stack>
                    )
                ) : null}
            </Stack>
        )
    }
}

const styles = {
    formRow: {
        marginTop: '1rem'
    }
}

export const getServerSideProps = async (context) => {
    const { id } = context.params

    let userAgent
    if (context.req) { // if you are on the server and you get a 'req' property from your context
        userAgent = context.req.headers['user-agent'] // get the user-agent from the headers
    } else {
        userAgent = navigator.userAgent // if you are on the client you can access the navigator from the window object
    }

    const isOnMobile = Boolean(userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ))

    return {
        props: {
            id,
            isOnMobile,
            // query: router.query
        }
    }
}
