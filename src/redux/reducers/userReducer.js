import { AUTHENTICATED, SET_ERRORS, LOADING, LOADED } from './types'

const initialState= {
    loggedUser: {},
    authenticated: false,
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
        case SET_ERRORS: 
            return {
                ...state,
                errors: action.payload
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
        default: return state
    }
}