import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, authenticated, path, ...rest }) => {

return (
  <Route
    path={path}
    {...rest}
    render={(props) => { return authenticated ? <Component {...props} /> : <Redirect to='/' /> 
    }}
  />
)};

export default ProtectedRoute