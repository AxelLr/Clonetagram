import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
// REDUX
import { Provider } from 'react-redux'
import Store from './redux/store/Store'
import './index.scss'
// MUI 
import { ThemeProvider } from '@material-ui/styles'
import theme from './util/MuiTheme'
// ROUTER
import { HashRouter } from 'react-router-dom'

ReactDOM.render(
  <HashRouter> 
    <ThemeProvider theme={theme}>  
      <Provider store={Store}> 
          <App /> 
      </Provider>
    </ThemeProvider>
  </HashRouter>    
, document.getElementById('root'))

serviceWorker.unregister()
