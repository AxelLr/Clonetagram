import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from '../reducers/userReducer'
import dataReducer from '../reducers/DataReducer'
import UIReducer from '../reducers/UIReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers ({
    user: userReducer,
    data: dataReducer,
    UI: UIReducer
})

const Store = createStore(reducers, applyMiddleware(thunk))

 export default Store