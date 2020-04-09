import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function RestrictedRoute ({ component: Component, path, ...rest }) {

const authenticated = useSelector(state => state.user.authenticated)

return (
  <Route
    path={path}
    {...rest}
    render={(props) => { return !authenticated ? <Component {...props} /> : <Redirect to='/Home' /> }}
  />
)}

