// TYPES
import { SET_SELECTED_PROFILE, SET_UPDATED_USERS, SET_NEW_IMAGE, ADD_TO_REQUESTS, FOLLOW_USER, UNFOLLOW_USER } from './types'

const initialState = { 
    profile: {}
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SET_SELECTED_PROFILE: 
        return {
            profile: { ...action.payload }
        }
        case SET_UPDATED_USERS: 
            return {
                profile: { ...state.profile, ...action.payload.followed }
            }
        case SET_NEW_IMAGE: 
            return {
                profile: { ...state.profile, profileImg: action.payload.profileImage }
            }
        case ADD_TO_REQUESTS:
            let { _id } = action.payload.connectedUser
            return {
                profile: { ...state.profile, followUpRequests: [ { follower_id: {  _id } } ,...state.profile.followUpRequests]}
            }
        case FOLLOW_USER: {
            let { _id, username, profileImg } = action.payload.connectedUser
            return {
                profile: { ...state.profile, followers: [ { user_id: { _id, username, profileImg } }, ...state.profile.followers ]}
            }
        }
        case UNFOLLOW_USER: 
            return {
                profile: { ...state.profile, followers: state.profile.followers.filter(foll => foll.user_id._id !== action.payload._id)}
            }
        default: return state
    }
}