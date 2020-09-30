import React from 'react'

const VideoQualities = ({videoQualities, onSelectQuality}) => {
    const qualities = videoQualities

    return (
        <ul>
            <li 
            onClick={ () => {
                onSelectQuality(null)
            }}>
                Auto
            </li>
            {qualities && qualities.map( (quality) => (
              <li onClick={() => {
                onSelectQuality(quality)
              }}>
                {quality.label}
              </li>  
            ))}
        </ul>
    )
}

export default React.memo(VideoQualities)