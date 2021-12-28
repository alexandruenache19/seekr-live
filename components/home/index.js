import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { FaPlay } from 'react-icons/fa'
import Colors from '../../styles/colors'
import Constants from '../../styles/constants'

const fadeImages = [
  'https://odin-images.s3.amazonaws.com/odin-utilities/slide-show/11.png',
  'https://odin-images.s3.amazonaws.com/odin-utilities/slide-show/22.png',
  'https://odin-images.s3.amazonaws.com/odin-utilities/slide-show/33.png',
  'https://odin-images.s3.amazonaws.com/odin-utilities/slide-show/44.png',
  'https://odin-images.s3.amazonaws.com/odin-utilities/slide-show/55.png'
]

export const Banner = ({ isOnMobile, auth, openAuthModal }) => {
  return (
    <View style={{
      maxWidth: 900,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: isOnMobile ? 'flex-start' : 'center',
      paddingHorizontal: '1.5rem',
      paddingTop: '7rem',
      paddingBottom: '3rem',
      marginTop: '2rem'
    }}
    >
      <Text style={{
        color: Colors.TEXT_COLOR_MAIN,
        fontSize: isOnMobile ? 36 : 48,
        lineHeight: '1.4',
        fontWeight: 'bold',
        textAlign: isOnMobile ? 'left' : 'center'
      }}
      >
        {'Sell fashion items, cosmetics and more through live video'}
      </Text>

      <Text style={{
        color: Colors.TEXT_COLOR_MAIN,
        fontSize: 19,
        lineHeight: '1.7',
        marginTop: '1rem',
        fontWeight: '300',
        textAlign: isOnMobile ? 'left' : 'center'
      }}
      >
        {/* {'Organize your brain dump'} */}
        {'Seekr is a marketplace that allows any shop with a social media audience to engage with customers easier and sell their products faster, through live streams'}
      </Text>

      <Pressable
        style={{ ...styles.mainBtnStyle, marginTop: '2.5rem', marginBottom: '1.5rem' }}
        onPress={() => window.open(Constants.SIGN_UP_FORM_SHOPS, '_self')}
      >
        <Text style={styles.btnText}>
          {'START SELLING'}
        </Text>
      </Pressable>

      {/* {!auth.user ? (
        <Pressable
          style={{ ...styles.mainBtnStyle, marginTop: '2.5rem', marginBottom: '1.5rem' }}
          onPress={auth ? auth.signin : openAuthModal}
        >
          <Text style={styles.btnText}>
            {'GET STARTED'}
          </Text>
        </Pressable>
      ) : (
        <Pressable
          style={{ ...styles.mainBtnStyle, marginTop: '2.5rem', marginBottom: '1.5rem' }}
          onPress={auth ? auth.signin : openAuthModal}
        >
          <Text style={styles.btnText}>
            {'GET STARTED'}
          </Text>
        </Pressable>
      )} */}
      {/* <View style={{ marginTop: '1.5rem', paddingHorizontal: '1.5rem' }}> */}
      {/* <img
        // src='https://odin-images.s3.amazonaws.com/odin-utilities/mental-dump-space.png'
        src='/demo.png'
        style={{
          // height: isOnMobile ? 'auto' : 500,
          width: isOnMobile ? '100%' : 1000,
          objectFit: 'cover'
        }}
      /> */}
      <div className='slide-container' style={{ maxWidth: 1000, width: '100%', height: 'auto', marginTop: '2rem' }}>
        {/* <Fade autoplay duration={2000} arrows={false}>
          {fadeImages.map(item => (
            <div key={item} className='each-fade'>
              <img src={item} />
            </div>
          ))}
        </Fade> */}
      </div>
      {/* </View> */}
    </View>
  )
}

export const MeetOdin = ({ isOnMobile, auth }) => {
  return (
    <View style={{ paddingHorizontal: '1.5rem', marginTop: '2.5rem', marginBottom: '3rem', maxWidth: 600, alignItems: 'center' }}>
      <View style={{ marginVertical: '1rem' }}>
        <Text style={styles.sectionSubtitle}>
          {'Meet Seekr'}
        </Text>
      </View>
      <View style={{ marginVertical: '1rem' }}>
        <Text style={styles.sectionTitle}>
          {'A redesigned way of interacting with customers and selling online'}
        </Text>
      </View>
      <Text style={{
        marginTop: '1.2rem',
        ...styles.baseText
      }}
      >
        {'Seekr allows anyone who sells products online to do so faster, through live events.'}
      </Text>
      <Text style={{
        marginTop: '1.2rem',
        ...styles.baseText
      }}
      >
        {'Instead of opening a Shopify store, adding data about your products and trying to convert site visitors, with Seekr, you\'ll be able to add a link in your Instagram bio and sell items during a live interaction with your followers.'}
      </Text>
      <Text style={{
        marginTop: '1.2rem',
        ...styles.baseText
      }}
      >
        {'You\'ll open your camera and showcase your products. We\'ll provide the store, collect delivery details, process payments and offer a completely new way of interacting with your customers.'}
      </Text>
    </View>
  )
}

