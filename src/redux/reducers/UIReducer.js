import {CLOSE_SINGLE_POST,
        ON_SINGLE_POST,
        ON_HOME,
        ON_EXPLORE,
        FOCUS_OFF,
        CHANGING_PROFILE_IMAGE,
        PROFILE_IMAGE_CHANGED,
        OPEN_MENU,
        CLOSE_MENU
     } from './types'

const initialState = {
    loading: false,
    onSinglePost: false,
    onHome: null,
    changingProfileImage: false,
    openMenu: false
}

export default function(state = initialState, action) {
    switch(action.type) {
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
    case ON_HOME: 
        return {
            ...state,
            onHome: true
        }
    case ON_EXPLORE:
        return {
            ...state,
            onHome: false
        }
    case FOCUS_OFF: 
        return {
            ...state,
            onHome: null
        }
    case CHANGING_PROFILE_IMAGE:
        return {
            ...state,
            changingProfileImage: true
        }
    case PROFILE_IMAGE_CHANGED:
        return {
            ...state,
            changingProfileImage: false
        }
    case OPEN_MENU:
        console.log('WORKINGs')
        return {
            ...state,
            openMenu: true
        }
    case CLOSE_MENU:
        return {
            ...state,
            openMenu: false
        }
    default: return state
    }

}