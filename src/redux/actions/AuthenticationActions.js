import { 
    AUTHENTICATED,
    UNAUTHENTICATED,
    SET_ERRORS, 
    LOADING, 
    LOADED,
    CLEAR_ERRORS, 
    USER_LOGGED, 
    SET_SELECTED_PROFILE,
    LOADED_SUB,
    SET_PASSWORD_AS_TRUE, 
    SET_PASSWORD_AS_FALSE 
} from '../reducers/types'

import axios from 'axios'

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
                dispatch({type: LOADED_SUB}) 
                dispatch({type: AUTHENTICATED})
            } catch (err) {
               if(err.response.data.msg === 'invalid token') {
                   dispatch({ type: UNAUTHENTICATED})
                   localStorage.removeItem('x-auth-token')
                   history.push('/')
               }
            }
        }
}

export function registerUser(values, history, setSubmitting) {
        return async function(dispatch) {

            dispatch({type: LOADING})

            try {
                const response = await axios.post('/user/register', values)
                setSubmitting(false)
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

export function loginUser (values, setSubmitting, setOpenDialog, setTryCount) {
    return async function(dispatch) {

        try {
            const response = await axios.post('/user/login', values)
            setSubmitting(false)
            setToken(response.data.token)
            dispatch(getConnectedUser())
            dispatch({type: AUTHENTICATED})
            dispatch({type: CLEAR_ERRORS})         
        } catch (err) {  
            setSubmitting(false)
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
        console.log('LOGGING OUT')
        localStorage.removeItem('x-auth-token')
        delete axios.defaults.headers.common['Authorization']
        dispatch ({ type: UNAUTHENTICATED })
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


export function checkEmail(email, setSubmitting, setOpenDialog) {
    return async function(dispatch) {
        try {
            
            const response = await axios.post('/user/aaaa', email)
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
          const response = await axios.post('/user/forgotPassword', { email }) 
          setHandleReset(state => { return {loading: false, success: true } }) 
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
            console.log(response)
            setHandleReset({ user: response.data.email, success: true })

        } catch (error) {
            if(error.response.status == '401') {
                setHandleReset({user: null, success: false })
                setTimeout(() => history.push('/'), 1500)
            }
            console.log(error.response)
        }
    }
}

export function updatePassword(password, handleReset,setHandleReset, setSubmitting, history) {
    return async function() {
        try {
            await axios.patch('/user/reset/password', { password, email: handleReset.user })
            setSubmitting(false)
            setHandleReset({...handleReset, updated: true })
            setTimeout(() => history.push('/'), 1500)
        } catch (error) {
            console.log(error)
            setSubmitting(false)
        }
    }
}