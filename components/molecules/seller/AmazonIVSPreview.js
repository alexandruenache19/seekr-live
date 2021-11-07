import React, { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Center } from '@chakra-ui/react';
import { FaVolumeMute } from 'react-icons/fa';

function AmazonIVSPreview({ url, id }) {
  const videoEl = useRef(null)
  const [player, setPlayer] = useState(null)
  const [muted, setMuted] = useState(true)
  const videoID = 'video-player' + id
  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://player.live-video.net/1.0.0/amazon-ivs-player.min.js';
    script.async = true

    document.body.appendChild(script)

    script.onload = () => {
      // eslint-disable-next-line no-undef
      if (IVSPlayer.isPlayerSupported) {
        // eslint-disable-next-line no-undef
        const player = IVSPlayer.create()
        player.attachHTMLVideoElement(document.getElementById(videoID))
        player.load(url)
        player.play()
        player.setMuted(true)

        setPlayer(player)
      }
    }

    return () => {
      document.body.removeChild(script)
    };
  }, [])

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <video
        id={videoID}
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          borderRadius: 15
        }}
        ref={videoEl}
        autoplay
        autoPlay
        playsInline
      />
    </View>
  )
}

export default AmazonIVSPreview
