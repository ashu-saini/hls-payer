import React from 'react'
import VideoQualities from 'components/Player/VideoQualities'

const VideoControls = ({qualities, onSelect, isPlaying, onPlayChange}) => {
    
    const handlePlayPause = () => {
        if(isPlaying) {
            onPlayChange(false)
        } else {
            onPlayChange(true)
        }
    }

    return (
        <ul>
            <li onClick={handlePlayPause}>
                {isPlaying ? 'pause' : 'play'}
            </li>
            <li>
                <VideoQualities
                    videoQualities={qualities}
                    onSelectQuality={onSelect}
                />
            </li>
        </ul>
    )
}

export default VideoControls