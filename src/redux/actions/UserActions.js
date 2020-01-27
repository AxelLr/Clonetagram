import { AUTHENTICATED, UNAUTHENTICATED, SET_ERRORS, LOADING, LOADED,
     CLEAR_ERRORS, USER_LOGGED, SET_SELECTED_PROFILE, SET_LOADING, SET_LOADED } from '../reducers/types'
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
                const response = await axios.get('/users/me')
                dispatch({type: USER_LOGGED, payload: response.data})
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
                console.log(err.response.data.errors)
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
            console.log(err)
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

export function editProfileImage (newImage, id) {
    return async function(dispatch) {

        try {
         await axios.put('/users/image', newImage, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
         dispatch(getUserProfile(id))
            
        } catch (err) {
            console.log(err)
        }
    }
}

export function getUserProfile(id) {
    return async function(dispatch) {
        
        try {

        const response = await axios.get(`/users/${id}`)

        dispatch({ type: SET_SELECTED_PROFILE, payload: response.data})

        } catch (err) {
            console.log(err)
        }
    }
}

export function addUserDetails(data, id) {
    return async function(dispatch) {

        try { 
            dispatch({type: SET_LOADING })
            await axios.post('users/me/details',{ details: data } )
            dispatch(getUserProfile(id))
            dispatch({type: SET_LOADED })
            
        } catch (err) {
            dispatch({type: SET_LOADED })
        }
    }
}

export function followUser(user_id) {
    return async function(dispatch) {
        
        try {
           dispatch({ type: LOADING })
           await axios.post(`/users/subscribe/${user_id}`)
           dispatch(getUserProfile(user_id))
           dispatch(getConnectedUser())
           dispatch({type: LOADED}) 
           
        } catch (err) {
            console.log(err)
        }
    }
}

export function unfollowUser(user_id) {
    return async function(dispatch) {
        
        try {
            dispatch({type: LOADING})
            console.log(user_id)
            await axios.delete(`/users/unsubscribe/${user_id}`)
            dispatch(getUserProfile(user_id))
            dispatch(getConnectedUser())
            dispatch({type: LOADED})
  
        } catch (err) {
            console.log(err)
        }
    }
}