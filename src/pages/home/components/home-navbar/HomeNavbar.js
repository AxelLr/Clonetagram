import React,{ useEffect } from 'react'
// REDUX
import { useSelector, useDispatch } from 'react-redux'
import { getConnectedUser, logOutUser } from '../../../../redux/actions/AuthenticationActions'
// MUI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// COMPONENTS
import SearchByUsername from '../home-navbar/components/SearchByUsername'
import UserData from './components/UserData'
import NavbarButtons from './components/navbar-buttons/NavbarButtons'

export default function HomeNavbar({ handlePosts, setHandlePosts, history}) {
  
  const connectedUser = useSelector(state => state.user.loggedUser)
  const loading = useSelector(state => state.user.loading)
  const dispatch = useDispatch()
 
  const handleLogOut = () => {
    dispatch(logOutUser(history))
  }

  return (
    <nav>
      <AppBar>
        <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
          <UserData loading={loading} connectedUser={connectedUser} history={history}/>
          <SearchByUsername />
          <NavbarButtons handlePosts={handlePosts} setHandlePosts={setHandlePosts} handleLogOut={handleLogOut} />      
        </Toolbar>
      </AppBar>
    </nav>
  );
}
