import { SET_NOTIFICATIONS } from './types'
const initialState = { 
    notifications: []
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SET_NOTIFICATIONS: 
            return {
                notifications: action.payload
            }
    default: return state
}
}