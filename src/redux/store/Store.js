import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import userReducer from '../reducers/userReducer'
import dataReducer from '../reducers/DataReducer'
import UIReducer from '../reducers/UIReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers ({
    user: userReducer,
    data: dataReducer,
    UI: UIReducer
})

const Store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  ))

 export default Store