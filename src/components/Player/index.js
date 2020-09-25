import * as React from "react";
import Hls from "hls.js";
import HlsJs from "components/Player/HlsJs";
import HlsNative from "components/Player/HlsNative";

const hasNativeHlsSupport = () => {
  const videoElem = document.createElement("video");
  return videoElem.canPlayType("application/vnd.apple.mpegurl") !== "";
};

const Player = (props) => {
  const isHlsSupported = Hls.isSupported();
  if (props.stream) {
    if (isHlsSupported) {
      return <HlsJs {...props} />;
    } else if (hasNativeHlsSupport()) {
      return <HlsNative {...props} />;
    } else {
      return <div>Hls Player not supported on platform.</div>;
    }
  }
  return <div></div>;
};

export default Player;
