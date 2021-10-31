import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';
import {
    Stack,
    Text,
    Grid,
    Box,
    Button
} from '@chakra-ui/react'

import { getUser, getUserId } from '../../actions/auth'
import axios from 'axios';

class InstagramImgComponent extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            imgSrc: ''
        }
    }

    async componentDidMount() {
        const { post } = this.props
        const embedReq = await axios.post('/api/get-embed-data', { url: `https://www.instagram.com/p/${post.shortcode}` })
        this.setState({ imgSrc: embedReq.data.data.thumbnail_url })
    }

    render() {
        const { imgSrc } = this.state
        return (
            <Box w="100%" h="250" bg="#999">
                <img src={imgSrc} style={{ width: '100%', objectFit: 'cover', height: '100%' }} />
            </Box>
        )
    }
}

class LinksPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentEventId: null,
            instagramData: null,
            loading: true
        };
    }

    async componentDidMount() {
        const { userProfile } = this.props
        console.log('userprofile', userProfile)
        const instagramUsername = 'vintage_concept_store'
        const instagramDataReq = await axios.post('/api/instagram-profile', {
            instagramUsername: instagramUsername
        })

        console.log('instagram', instagramDataReq.data.data)
        this.setState({
            instagramData: instagramDataReq.data.data,
            loading: false
        })
        // if (userProfile && userProfile.info) {
        //   this.setState({ currentEventId: userProfile.events.current })
        // }
    }

    render() {
        const { currentEventId, instagramData, loading } = this.state
        const { isOnMobile } = this.props
        if (instagramData) {
            return (
                <Stack align='center'>
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
                    <Stack maxW='800px' w='100%' align='center' style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                        <Grid style={{ marginTop: '2rem' }} w='100%' templateColumns="repeat(3, 1fr)" gap={6}>
                            {instagramData.posts.map(post =>
                                <InstagramImgComponent post={post} />
                            )}
                        </Grid>

                        <Button style={{ backgroundColor: '#28A445', width: '100%', marginTop: '1rem' }} onClick={() => window.location.href = product.paymentUrl}>
                            <Text style={{ color: '#FFFFFF' }}>
                                {'Another Post'}
                            </Text>
                        </Button>
                    </Stack>
                </Stack>
            )
        } else {
            return null
        }
    }
}

export const getServerSideProps = async context => {
    const { userName } = context.params;

    const uid = await getUserId(userName)
    const userProfile = await getUser(uid)

    let userAgent;
    if (context.req) {
        // if you are on the server and you get a 'req' property from your context
        userAgent = context.req.headers["user-agent"]; // get the user-agent from the headers
    } else {
        userAgent = navigator.userAgent; // if you are on the client you can access the navigator from the window object
    }

    const isOnMobile = Boolean(
        userAgent.match(
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
    );

    return { props: { userProfile: userProfile, isOnMobile } };
};

const styles = {};

export default withRouter(LinksPage)
