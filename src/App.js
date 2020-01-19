import React,{ Fragment } from 'react'
import { useSelector } from 'react-redux'
import { HashRouter, Route, Switch} from 'react-router-dom'
import Register from './pages/register/Register'

export default function App() {

  const authenticated = useSelector(state => state.authenticated)
  console.log(authenticated)

  return (
    <Fragment> 
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Register} />  
        </Switch>
      </HashRouter>
    </Fragment>
         
    
  );
}

