import { 
    AUTHENTICATED,
    UNAUTHENTICATED,
    SET_ERRORS, 
    LOADING, 
    LOADED,
    CLEAR_ERRORS, 
    USER_LOGGED, 
    SET_NEW_IMAGE,
    SET_PASSWORD_AS_TRUE, 
    SET_PASSWORD_AS_FALSE, 
    PROFILE_IMAGE_CHANGED,
    CHANGING_PROFILE_IMAGE
} from '../reducers/types'

import axios from 'axios'
import { sendUserId } from './SocketManager'

export const setToken = (token) => {
    localStorage.setItem('x-auth-token', token)
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('x-auth-token')
}

export function getConnectedUser(history) {
        return async function(dispatch) {
            try {
                dispatch({type: LOADING})
                const response = await axios.get('/users/me')
                dispatch({type: USER_LOGGED, payload: response.data})
                dispatch({type: LOADED})
                dispatch({type: AUTHENTICATED})
                dispatch(sendUserId(response.data._id))
            } catch (err) {
               if(err.response.data.msg === 'invalid token') {
                   dispatch({ type: UNAUTHENTICATED})
                   localStorage.removeItem('x-auth-token')
                   history.push('/')
               }
            }
        }
}

export function registerUser(values, setSubmitting) {
        return async function(dispatch) {
            try {
                const response = await axios.post('/user/register', values)
                dispatch({type: CLEAR_ERRORS})
                setToken(response.data.token)
                await dispatch(getConnectedUser())
                setSubmitting(false)       
            } catch (err) {
                dispatch({ type: SET_ERRORS, payload: err.response.data.errors })   
                setSubmitting(false)
            }  
        }
}

export function loginUser (values, setSubmitting, setOpenDialog, setTryCount) {
    return async function(dispatch) {
        try {
            const response = await axios.post('/user/login', values)  
            setToken(response.data.token)
            dispatch({type: CLEAR_ERRORS})   
            await dispatch(getConnectedUser())
         
         
        } catch (err) {  
            setSubmitting(false)
            dispatch({type: SET_ERRORS, payload: err.response.data.error })
            err.response.data.error === 'Credenciales incorrectas. Por favor, intenta de nuevo.' && setTryCount(state => state + 1)
            if(err.response.data.hasPassword === false) {
                setOpenDialog(true)
                dispatch({type: SET_PASSWORD_AS_FALSE })
            }
        }
    }
}

export function logOutUser () {
    return async function(dispatch) {
        localStorage.removeItem('x-auth-token')
        delete axios.defaults.headers.common['Authorization']
        dispatch ({ type: UNAUTHENTICATED })
    }
}

export function editProfileImage (newImage) {
    return async function(dispatch) {
        try {
            dispatch({type: CHANGING_PROFILE_IMAGE})
            const response = await axios.put('/users/image', newImage, {
                headers: {
                'content-type': 'multipart/form-data'
                }
            })
            dispatch({type: SET_NEW_IMAGE, payload: response.data })
            dispatch({ type: PROFILE_IMAGE_CHANGED })
            
        } catch (err) {
            dispatch({type: PROFILE_IMAGE_CHANGED})
            console.log(err)
        }
    }
}

export function checkEmail(email, setSubmitting, setOpenDialog) {
    return async function(dispatch) {
        try {
            const response = await axios.post('/user/checkEmail', email)
            setSubmitting(false)
            dispatch({type: CLEAR_ERRORS})

            if(response.data.hasPassword) { dispatch({type: SET_PASSWORD_AS_TRUE }) } else {
                dispatch({type: SET_PASSWORD_AS_FALSE})
                setOpenDialog(true)
            }   

        } catch (error) {
            setSubmitting(false)
            console.log(error)
            dispatch({type: SET_ERRORS, payload: error.response.data.error })
        }
    }
}

export function resetPassword(email, setHandleReset, setOpen) {
    return async function() {
        try {
           setHandleReset(state => { return { ...state, loading: true } }) 
           await axios.post('/user/forgotPassword', { email }) 
           setHandleReset({ loading: false, success: true }) 
           setOpen(false)

        } catch (error) {
            console.log(error)
        }
    }
}

export function getUserByToken(token, setHandleReset, history) {
    return async function() {
        try {
            const response = await axios.get(`/user/reset/${token}`)
            setHandleReset({ user: response.data.email, success: true })

        } catch (error) {
            if(error.response.status === 401) {
                setHandleReset({user: null, success: false })
                setTimeout(() => history.push('/'), 1500)
            }
        }
    }
}

export function updatePassword(password, handleReset,setHandleReset, setSubmitting, history) {
    return async function() {
        try {
            await axios.patch('/user/reset/password', { password, email: handleReset.user })
            
            setHandleReset({...handleReset, updated: true })
            
            setTimeout(() => { 

                setSubmitting(false)
                history.push('/')
                
            }, 1500)

        } catch (error) {
            console.log(error)
            setSubmitting(false)
        }
    }
}