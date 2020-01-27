import React,{ Fragment } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
//Auth Route
import ProtectedRoute from './routes/AuthRoute'
import RestrictedRoute from './routes/RestrictedRoutes'
// REDUX
import { AUTHENTICATED } from './redux/reducers/types'
import { logOutUser } from './redux/actions/UserActions'
import { useSelector, useDispatch } from 'react-redux'
//PAGES
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import FullPost from './pages/fullpost/FullPost'
import Profile from './pages/profile/Profile'
import NotFound from './pages/notfound/NotFound'


export default function App() {

  const authenticated = useSelector(state => state.user.authenticated)

  const dispatch = useDispatch()

  let token = localStorage.getItem('x-auth-token')

  if(token) {    
  const decodedToken = jwtDecode(token)
  axios.defaults.headers.common['Authorization'] = token   
  dispatch({ type: AUTHENTICATED })

    if(decodedToken.exp * 1000 < Date.now()) {
    dispatch(logOutUser()) 
    }
  }

  return (
    <Fragment> 
      <HashRouter>
        <Switch>
          <RestrictedRoute exact path='/Register' authenticated={authenticated} component={Register} />
          <ProtectedRoute exact path="/Home"      authenticated={authenticated} component={Home} />
          <RestrictedRoute exact path='/'         authenticated={authenticated} component={Login} />
          <ProtectedRoute exact path='/users/:id' authenticated={authenticated} component={Profile} />
          <ProtectedRoute exact path='/posts/:id' authenticated={authenticated} component={FullPost} />
          <Route exact path='*' component={NotFound} /> 
        </Switch>  
      </HashRouter>
    </Fragment>
  );
}

