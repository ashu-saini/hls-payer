import * as React from "react";

const HlsNative = ({ stream }) => {
  const videoElem = React.useRef(null);
  return (
    <video
      ref={videoElem}
      muted={true}
      playsInline
      controls={true}
      style={{ pointerEvents: "auto" }}
    >
      <source type="video/mp4" src={stream} />
      <track kind="captions" />
    </video>
  );
};

export default React.memo(HlsNative);
