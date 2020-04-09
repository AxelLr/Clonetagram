import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function LoadingAuthentication() {
    return (
        <div style={{
            position: 'absolute',
            height: '100vh',
            width: '100%',
            opacity: .75,
            backgroundColor: '#e5e5e5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
           
        }}>
            <CircularProgress size={60} color='primary' />
        </div>
    )
}

