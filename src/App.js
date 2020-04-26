import React, { useEffect } from 'react'
import axios from 'axios'
// ROUTES
import { Switch, Route, withRouter } from 'react-router-dom'
import ProtectedRoute from './hoc/ProtectedRoutes'
import RestrictedRoute from './hoc/RestrictedRoutes'
// REDUX
import { logOutUser } from './redux/actions/AuthenticationActions'
import { useDispatch, useSelector } from 'react-redux'
//PAGES
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import FullPost from './pages/fullpost/FullPost'
import Profile from './pages/profile/Profile'
import NotFound from './pages/notfound/NotFound'
import Redirecting from './pages/Redirecting/Redirecting'
import ResetPassword from './pages/reset-password/ResetPassword'
import Explore from './pages/explore/Explore'
// COMPONENTS
import Navbar from './components/navbar/Navbar'
// ACTIONS
import { getConnectedUser } from './redux/actions/AuthenticationActions'
import decodeToken from './util/jwtDecode'
// TYPES 
import { AUTHENTICATED, SET_NEW_NOTIFICATION, ADD_REQUEST } from './redux/reducers/types'

axios.defaults.baseURL = 'https://clonetagram.herokuapp.com/api' 

 function App({ history }) {

  const authenticated = useSelector(state => state.user.authenticated)
  const socket = useSelector(state => state.user.userSocket)
  const dispatch = useDispatch() 

  let token = localStorage.getItem('x-auth-token')

  if(token) {    

  const { decoded, invalidToken } = decodeToken(token)
  axios.defaults.headers.common['Authorization'] = token   

    if(!invalidToken) { 
      if(!authenticated) {
        dispatch({type: AUTHENTICATED })
        dispatch(getConnectedUser(history))
      } else {
        decoded.exp * 1000 < Date.now() && dispatch(logOutUser()) 
      }
    } 
  }

  useEffect(() => {
    if(socket) {

      socket.on('NEW_NOTIFICATION', (payload) => payload.type === 'followRequest' ? dispatch({type: ADD_REQUEST, payload }) : dispatch({ type: SET_NEW_NOTIFICATION, payload }))
    
    }
    
  }, [socket, dispatch])

  // RESTRICTED: RUTAS INACCESIBLES UNA VEZ AUTENTICADO
  // PROTECTED: RUTAS INACCESIBLES AL NO ESTAR AUTENTICADO
  return (
    <> 
        { authenticated && <Navbar history={history} /> } 
        <Switch>
          <RestrictedRoute exact path='/Register' component={Register} />
          <ProtectedRoute exact path="/Home"       component={Home} />
          <RestrictedRoute exact path='/'          component={Login} />
          <ProtectedRoute exact path='/users/:id'  component={Profile} />
          <ProtectedRoute exact path='/posts/:id'  component={FullPost} />
          <RestrictedRoute exact path='/redirecting/:token' component={Redirecting} />
          <RestrictedRoute exact path='/resetPassword/:token' component={ResetPassword} />
          <ProtectedRoute exact path='/explore' component={Explore} />
          <Route exact path='*' component={NotFound} /> 
        </Switch>  
    </>
  )
}

export default withRouter(App)