import { SET_LOADED, SET_LOADING, SET_ERROR, CLEAR_ERROR, 
    CLOSE_SINGLE_POST, DELETING, DELETED,
     ON_SINGLE_POST, UPLOADING, UPLOADED, LOADING_SUB, LOADED_SUB, LOADING_PROFILE, PROFILE_LOADED } from './types'

const initialState = {
    loading: false,
    errors: '',
    onSinglePost: false,
    uploading: false,
    deleting: false,
    loadingSubscription: false,
    loadingProfile: false
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
    case UPLOADING: 
        return {
            ...state,
            uploading: true
        }
    case UPLOADED: 
        return {
            ...state,
            uploading: false
        }
    case DELETING: 
        return {
            ...state,
            deleting: true
        }
    case DELETED: 
        return {
            ...state,
            deleting: false
        }
    case LOADING_SUB:
        return {
            ...state,
            loadingSubscription: true
        }
    case LOADED_SUB:
        return {
            ...state,
            loadingSubscription: false
        }
    case LOADING_PROFILE:
        return {
            ...state,
            loadingProfile: true
        }
    case PROFILE_LOADED:
        return {
            ...state,
            loadingProfile: false
        }
    }
}