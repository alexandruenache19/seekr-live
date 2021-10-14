import React, { useEffect, useRef } from 'react'
import { Pressable, View } from 'react-native'
import {
  Center
} from '@chakra-ui/react'
import { FaVolumeMute } from 'react-icons/fa'

function AmazonIVSWorkaround ({ url }) {
  const videoEl = useRef(null)

  let player = null

  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://player.live-video.net/1.0.0/amazon-ivs-player.min.js'
    script.async = true

    document.body.appendChild(script)

    script.onload = () => {
      // eslint-disable-next-line no-undef
      if (IVSPlayer.isPlayerSupported) {
        // eslint-disable-next-line no-undef
        player = IVSPlayer.create()
        player.attachHTMLVideoElement(document.getElementById('video-player'))
        player.load(url)
        player.play()
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <View style={{ height: '100%', flex: 1 }}>
      {player && player.isMuted() ? (
        <Pressable
          onPress={() => player && player.setMuted(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            flex: 1,
            zIndex: 4,
            backgroundColor: 'rgba(0,0,0,0.3)'
          }}
        >
          <Center style={{
            width: '100%',
            height: '100%',
            flex: 1
          }}
          >
            <Center style={{ backgroundColor: '#000', width: 60, height: 60, borderRadius: 30 }}>
              <FaVolumeMute style={{ fontSize: 22, color: '#FFF' }} />
            </Center>
          </Center>
        </Pressable>
      ) : (
        null
      )}
      <video id='video-player' ref={videoEl} autoplay />
    </View>
  )
}

export default AmazonIVSWorkaround
