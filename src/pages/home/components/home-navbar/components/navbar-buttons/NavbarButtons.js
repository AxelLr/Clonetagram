import React from 'react'
// MUI
import Button from '@material-ui/core/Button'
import PublicIcon from '@material-ui/icons/Public'
import HomeIcon from '@material-ui/icons/Home'
// COMPONENTS
import Notifications from './components/Notifications'

export default function NavbarButtons({ handlePosts, setHandlePosts }) {

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
              <Notifications />
              <Button onClick={() => setHandlePosts(true) } variant="contained" style={{backgroundColor: handlePosts ? '#e5e5e5' : '#121212'}}>
                < HomeIcon style={{color: '#888888'}} />
              </Button>
              
              <Button onClick={() => setHandlePosts(false) } variant="contained" style={{backgroundColor: handlePosts ? '#121212' : '#e5e5e5'}} >
               < PublicIcon style={{color: '#888888'}} />
              </Button>
        </div>
    )
}
