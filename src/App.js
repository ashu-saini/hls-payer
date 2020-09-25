import React from "react"
import Player from "./components/Player"

function App() {
  const stream = {
    stream: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  }
  return (
    <div className="App">
      <Player {...stream} />
    </div>
  )
}

export default App
