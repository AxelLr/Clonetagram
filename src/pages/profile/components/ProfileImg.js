import React from 'react'
// REDUX
import { useSelector } from 'react-redux'
// MUI
import CircularProgress from '@material-ui/core/CircularProgress'

export default function ProfileImg({ src }) {

    const loading = useSelector(state => state.UI.changingProfileImage)

    if(loading) return <CircularProgress size={130} /> 

    return (
            <img src={src} alt='profile'/> 
    )
}



