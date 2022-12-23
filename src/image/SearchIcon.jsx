import React from 'react'

const SearchIcon = ({sx, width, height}) => {
    return (
        <svg aria-label="Search and explore" className={sx} color="#262626" fill="#262626" height={height} role="img"
             viewBox="0 0 24 24" width={width}>
            <path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor"
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  x1="16.511" x2="22" y1="16.511" y2="22"></line>
        </svg>
    )
}

export default SearchIcon