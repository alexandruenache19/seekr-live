import React, { PureComponent } from "react";
import { withRouter } from "next/router";
import { Center, Spinner } from "@chakra-ui/react";

import { Modal, LiveScreen, EventScreen } from "../../../components";

import { getSeller, getEvent, getEventInfo, getSellerInfo } from "../../../fetchData/getData";
import firebase from "../../../firebase/clientApp";

class EventPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isOnMobile: false,
            isLive: true,
            comments: [],
            username: '',
            evetInfo: null,
            sellerInfo: null,
            currentProductId: null
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handelCallback = this.handelCallback.bind(this);
    }

    componentDidMount() {
        const { eventId } = this.props;

        this.eventInfoListener = firebase
            .database()
            .ref(`/events/${eventId}/info`)
            .on("value", async snapshot => {

                const eventInfo = snapshot.val()

                if (eventInfo.sellerId && !this.state.sellerInfo) {
                    const sellerInfo = await getSellerInfo(eventInfo.sellerId)
                    this.setState({ sellerInfo })
                }

                console.log('eventInfo', eventInfo)

                this.setState({
                    eventInfo: eventInfo,
                    currentProductId: eventInfo.currentProductId
                })
            })


        this.sellerInfoListener = firebase
            .database()
            .ref(`/events/${eventId}/info`)
            .on("value", snapshot => {
                this.setState({
                    eventInfo: snapshot.val()
                });
            })

        this.commentsListener = firebase
            .database()
            .ref(`/events/${eventId}/comments`)
            .orderByChild('timestamp')
            .limitToLast(20)
            .on("value", snapshot => {
                const comments = [];
                snapshot.forEach(commentSnapshot => {
                    const comment = commentSnapshot.val();
                    comments.push(comment);
                });
                this.setState({
                    comments: comments,
                    loading: false,
                    isOnMobile: window.innerWidth <= 780,
                    isLive: true
                });
            });
    }

    handleOpenModal(type, props) {
        this.modal.openModal(type, props);
    }

    handelCallback(data) {
        if (data.type === "comment") {
            this.setState({ username: data.text });
        }
    }

    render() {
        const { isOnMobile } = this.props;
        const { loading, isLive, comments, username, eventInfo, sellerInfo, currentProductId } = this.state;

        if (loading || !eventInfo || !sellerInfo) {
            return (
                <Center bg="#FFF" w="100vw" h="100vh">
                    <Spinner size="xl" thickness="3px" />
                </Center>
            );
        }

        return (
            <Center>
                <Modal
                    callback={this.handelCallback}
                    ref={ref => (this.modal = ref)}
                    isOnMobile={isOnMobile}
                />

                {isLive ? (
                    <LiveScreen
                        isOnMobile={isOnMobile}
                        onOpenModal={this.handleOpenModal}
                        sellerInfo={sellerInfo}
                        eventInfo={eventInfo}
                        comments={comments}
                        username={username}
                        currentProductId={currentProductId}
                    />
                ) : (
                    <EventScreen
                        isOnMobile={isOnMobile}
                        onOpenModal={this.handleOpenModal}
                        sellerInfo={sellerInfo}
                        eventInfo={eventInfo}
                        comments={comments}
                        username={username}
                    />
                )}
            </Center>
        );
    }
}

export const getServerSideProps = async context => {
    const { id } = context.params;

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

    return { props: { eventId: id, isOnMobile } };
};

const styles = {};

export default withRouter(EventPage);
