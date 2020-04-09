import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// REDUX
import { useSelector } from 'react-redux'

export default function ProtectedRoute ({ component: Component, path, ...rest }) {

const authenticated = useSelector(state => state.user.authenticated)

return (
  <Route 
    path={path}
    {...rest}
    render={(props) => { return authenticated ? <Component {...props} /> : <Redirect to='/' />}}
  />
)}
