import React from 'react'

const VideoCallIcon = ({sx, width, height}) => {
    return (
        <>
            <svg aria-label="Video Call" style={sx} color="#262626" fill="#262626" height={height} role="img"
                 viewBox="0 0 24 24" width={width}>
                <rect fill="none" height="18" rx="3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth="2" width="16.999" x="1" y="3"></rect>
                <path d="M17.999 9.146l2.495-2.256A1.5 1.5 0 0123 8.003v7.994a1.5 1.5 0 01-2.506 1.113L18 14.854"
                      fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth="2"></path>
            </svg>
        </>
    )
}

export default VideoCallIcon