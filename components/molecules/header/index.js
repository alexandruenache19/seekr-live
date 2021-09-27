import React, { Component } from 'react'
import { Flex, Link, Text } from '@chakra-ui/react'
import { Pressable, Image as RNImage } from 'react-native'
import Colors from '../../../styles/colors'
import Constants from '../../../styles/constants'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      userPhotoURL: ''
    }
  }

  async componentDidMount() {

  }

  async componentDidUpdate(prevProps, prevState) {
  }

  render() {
    const { isOnMobile } = this.props
    const { openAuthModal, auth } = this.props
    const { username, userPhotoURL } = this.state

    return (
      <Flex style={{
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        // borderBottom: '0.5px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '0.8rem',
        paddingBottom: '0.8rem',
        paddingRight: isOnMobile ? '0.9rem' : '3rem',
        paddingLeft: isOnMobile ? '0.9rem' : '3rem',
        backgroundColor: 'transparent'
        // maxHeight: 67
      }}
      >
        <Link href='/'>
          <Flex style={{ alignItems: 'center' }}>
            <img
              style={{
                width: 25,
                height: 25
              }}
              src='/logo.png'
            />

            {!isOnMobile ? (
              <h1 style={{ color: Colors.TEXT_COLOR_MAIN, fontSize: 22, marginLeft: 10, fontWeight: 'bold', textAlign: 'center' }}>Seekr.</h1>
            ) : null}
          </Flex>
        </Link>

        <Flex style={{ alignItems: 'center' }}>
          <Pressable
            style={styles.mainBtnStyle}
            onPress={() => window.open(Constants.SIGN_UP_FORM_SHOPS, '_self')}
          >
            <Text style={{ ...styles.btnText, textTransform: 'uppercase' }}>
              {'Start selling'}
            </Text>
          </Pressable>
        </Flex>

        {/* {auth.user ? (
          <Flex style={{ alignItems: 'center' }}>
            <Pressable
              style={styles.mainBtnStyle}
              onPress={auth.signout}
            >
              <Text style={styles.btnText}>
                {'Log out'}
              </Text>
            </Pressable>
            <Pressable
              style={styles.userProfileImage}
              href={`/${username}`}
            >
              <RNImage
                style={styles.userProfileImage}
                source={userPhotoURL ? { uri: userPhotoURL } : null}
              />
            </Pressable>
          </Flex>
        ) : (
          <Flex>
            {isOnMobile ? (
              <Pressable
                style={{ ...styles.mainBtnStyle, backgroundColor: 'transparent', paddingHorizontal: 0 }}
                onPress={() => {
                  if (isIOS) {
                    window.open('https://apps.apple.com/us/app/odin-share-ideas-with-friends/id1548503015')
                  } else {
                    window.open('https://play.google.com/store/apps/details?id=com.listle.odin&hl=en&gl=US')
                  }
                }}
              >
                <Text style={styles.btnText}>
                  {'Get the app'}
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={{ ...styles.mainBtnStyle, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FFFFFF' }}
                onPress={openAuthModal}
              >
                <Text style={styles.btnText}>
                  {'Sign in'}
                </Text>
              </Pressable>
            )}
            <Pressable
              style={styles.mainBtnStyle}
              onPress={openAuthModal}
            >
              <Text style={styles.btnText}>
                {'Sign up'}
              </Text>
            </Pressable>
          </Flex>
        )} */}
      </Flex>
    )
  }
}

const styles = {
  mainBtnStyle: {
    // margin: '0.5rem',
    backgroundColor: Colors.DEFAULT_ACCENT_COLOR,
    borderRadius: 26,
    textAlign: 'center',
    paddingHorizontal: '1.1rem',
    paddingVertical: '0.5rem'
  },
  btnText: {
    color: Colors.HIGH_EMPHASIS_WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  userProfileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.DEFAULT_SPACE_CARD_COLOR
  }
}

export default Header
