import React from 'react'
// MUI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// ICONS
import NearMeIcon from '@material-ui/icons/NearMe'
// COMPONENTS
import SearchByUsername from './components/SearchByUsername'
import NavbarButtons from './components/navbar-buttons/NavbarButtons'
import OpenMenuButton from './components/OpenMenuButton'
import DrawerNavigator from './components/DrawerNavigator'
// ROUTER
import { Link } from 'react-router-dom'

export default function Navbar() {
  
  return (
        <nav>
          <AppBar>
            <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
              <Link to='/home'>
                   <NearMeIcon 
                   fontSize='large'
                   style={{color: 'white'}}
                   />
              </Link>
              <SearchByUsername />
              <NavbarButtons />
              <OpenMenuButton />      
              <DrawerNavigator/>
            </Toolbar>
          </AppBar>
        </nav>
  )
}
