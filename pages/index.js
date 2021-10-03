import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { View, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { Stack, Flex, Text, Image, Button, Spinner } from '@chakra-ui/react'
import NextImage from 'next/image'
import ModalVideo from 'react-modal-video'

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

export default function Home({ ...props }) {
  const [isOnMobile, setMobile] = useState()
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [isVideoModalOpen, setVideoModalOpen] = useState(false)

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
          src='/main-bg.jpg'
        />
      </View>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 10 }} className={scrolled ? 'header-wrap with-light-bg' : 'header-wrap'}>
        <Header
          isOnMobile={isOnMobile}
        />
      </div>
      <ModalVideo
        channel='youtube'
        autoplay
        isOpen={isVideoModalOpen}
        videoId='T1VQv4KivVs'
        onClose={() => setVideoModalOpen(false)}
      />
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
          <Demo isOnMobile={isOnMobile} setVideoModalOpen={() => setVideoModalOpen(true)} />
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
