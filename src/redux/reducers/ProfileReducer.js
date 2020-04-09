// TYPES
import { SET_SELECTED_PROFILE, SET_FOLLOWED_USER } from './types'

const initialState = { 
    profile: {}
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SET_SELECTED_PROFILE: 
        return {
            profile: { ...action.payload }
        }
        case SET_FOLLOWED_USER:
            return {
                profile: { ...action.payload }
            }  
        default: return state
    }
}