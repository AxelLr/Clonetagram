import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import axios from 'axios'
// ROUTES
import ProtectedRoute from './hoc/ProtectedRoutes'
import RestrictedRoute from './hoc/RestrictedRoutes'
// REDUX
import { logOutUser } from './redux/actions/AuthenticationActions'
import { useDispatch } from 'react-redux'
//PAGES
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import FullPost from './pages/fullpost/FullPost'
import Profile from './pages/profile/Profile'
import NotFound from './pages/notfound/NotFound'
import Redirecting from './pages/Redirecting/Redirecting'
import ResetPassword from './pages/reset-password/ResetPassword'
// ACTIONS
import { getConnectedUser } from './redux/actions/AuthenticationActions'
import decodeToken from './util/jwtDecode'
// TYPES
import { AUTHENTICATED } from './redux/reducers/types'

 function App({ history }) {

  axios.defaults.baseURL = 'http://localhost:5000/api'
  
// 'https://clonetagram.herokuapp.com/api'

  const dispatch = useDispatch()

  let token = localStorage.getItem('x-auth-token')

  if(token) {    

  const { decoded, invalidToken } = decodeToken(token)
  axios.defaults.headers.common['Authorization'] = token   

    if(!invalidToken) { 
      dispatch({type: AUTHENTICATED })
      dispatch(getConnectedUser(history))
      decoded.exp * 1000 < Date.now() && dispatch(logOutUser()) 
    } 
  } 

  // RESTRICTED: RUTAS INACCESIBLES UNA VEZ AUTENTICADO
  // PROTECTED: RUTAS INACCESIBLES AL NO ESTAR AUTENTICADO
  return (
    <> 
        {/* ACA VAN LOS CHATS PRIVADOS */}
        <Switch>
          <RestrictedRoute exact path='/Register' component={Register} />
          <ProtectedRoute exact path="/Home"       component={Home} />
          <RestrictedRoute exact path='/'          component={Login} />
          <ProtectedRoute exact path='/users/:id'  component={Profile} />
          <ProtectedRoute exact path='/posts/:id'  component={FullPost} />
          <RestrictedRoute exact path='/redirecting/:token' component={Redirecting} />
          <RestrictedRoute exact path='/resetPassword/:token' component={ResetPassword} />
          <Route exact path='*' component={NotFound} /> 
        </Switch>  
    </>
  )
}

export default withRouter(App)