import React, { useEffect, useRef } from "react";

function AmazonIVSWorkaround({ url }) {
  const videoEl = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://player.live-video.net/1.0.0/amazon-ivs-player.min.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      // eslint-disable-next-line no-undef
      if (IVSPlayer.isPlayerSupported) {
        // eslint-disable-next-line no-undef
        const player = IVSPlayer.create();
        player.attachHTMLVideoElement(document.getElementById("video-player"));
        player.load(url);
        player.play();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <video id="video-player" ref={videoEl} autoPlay />;
}

export default AmazonIVSWorkaround;
