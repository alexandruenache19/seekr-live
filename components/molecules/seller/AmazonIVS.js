import React, { useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { Center, Stack } from "@chakra-ui/react";
import { FaVolumeMute } from "react-icons/fa";

function AmazonIVS({ url, setGlobalMuted, globalMuted, isOnMobile }) {
  const videoEl = useRef(null);
  const [player, setPlayer] = useState(null);
  const [muted, setMuted] = useState(
    !(globalMuted !== null && globalMuted === false)
  );

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://player.live-video.net/1.5.0/amazon-ivs-player.min.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      // eslint-disable-next-line no-undef
      if (!IVSPlayer.isPlayerSupported) {
        console.warn("The current browser does not support the IVS player.");
        return;
      }
      if (IVSPlayer.isPlayerSupported) {
        // eslint-disable-next-line no-undef
        const player = IVSPlayer.create();
        player.attachHTMLVideoElement(document.getElementById("video-player"));
        player.setAutoplay(true);
        player.load(url);
        player.play();
        player.setMuted(muted);

        setPlayer(player);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Center style={{ width: "100%", height: "100%", marginTop: 0, zIndex: 0 }}>
      {player ? (
        <Pressable
          onPress={() => {
            player && player.setMuted(!muted);
            setGlobalMuted && setGlobalMuted(!muted);
            setMuted(!muted);
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            flex: 1,
            zIndex: 4,
            borderRadius: 13,
            backgroundColor: muted ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0)"
          }}
        >
          {muted ? (
            <Center
              style={{
                width: "100%",
                height: "100%",
                flex: 1
              }}
            >
              <Center
                style={{
                  backgroundColor: "rgba(0,0,0,0.75)",
                  width: 60,
                  height: 60,
                  borderRadius: 30
                }}
              >
                <FaVolumeMute style={{ fontSize: 22, color: "#FFF" }} />
              </Center>
            </Center>
          ) : null}
        </Pressable>
      ) : null}
      <video
        id="video-player"
        style={
          isOnMobile
            ? {
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: 12
              }
            : {
                height: "100%"
              }
        }
        ref={videoEl}
        // autoplay
        autoPlay
        playsInline
      />
    </Center>
  );
}

export default AmazonIVS;
