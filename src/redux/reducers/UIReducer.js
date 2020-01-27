import { SET_LOADED, SET_LOADING, SET_ERROR, CLEAR_ERROR, CLOSE_SINGLE_POST, ON_SINGLE_POST } from './types'

const initialState = {
    loading: false,
    errors: '',
    onSinglePost: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        default:
             return state
    case SET_LOADING: 
        return {
            ...state,
            loading: true
        }
    case SET_LOADED:
        return {
            ...state,
            loading: false
        }
    case SET_ERROR:
        console.log(action.payload)
        return {
            ...state,
            errors: action.payload
        }
    case CLEAR_ERROR:
        return {
            ...state,
            errors: ''
        }
    case ON_SINGLE_POST:
        return {
            ...state,
            onSinglePost: true
        }
    case CLOSE_SINGLE_POST:
        return {
            ...state,
            onSinglePost: false
        }
    }
}