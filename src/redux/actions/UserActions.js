import { 
      SET_SELECTED_PROFILE,
      LOADING_SUB,
      SET_FOLLOWED_USER, 
      CHANGE_PRIVACY
} from '../reducers/types'

import axios from 'axios'
import { getConnectedUser } from './AuthenticationActions'

export function getUserProfile(id, setLoading) {
    return async function(dispatch) {
        
        try {
            setLoading(true)
            const response = await axios.get(`/users/${id}`)
            dispatch({ type: SET_SELECTED_PROFILE, payload: response.data})
            setLoading(false)

        } catch (err) {
            console.log(err)
        }
    }
}

export function addUserDetails(data, setLoading, setOpen) {
    return async function(dispatch) {

        try {  
            const response = await axios.post('users/me/details',{ details: data } )
            dispatch({type: SET_SELECTED_PROFILE, payload: response.data})
            setOpen(false)
            setLoading(false)
    
        } catch (err) {
            console.log(err)
           setLoading(false)
        }
    }
}

export function followUser(user_id) {
    return async function(dispatch) {
        
        try {
           dispatch({ type: LOADING_SUB })
           const response = await axios.post(`/users/subscribe/${user_id}`)
           dispatch({type: SET_FOLLOWED_USER, payload: response.data})
           dispatch(getConnectedUser())
        } catch (err) {
            console.log(err)
        }
    }
}

export function unfollowUser(user_id) {
    return async function(dispatch) {
        
        try {
            dispatch({type: LOADING_SUB})
            console.log(user_id)
            const response = await axios.delete(`/users/unsubscribe/${user_id}`)
            dispatch({type: SET_FOLLOWED_USER, payload: response.data})
            dispatch(getConnectedUser())  
        } catch (err) {
            console.log(err)
        }
    }
}

export function setPrivacy(setLoading) {
    return async function(dispatch) {
        try {
           
            setLoading(true)
            await axios.patch('/users/privacy')
            setLoading(false)
            dispatch({type: CHANGE_PRIVACY })
            
        } catch (error) {
            console.log(error)
        }
    }
}

export function cancelRequest(user_id) { 
    return async function(dispatch) {
        try {
            const response = await axios.delete(`/users/requests/${user_id}`)
            dispatch({ type: SET_SELECTED_PROFILE, payload: response.data })
            
        } catch (error) {
            console.log(error)
        }
    }
}
