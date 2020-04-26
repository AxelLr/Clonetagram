import { 
    AUTHENTICATED,
    SET_ERRORS, 
    LOADING, 
    LOADED,
    USER_LOGGED, 
    UNAUTHENTICATED,
    CLEAR_ERRORS, 
    CHANGE_PRIVACY,
    SET_PASSWORD_AS_FALSE,
    SET_PASSWORD_AS_TRUE,
    SET_USER_SOCKET,
    SET_UPDATED_USERS,
    SET_NEW_IMAGE,
    DELETE_REQUEST,
    FOLLOW_USER,
    UNFOLLOW_USER,
    ADD_REQUEST
} from './types'

const initialState = {
    loggedUser: {},
    authenticated: false,
    userHasPassword: null,
    loading: false,
    errors: '',
    userSocket: ''
}

export default function (state = initialState, action) {
    switch(action.type) {
        case AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case UNAUTHENTICATED: 
            return {
                ...state,
                authenticated: false
            }
        case LOADING: 
            return {
                ...state,
                loading: true
            }
        case LOADED:
            return {
                ...state,
                loading: false
            }
        case USER_LOGGED: {
            return {
                ...state,
                loggedUser: { ...action.payload }
            }
        }
        case SET_ERRORS: 
        return {
            ...state,
            errors: action.payload 
        }
        case CLEAR_ERRORS: 
            return {
                ...state,
                errors: ''
            }
        case SET_PASSWORD_AS_TRUE:
            return {
                ...state,
                userHasPassword: true
            }
        case SET_PASSWORD_AS_FALSE:
            return {
                ...state,
                userHasPassword: false
            }
        case CHANGE_PRIVACY:
            return {
                ...state,
                loggedUser: { ...state.loggedUser, private: !state.loggedUser.private }
            }
        case SET_USER_SOCKET:
            return {
                ...state,
                userSocket: action.payload
            }
        case SET_UPDATED_USERS: 
            return {
                ...state,
                loggedUser: { ...state.loggedUser, ...action.payload.follower }
            }
        case SET_NEW_IMAGE: 
            return {
                ...state,
                loggedUser: { ...state.loggedUser, profileImg: action.payload.profileImage }
            }
        case DELETE_REQUEST: 
            return {
                ...state,
                loggedUser: { ...state.loggedUser, followUpRequests: state.loggedUser.followUpRequests.filter(req => req.follower_id._id !== action.payload)}
            }
        case FOLLOW_USER: 
        let { _id } = action.payload.userProfile
            return {
                ...state,
                loggedUser: { ...state.loggedUser, subscriptions: [ { user_id: { _id  }} , ...state.loggedUser.subscriptions ]}
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                loggedUser: { ...state.loggedUser, subscriptions: state.loggedUser.subscriptions.filter(sub => sub.user_id._id !== action.payload.user_id) }
            }
        case ADD_REQUEST: {
            console.log(action.payload)
         let { sender, senderName, senderAvatar, createdAt } = action.payload

         let newRequest = {
             _id: sender,
             username: senderName,
             profileImg: senderAvatar,
             createdAt
         }
            return {
                ...state,
                loggedUser: {...state.loggedUser, followUpRequests: [ { follower_id: newRequest }, ...state.loggedUser.followUpRequests]}
            }
        }
        default: return state
    }
}