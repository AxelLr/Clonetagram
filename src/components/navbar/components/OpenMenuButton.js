import React from 'react'
// MUI
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
// COMPONENTS
import Notifications from './navbar-buttons/components/notifications/Notifications'
// REDUX
import { OPEN_MENU } from '../../../redux/reducers/types'
import { useDispatch } from 'react-redux'


export default function OpenMenuButton() {

    const dispatch = useDispatch()


    return (
        <div className='open-menu-button'>
            <Notifications />
            <IconButton
                onClick={() => dispatch({type: OPEN_MENU })}
                color="inherit"
                aria-label="open drawer"
                edge="start"
            >
                <MenuIcon />
             </IconButton>
      </div>
    )
}
