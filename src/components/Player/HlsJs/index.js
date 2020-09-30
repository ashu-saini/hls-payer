import * as React from "react";
import Hls from "hls.js";
import { assign, map, get, compact, forEach, mapValues, values } from 'lodash'
import "./HlsJs.css";

const HlsJs = ({
  stream,
  selectedQuality,
  setAvailableQualities,
  autoPlay,
  isPlaying,
  onPlayChange
}) => {
  const [hls, setHls] = React.useState(null);
  const [isVideoElem, setVideoElem] = React.useState(false);

  const videoElem = React.useRef(null);
  const prevStreamRef = React.useRef("");

  // intialize hls player
  React.useEffect(() => {
    if (!Hls.isSupported()) {
      setHls(null);
      return;
    }

    const hls = new Hls();
    setHls(hls);

    return () => hls.destroy();
  }, []);

  // Attach videoElem to hls
  React.useEffect(() => {
    if (!hls) {
      return;
    }

    hls.attachMedia(videoElem.current);
    return () => {
      hls.detachMedia();
    };
  }, [hls, videoElem]);

  // Load source stream once video elem is attached
  React.useEffect(() => {
    if (!isVideoElem) {
      return;
    }

    if (prevStreamRef.current === stream) return;

    prevStreamRef.current = stream;
    // load source stream
    hls.loadSource(stream);
  }, [hls, stream, isVideoElem]);

  // Watch MEDIA_ATTACHED
  React.useEffect(() => {
    if (!hls) return;
    hls.on(Hls.Events.MEDIA_ATTACHED, (evt, data) => {
      setVideoElem(true);
    });
  }, [hls]);

  // Watch MEDIA_DETACHED
  React.useEffect(() => {
    if (!hls) return;
    hls.on(Hls.Events.MEDIA_DETACHED, (evt, data) => {
      setVideoElem(false);
    });
  }, [hls]);

  //watch for manifest load
  React.useEffect(() => {
    if (!hls) return;
    hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      console.log(
        "manifest loaded, found " + data.levels.length + " quality level"
      );

      const mapLevels = (levels) => {
        const qualityMap = {
          270: 160,
          360: 360,
          480: 480,
          720: 720,
          1080: 1080,
        }

        const mappedLevels = {}
        forEach(levels, (level, i) => {
            mappedLevels[level.height] = {
              name: level.height,
              label: level.height,
              index: i,
            }
        })
        return values(mappedLevels)
      }
      const mappedQualities = compact(mapLevels(data.levels))
      setAvailableQualities(mappedQualities)
      //   videoElem.current.play()
    });
  }, [hls]);

  React.useEffect(() => {
    if (!hls) return;

    hls.on(Hls.Events.ERROR, (evt, data) => {
      console.warn(`HLS error: ${data.type}: ${data.details}`);
      if (data.fatal) {
        //this is the basic error recovery from example
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            // recover network error
            console.warn("fatal network error encountered, try to recover");
            hls.startLoad();
            break;

          case Hls.ErrorTypes.MEDIA_ERROR:
            //recover media error
            console.warn("fatal media error encountered, try to recover");
            hls.recoverMediaError();
            break;

          default:
            // cannot recover
            console.warn("fatal error: cannot recover");
            break;
        }
      } else {
        //these errors are auto recoverable
        console.warn(`non-fatal error ${data.details}`);
      }
    });
  }, [hls]);

  React.useEffect( () => {
    if(!hls) return
    if (selectedQuality?.index) {
      hls.currentLevel = selectedQuality?.index
    } else {
      hls.currentLevel = -1
    }
  }, [hls, selectedQuality])

  React.useEffect( () => {
    if(videoElem?.current) {
      if(isPlaying) {
        videoElem.current.play()
      } else {
        videoElem.current.pause()
      }
    }
  }, [videoElem, isPlaying])

  return (
    <video
      id="mh-video-stream-player"
      ref={videoElem}
      muted={false}
      autoPlay={autoPlay}
      playsInline
      controls={false}
      style={{ pointerEvents: "auto" }}
      className="player"
    />
  );
};

export default React.memo(HlsJs);
