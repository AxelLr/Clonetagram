import { AUTHENTICATED, UNAUTHENTICATED, SET_ERRORS, LOADING, LOADED,
     CLEAR_ERRORS, USER_LOGGED, SET_SELECTED_PROFILE,
      LOADING_SUB, LOADED_SUB, SET_FOLLOWED_USER, LOADING_PROFILE, PROFILE_LOADED } from '../reducers/types'
import axios from 'axios'

axios.defaults.baseURL = 'https://clonetagram.herokuapp.com/api'

//SET TOKEN IN LOCALSTORAGE
const setToken = (token) => {
    localStorage.setItem('x-auth-token', token)
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('x-auth-token')
}

export function getConnectedUser() {
        return async function(dispatch) {
            try {
                dispatch({type: LOADING})
                const response = await axios.get('/users/me')
                dispatch({type: USER_LOGGED, payload: response.data})
                dispatch({type: LOADED})
                dispatch({type: LOADED_SUB}) 
            } catch (err) {
                console.log(err)     
            }
        }
}

export function registerUser(values, history) {
        return async function(dispatch) {

            dispatch({type: LOADING})

            try {
                const response = await axios.post('/user/register', values)
                
                dispatch({type: LOADED})
                setToken(response.data.token)
                dispatch({ type: AUTHENTICATED })
                dispatch({type: CLEAR_ERRORS})
                history.push('/Home')
            } catch (err) {
                dispatch({ type: SET_ERRORS, payload: err.response.data.errors })   
                dispatch({type:LOADED})
            }  
        }
}

export function loginUser (values, history) {
    return async function(dispatch) {

        dispatch({ type: LOADING })

        try {
            const response = await axios.post('/user/login', values)
            dispatch({type: LOADED})
            setToken(response.data.token)
            dispatch({type: AUTHENTICATED})
            dispatch({type: CLEAR_ERRORS})
            history.push('/Home')            
        } catch (err) {
            dispatch({ type: SET_ERRORS, payload: err.response.data.errors })   
            dispatch({type:LOADED})
        }
    }
}

export function logOutUser (history) {

    return async function(dispatch) {
        localStorage.removeItem('x-auth-token')
        delete axios.defaults.headers.common['Authorization']
        dispatch ({ type: UNAUTHENTICATED })
        history.push('/')
    }
}

export function editProfileImage (newImage, setLoading) {
    return async function(dispatch) {

        try {
         const response = await axios.put('/users/image', newImage, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
         dispatch({type: SET_SELECTED_PROFILE, payload: response.data})
         setLoading(false)
            
        } catch (err) {
            console.log(err)
        }
    }
}

export function getUserProfile(id) {
    return async function(dispatch) {
        
        try {
        
        dispatch({type: LOADING_PROFILE})
        const response = await axios.get(`/users/${id}`)
        dispatch({type: PROFILE_LOADED})

        dispatch({ type: SET_SELECTED_PROFILE, payload: response.data})

        } catch (err) {
            console.log(err)
        }
    }
}

export function addUserDetails(data, setLoading) {
    return async function(dispatch) {

        try {  
            const response = await axios.post('users/me/details',{ details: data } )
            dispatch({type: SET_SELECTED_PROFILE, payload: response.data})
            setLoading(false)
    
        } catch (err) {
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