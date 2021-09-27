import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { View, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { Stack, Flex, Text, Image, Button, Spinner } from '@chakra-ui/react'
import NextImage from 'next/image'

import Link from 'next/link'
import { isMobile } from 'react-device-detect'

import Header from '../components/molecules/header'
import { Banner, MeetOdin, Demo, CollaborateSection, Footer } from '../components/home'
import Constants from '../styles/constants'

// {
//   "hosting": {
//     "public": "out",
//     "ignore": [
//       "firebase.json",
//       "**/.*",
//       "**/node_modules/**"
//     ]
//   }
// }

const renderSEOTags = () => {
  const title = 'Seekr. Buy and sell anything anything through a live stream.'
  const description = 'A social centralized place for all the cool things you come across online - Tweets, TikToks, links, videos. Save content from virtually any app or website.'

  return (
    <>
      <Head>
        <meta httpEquiv='content-language' content='en-gb' />
        <title>{title}</title>
        <meta property='og:title' content={title} key='title' />
        <meta property='og:description' content={description} />
        <meta property='og:url' content='https://onodin.com' />
        <meta property='og:image:width' content='480' />
        <meta property='og:image:height' content='480' />
        <meta property='og:image' content='/logo-raven.png' />
        <meta property='twitter:image' content='/logo-raven.png' />
        <meta property='twitter:site' content='@odin_app' />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical='https://seekr.com'
        openGraph={{
          title: title,
          description: description,
          url: 'https://seekr.com',
          images: [{
            url: '/logo-raven.png',
            width: 360,
            height: 360,
            alt: title
          }],
          site_name: 'Odin'
        }}
        twitter={{
          handle: '@seekr_app',
          site: 'https://seekr.com',
          cardType: 'summary_large_image'
        }}
      />
    </>
  )
}

export default function Home ({ ...props }) {
  const [isOnMobile, setMobile] = useState()
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = () => {
    if (window && window.pageYOffset > 0) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    setMobile(isMobile)
    setLoading(false)
    window.addEventListener('scroll', handleScroll)
  }, [setMobile])

  if (loading) {
    return (
      <Stack
        w='100vw'
        h='100vh'
        justifyContent='center'
        alignItems='center'
        bg='#FFFEF3'
      >
        <Spinner color='red.500' size='xl' />
      </Stack>
    )
  }

  return (

    <>
      {renderSEOTags()}
      <View style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        zIndex: 0
      }}
      >
        <NextImage
          layout='fill'
          objectFit='cover'
          src='https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2812&q=80'
        />
      </View>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 10 }} className={scrolled ? 'header-wrap with-light-bg' : 'header-wrap'}>
        <Header
          isOnMobile={isOnMobile}
        />
      </div>
      <ScrollView
        style={{ width: '100%', flex: 1, zIndex: 4 }}
      >
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            width: '100vw'
          }}
        >
          <Banner isOnMobile={isOnMobile} auth={null} />
          <img
            // src='https://odin-images.s3.amazonaws.com/odin-utilities/mental-dump-space.png'
            src='/demo.png'
            style={{
              // height: isOnMobile ? 'auto' : 500,
              borderRadius: 20,
              boxShadow: Constants.DEFAULT_SHADOW,
              marginTop: -30,
              width: isOnMobile ? 'calc(100% - 3rem)' : 1000,
              objectFit: 'cover'
            }}
          />
          <MeetOdin isOnMobile={isOnMobile} />
          <Demo isOnMobile={isOnMobile} />
          <CollaborateSection isOnMobile={isOnMobile} auth={null} />

          {/* <img
            src='https://odin-images.s3.amazonaws.com/odin-utilities/flat-mockups.png'
            style={{
              width: '100%',
              objectFit: 'cover'
            }}
          /> */}
        </View>

        <Footer isOnMobile={isOnMobile} />
      </ScrollView>
    </>
  )

  if (isOnMobile) {
    return (
      <Stack
        w='100vw'
        h='100vh'
        p='2em'
        bg='#F0F0F0'
        justifyContent='space-between'
      >
        <Flex justifyContent='space-between' alignItems='center'>
          <Text style={styles.mobileLogo}>seekr.</Text>
          <a
            className='left'
            target='_blank'
            href='https://alexandruenache.typeform.com/to/XHmwEQ8j'
          >
            Join Waitlist
          </a>
        </Flex>

        <Image src='./technology.png' alt='logo' />
        <Stack>
          <Text style={styles.mobileLarge}>Buy & Sell products live</Text>
          {/*  <Text style={styles.mobileNormal}>Sell products live</Text> */}
        </Stack>
        <Link href='https://alexandruenache.typeform.com/to/XHmwEQ8j'>
          <Button style={styles.button}>Join Waitlist!</Button>
        </Link>
      </Stack>
    )
  }

  return (
    <Stack
      w='100vw'
      minH='100vh'
      h='100%'
      bg='#F0F0F0'
      pt='50px'
      pb='50px'
      pl='135px'
      pr='135px'
      justifyContent='space-between'
    >
      <Flex justifyContent='space-between' alignItems='center'>
        <Text style={styles.bold}>seekr.</Text>

        <a
          className='left'
          target='_blank'
          href='https://alexandruenache.typeform.com/to/XHmwEQ8j'
        >
          Join Waitlist
        </a>
      </Flex>

      <Flex justifyContent='space-between' alignItems='center'>
        <Stack width='50%'>
          <Text style={styles.semiBold}>━━━ Cosmetics, clothes and more </Text>
          <Text>
            <Text style={styles.largeBold}>Buy & Sell products live</Text>
          </Text>
          {/*    <Text style={styles.normal}>Sell products live</Text> */}
        </Stack>

        <Image w='50%' h='100%' src='/technology.png' alt='logo' />
      </Flex>

      <Flex alignItems='center'>
        <Link href='https://alexandruenache.typeform.com/to/XHmwEQ8j'>
          <Button style={styles.button}>Join Waitlist!</Button>
        </Link>
      </Flex>
    </Stack>
  )
}

const styles = {
  bold: {
    fontWeight: 800,
    fontSize: 24,
    color: '#081c15',
    lineHeight: '1.3em',
    fontFamily: 'Poppins'
  },
  normal: {
    fontSize: 16,
    lineHeight: '1.5em',
    width: '70%'
  },
  mobileNormal: {
    fontSize: 16,
    lineHeight: '1.5em',
    textAlign: 'center',
    paddingTop: 10
  },
  mobileLarge: {
    fontWeight: 800,
    fontSize: 30,
    lineHeight: '1.2em',
    textAlign: 'center'
  },
  mobileLogo: {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: '1.3em'
  },
  semiBold: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '1.5em'
  },
  webContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  largeNormal: {
    fontSize: 55,
    lineHeight: '1.2em'
  },
  largeBold: {
    fontWeight: 800,
    fontSize: 55,
    lineHeight: '1.2em'
  },
  button: {
    backgroundColor: '#081c15',
    color: '#FFF'
  }
}
