import { 
      SET_SELECTED_PROFILE,
      CHANGE_PRIVACY,
      ADD_TO_REQUESTS,
      FOLLOW_USER,
      UNFOLLOW_USER,
      DELETE_REQUEST
} from '../reducers/types'
import axios from 'axios'

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

export function followUser(user_id, setLoading, privateUser, usersData) {
    return async function(dispatch) {
        try {
            setLoading(true)
            await axios.post(`/users/subscribe/${user_id}`)
            privateUser ? dispatch({type: ADD_TO_REQUESTS, payload: usersData }) : dispatch({type: FOLLOW_USER, payload: usersData})
            setLoading(false)

        } catch (err) {
            console.log(err)
        }
    }
}
// change
export function unfollowUser(user_id, setLoading, _id) {
    return async function(dispatch) {
        try {
            setLoading(true)
            await axios.delete(`/users/unsubscribe/${user_id}`)
            dispatch({type: UNFOLLOW_USER, payload: { user_id, _id } })
            setLoading(false)

        } catch (err) {
            console.log(err)
        }
    }
}

// ALTERAR
export function cancelRequest(user_id, setLoading) { 
    return async function(dispatch) {
        try {
            setLoading(true)
            const response = await axios.delete(`/users/requests/cancel/${user_id}`)
            dispatch({ type: SET_SELECTED_PROFILE, payload: response.data })
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
}

export function ignoreRequest(follower_id, setLoading) {
    return async function(dispatch) {
        try {
            setLoading(true)
            await axios.delete(`/users/requests/ignore/${follower_id}`)
            dispatch({type: DELETE_REQUEST, payload: follower_id })
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            dispatch({type: DELETE_REQUEST, payload: follower_id })
            setLoading(false)
        }
    }
}

export function acceptRequest(follower_id, setLoading ) {
    return async function(dispatch) {
        try {
             setLoading(true)
             await axios.patch(`/users/requests/accept`, { follower_id }  )
             dispatch({type: DELETE_REQUEST , payload: follower_id })
             setLoading(false)

        } catch (error) {
            console.log(error)
            dispatch({type: DELETE_REQUEST , payload: follower_id })
            setLoading(false)
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
