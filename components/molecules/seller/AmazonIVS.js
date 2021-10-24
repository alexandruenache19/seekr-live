import React, { useEffect, useRef, useState } from 'react'
import { Pressable, View } from 'react-native'
import {
  Center
} from '@chakra-ui/react'
import { FaVolumeMute } from 'react-icons/fa'

function AmazonIVSWorkaround ({ url }) {
  const videoEl = useRef(null)
  const [player, setPlayer] = useState(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://player.live-video.net/1.0.0/amazon-ivs-player.min.js'
    script.async = true

    document.body.appendChild(script)

    script.onload = () => {
      // eslint-disable-next-line no-undef
      if (IVSPlayer.isPlayerSupported) {
        // eslint-disable-next-line no-undef
        const player = IVSPlayer.create()
        player.attachHTMLVideoElement(document.getElementById('video-player'))
        player.load(url)
        player.play()
        player.setMuted(true)

        setPlayer(player)
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <View style={{ width: '100%', height: '100%' }}>
      {player ? (
        <Pressable
          onPress={() => {
            player && player.setMuted(!muted)
            setMuted(!muted)
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            flex: 1,
            zIndex: 4,
            borderRadius: 20,
            backgroundColor: muted ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)'
          }}
        >
          {muted ? (
            <Center style={{
              width: '100%',
              height: '100%',
              flex: 1
            }}
            >
              <Center style={{ backgroundColor: 'rgba(0,0,0,0.75)', width: 60, height: 60, borderRadius: 30 }}>
                <FaVolumeMute style={{ fontSize: 22, color: '#FFF' }} />
              </Center>
            </Center>
          ) : null}
        </Pressable>
      ) : null}
      <video id='video-player' style={{ height: '127%', marginTop: '-10vh' }} ref={videoEl} autoplay playsInline />
    </View>
  )
}

export default AmazonIVSWorkaround
