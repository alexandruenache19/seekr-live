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
import firebase from '../../firebase/clientApp'

const format = (val) => 'RON ' + val
const parse = (val) => val.replace(/RON /, '')

export default class PaymentScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            isAvailable: false,
            paymentUrl: null
        }
    }

    async componentDidMount() {
        const { id } = this.props
        const productSn = await firebase.database().ref(`products/${id}`).once('value')
        console.log('productSn', productSn.val())
        if (productSn.val() && productSn.val().quantity >= 1) {
            // window.open(productSn.val().paymentUrl)
            // let newTab = window.open('_self');
            window.location.href = productSn.val().paymentUrl;
            // this.setState({
            //     paymentUrl: productSn.val().paymentUrl,
            //     isAvailable: true,
            //     loading: false
            // })
        }
    }

    render() {
        const { loading, isAvailable, paymentUrl } = this.state
        return (
            <Stack align='center' w='100vw' h='100vh'>
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
                {isAvailable && paymentUrl ? (
                    <iframe src={paymentUrl} style={{ width: '100vw', height: '100vh' }} />
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

    return { props: { id, isOnMobile } }
}