export const Demo = ({ isOnMobile, setVideoModalOpen }) => {
  // const [isVideoModalOpen, setVideoModalOpen] = useState(false)
  return (
    <View style={{
      display: 'flex',
      flexDirection: isOnMobile ? 'column' : 'row',
      paddingTop: isOnMobile ? '2rem' : '5rem',
      paddingBottom: isOnMobile ? '1rem' : '5rem',
      width: '100%',
      paddingHorizontal: isOnMobile ? '1.5rem' : '7rem'
    }}
    >
      <View style={{ marginRight: isOnMobile ? 0 : '4rem', flex: isOnMobile ? 1 : 1 / 2, marginBottom: isOnMobile ? '2rem' : 0 }}>
        <Pressable
          onPress={setVideoModalOpen}
          style={{ maxHeight: 500, flex: 1, borderRadius: 20, backgroundColor: Colors.LIGHT_BG_COLOR }}
        >
          <img
            src='/demo-2.png'
            style={{
              borderRadius: 20,
              filter: 'blur(3px)',
              maxHeight: 500,
              objectFit: 'cover',
              // objectPosition: 'top',
              width: '100%',
              height: '100%',
              flex: 1
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)'
          }}
          >
            <FaPlay style={{ color: '#FFFFFF', fontSize: 40, marginLeft: 3 }} />
          </div>
        </Pressable>
      </View>
      <View style={{ flex: isOnMobile ? 1 : 1 / 2 }}>
        <View style={{ marginVertical: '1rem' }}>
          <Text style={{ ...styles.sectionSubtitle, textAlign: 'left' }}>
            {'See it in action'}
          </Text>
        </View>
        <View style={{ marginVertical: '1rem' }}>
          <Text style={{ ...styles.sectionTitle, textAlign: 'left' }}>
            {'The fastest way to sell new stock to your audience.'}
          </Text>
        </View>
        <View style={{ marginBottom: '1rem' }}>
          <ul>
            <View style={{ marginBottom: '1rem' }}>
              <Text style={{ ...styles.baseText, fontWeight: 'bold' }}>Go live or schedule events</Text>
              <Text style={{ ...styles.baseText, marginTop: '0.5rem', marginLeft: '1rem' }}>Sellers on Seekr can schedule events for when new stock arrives. Sell more in one go and answer product related questions through live interactions.</Text>
            </View>
            <View style={{ marginBottom: '1rem' }}>
              <Text style={{ ...styles.baseText, fontWeight: 'bold' }}>Do you have this in size M?...</Text>
              <Text style={{ ...styles.baseText, marginTop: '0.5rem', marginLeft: '1rem' }}>Seekr rethinks how you respond to customers queries. No more emails, text messages and DMs. Show, don't tell.</Text>
            </View>
            <View style={{ marginBottom: '1rem' }}>
              <Text style={{ ...styles.baseText, fontWeight: 'bold' }}>Buy in one tap</Text>
              <Text style={{ ...styles.baseText, marginTop: '0.5rem', marginLeft: '1rem' }}>Your viewers can buy the product you're showing in one tap, right from the live stream.</Text>
            </View>
          </ul>
        </View>
      </View>
    </View>
  )
}

