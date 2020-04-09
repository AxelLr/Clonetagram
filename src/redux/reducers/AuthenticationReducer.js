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
    SET_PASSWORD_AS_TRUE
} from './types'

const initialState = {
    loggedUser: {},
    authenticated: false,
    userHasPassword: null,
    loading: false,
    errors: '' 
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
        default: return state
    }
}