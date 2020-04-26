import { SET_NOTIFICATIONS, SET_NEW_NOTIFICATION, MARK_NOTIFICATIONS_AS_READED } from './types'
const initialState = { 
    notifications: []
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SET_NOTIFICATIONS: 
            return {
                notifications: action.payload
            }
        case SET_NEW_NOTIFICATION:
            console.log(action.payload)
            return {
                notifications: [action.payload, ...state.notifications]
            }
        case MARK_NOTIFICATIONS_AS_READED: 
        console.log('EXEC')
            return {
                notifications: state.notifications.map(notif => { return { ...notif, readed: true } }) 
            }
    default: return state
}
}