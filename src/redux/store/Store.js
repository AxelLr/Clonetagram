// REDUX
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// REDUCERS
import AuthenticationReducer from '../reducers/AuthenticationReducer'
import PostsReducer from '../reducers/PostsReducer'
import UIReducer from '../reducers/UIReducer'
import CommentsReducer from '../reducers/CommentsReducer'
import ProfileReducer from '../reducers/ProfileReducer'
import NotificationsReducer from '../reducers/NotificationsReducer'

const reducers = combineReducers ({
    notifications: NotificationsReducer,
    comments : CommentsReducer,
    profile: ProfileReducer,
    user: AuthenticationReducer,
    data: PostsReducer,
    UI: UIReducer
})

const Store = createStore(reducers, composeWithDevTools( applyMiddleware(thunk) ))

export default Store