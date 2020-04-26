import React from 'react'

export default function Avatar({ height, width, src, alt, onClick, pointer }) {
    return (
        <img
            onClick={onClick}
            alt={alt}
            src={src} 
            style={{borderRadius: '50%', margin: 10, width: width, height: height, cursor: pointer && 'pointer'}}
        />
    )
}
