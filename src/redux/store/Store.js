import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from '../reducers/userReducer'
import thunk from 'redux-thunk'

const middleWare = applyMiddleware(thunk)

const reducers = combineReducers ({
    user: userReducer,
    // data: dataReducer,
    // UI: UIReducer
})

const Store = createStore(reducers, middleWare)

 export default Store