export const CollaborateSection = ({ isOnMobile, auth, openAuthModal }) => {
  return (
    <View style={{
      display: 'flex',
      flexDirection: isOnMobile ? 'column' : 'row',
      paddingTop: isOnMobile ? '1rem' : '5rem',
      paddingBottom: '3rem',
      width: '100%',
      paddingHorizontal: isOnMobile ? '1.5rem' : '7rem'
    }}
    >
      <View style={{ flex: isOnMobile ? 1 : 1 / 2, flexDirection: 'column', alignItems: 'flex-start' }}>
        <View style={{ marginVertical: '1rem' }}>
          <Text style={{ ...styles.sectionSubtitle, textAlign: 'left' }}>
            {'Collaborate with ease'}
          </Text>
        </View>
        <View style={{ marginVertical: '1rem' }}>
          <Text style={{ ...styles.sectionTitle, textAlign: 'left' }}>
            {'Open your camera and start selling'}
          </Text>
        </View>
        <Text style={{ ...styles.baseText, marginTop: '0.8rem', maxWidth: 600 }}>
          {'Showcase products and set your prices. Seekr provides the store, automatically tracks stock and collects delivery details.'}
        </Text>
        <Text style={{ ...styles.baseText, marginTop: '1.2rem', maxWidth: 600 }}>
          {'Move to a new product in a couple of taps. Chat with viewers, answer product related questions and sell to thousands in a single stream.'}
        </Text>
        <Pressable
          style={{ ...styles.mainBtnStyle, marginTop: '2rem' }}
          onPress={() => window.open(Constants.SIGN_UP_FORM_SHOPS, '_self')}
        >
          <Text style={styles.btnText}>
            {'START SELLING'}
          </Text>
        </Pressable>
        {/* {!auth.user ? (
          <Pressable
            style={{ ...styles.mainBtnStyle, marginTop: '2rem' }}
            onPress={auth ? auth.signin : openAuthModal}
          >
            <Text style={styles.btnText}>
              {'GET STARTED'}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={{ ...styles.mainBtnStyle, marginTop: '2rem' }}
            // onPress={() => window.open(`/${auth.user.username}`, '_self')}
            onPress={auth ? auth.signin : openAuthModal}
          >
            <Text style={styles.btnText}>
              {'GET STARTED'}
            </Text>
          </Pressable>
        )} */}
      </View>
      <View style={{
        marginLeft: isOnMobile ? 0 : '4rem',
        flex: isOnMobile ? 1 : 1 / 2,
        marginBottom: isOnMobile ? '1rem' : 0,
        marginTop: isOnMobile ? '3rem' : 0,
        backgroundColor: '#000',
        borderRadius: 20
      }}
      >
        <img
          src='/demo-3.png'
          style={{
            boxShadow: Constants.DEFAULT_SHADOW,
            maxHeight: 450,
            height: '100%',
            borderRadius: 20,
            objectFit: 'contain',
            objectPosition: 'top'
          }}
        />
      </View>
    </View>
  )
}

export const Footer = ({ isOnMobile }) => {
  return (
    <View className='footer' style={{ alignItems: 'center', paddingHorizontal: '1.5rem', paddingVertical: '3rem', marginTop: '2rem', marginBottom: '2rem' }}>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0.5rem' }}>
        <img
          style={{
            width: 30,
            height: 30
          }}
          src='/logo.png'
        />
        <Text style={{
          color: Colors.TEXT_COLOR_MAIN,
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '0.5rem'
        }}
        >
          {'Seekr'}
        </Text>
      </View>
      <View style={{ display: 'flex', alignItems: 'center', marginTop: '0.7rem' }}>
        {/* <Text style={{ fontSize: 16, color: Colors.TEXT_COLOR_MAIN }}>
          {'+40771440831'}
        </Text> */}

        {/* <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <a href='https://apps.apple.com/us/app/odin-share-ideas-with-friends/id1548503015'>
            <img
              src='https://odin-images.s3.amazonaws.com/odin-utilities/app2.png'
              style={{
                objectFit: 'cover',
                height: '6rem',
                marginRight: isOnMobile ? 7 : -7
              }}
            />
          </a>
          <a href='https://play.google.com/store/apps/details?id=com.listle.odin&hl=en&gl=US'>
            <img
              src='https://odin-images.s3.amazonaws.com/odin-utilities/play2.png'
              style={{
                marginLeft: isOnMobile ? 7 : -7,
                objectFit: 'cover',
                height: '6rem'
              }}
            />
          </a>
        </View> */}

        <Text style={{ fontSize: 16, marginTop: '0.5rem', color: Colors.TEXT_COLOR_MAIN }}>
          {`Copyright Seekr, ${new Date().getFullYear()}`}
        </Text>
      </View>
    </View>
  )
}

const styles = {
  mainBtnStyle: {
    marginTop: '1.5rem',
    backgroundColor: Colors.DEFAULT_ACCENT_COLOR,
    borderRadius: 26,
    textAlign: 'center',
    fontSize: 24,
    paddingHorizontal: '2.5rem',
    paddingVertical: '0.7rem'
  },
  btnText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  userProfileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.DEFAULT_SPACE_CARD_COLOR
  },
  baseText: {
    color: Colors.TEXT_COLOR_MAIN,
    lineHeight: '1.6',
    fontSize: '1.2rem',
    fontWeight: '300'
  },
  sectionTitle: {
    color: Colors.TEXT_COLOR_MAIN,
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: '1.5',
    textAlign: 'center'
  },
  sectionSubtitle: {
    color: Colors.DEFAULT_ACCENT_COLOR,
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: '1.5',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    textAlign: 'center'
  }
}
