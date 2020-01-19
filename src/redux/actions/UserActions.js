import { AUTHENTICATED, SET_ERRORS, LOADING, LOADED, CLEAR_ERRORS } from '../reducers/types'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost5000/api'

//SET TOKEN IN LOCALSTORAGE
const setToken = (token) => {
    const collectedToken = token
    localStorage.setItem('x-auth-token', collectedToken)
    axios.defaults.headers.common['x-auth-token'] = token
}

export function getConnectedUser() {
        return async function(dispatch) {
            const response = await axios.get('http://localhost:5000/api/users/me')
            console.log(response.data)
        }
}

export function registerUser(values, history) {
        return async function(dispatch) {

            dispatch({type: LOADING})

            try {
                const response = await axios.post('http://localhost:5000/api/user/register', values)
                
                dispatch({type: LOADED})
                setToken(response.data.token)
                dispatch({ type: AUTHENTICATED })
                dispatch(getConnectedUser())
                dispatch({type: CLEAR_ERRORS})
                history.push('/Home')
            } catch (err) {
                console.log(err.response.data.errors)
                dispatch({ type: SET_ERRORS, payload: err.response.data.errors })   
                dispatch({type:LOADED})
            }  
        }
}