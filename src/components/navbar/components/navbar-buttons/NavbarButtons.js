import React from 'react'
// MUI
import PublicIcon from '@material-ui/icons/Public'
import HomeIcon from '@material-ui/icons/Home'
// COMPONENTS
import Notifications from './components/notifications/Notifications'
import Avatar from '../../../Avatar'
// ROUTER
import { Link } from 'react-router-dom'
// REDUX
import { useSelector } from 'react-redux'
// UTIL
import noProfileImg from '../../../../util/images/noprofileimg2.png'

export default function NavbarButtons() {
    
  const loggedUser = useSelector(state => state.user.loggedUser)
  const loading = useSelector(state => state.user.loading)
  const onHome = useSelector(state => state.UI.onHome)
  
  return (
        <div className='navbar-buttons'>

            <Notifications />

            <Link to={'/home'}>    
                  < HomeIcon style={{color: onHome ? 'white' : '#888888' }} />
            </Link>

            <Link to={'/explore'}>  
                  < PublicIcon style={{color: onHome === false ? 'white' : '#888888', margin: '0px 8px'}} />
            </Link>

          { loading ?

              <Avatar 
                  alt='no-profile' 
                  src={noProfileImg} 
                  width={40}
                  height={40}
              /> 
          :
              <Link to={`/users/${loggedUser._id}`}>
                  <Avatar
                      alt='profile' 
                      src={loggedUser.profileImg}
                      width={40}
                      height={40}
                      pointer
                  />
              </Link>
          }
        </div>
    )
}
