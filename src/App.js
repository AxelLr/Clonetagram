import React,{ Fragment } from 'react'
import { useSelector } from 'react-redux'
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
//Auth Route
import ProtectedRoute from './routes/AuthRoute'
import RestrictedRoute from './routes/RestrictedRoutes'
//PAGES
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import Login from './pages/login/Login'

export default function App() {

  const authenticated = useSelector(state => state.user.authenticated)
  console.log(authenticated)

  return (
    <Fragment> 
      <HashRouter>
        <Switch>
          <RestrictedRoute path='/Register' authenticated={authenticated} component={Register} />
          <ProtectedRoute path="/Home" authenticated={authenticated} component={Home} />
          <RestrictedRoute path='/'  authenticated={authenticated}component={Login} />
        </Switch>  
      </HashRouter>
    </Fragment>
         
     
  );
}

