import React from 'react'

const CommentSvg = ({height, width, sx}) => {
    return (
        <>

            <svg aria-label="Comment" style={sx} color="#262626" fill="#262626" height={height} role="img"
                 viewBox="0 0 24 24" width={width}>
                <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor"
                      strokeLinejoin="round" strokeWidth="2"></path>
            </svg>

        </>
    )
}

export default CommentSvg