import React from "react";
import Player from "components/Player";
import VideoControls from 'components/Player/VideoControls'

function App() {

  const autoPlay = false

  const [playing, setPlaying] = React.useState(autoPlay)

  const streamUrl = "https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8"
  const [availableQualities, setAvailableQualities] = React.useState(null)
  const [selectedQuality, setSelectedQuality] = React.useState(null)

  return (
    <div className="App">
      <Player 
        stream={streamUrl}
        availableQualities={availableQualities}
        setAvailableQualities={setAvailableQualities}
        selectedQuality={selectedQuality}
        autoPlay={autoPlay}
        isPlaying={playing}
      />
      <VideoControls
        selectedQuality={selectedQuality}
        qualities={availableQualities}
        onSelect={setSelectedQuality}
        isPlaying={playing}
        onPlayChange={ (playing) => {
          setPlaying(playing)
        }}
      />
    </div>
  );
}

export default App;
