import React,{ useEffect } from 'react'
// ACTIONS
import { setToken, getConnectedUser } from '../../redux/actions/AuthenticationActions'
// REDUX
import { useDispatch } from 'react-redux'
// ROUTER
import { withRouter } from 'react-router-dom'

function Redirecting({ match, history }) {

    const dispatch = useDispatch()

 useEffect(() => {
     if(match.params.token) {
        setToken(match.params.token)
        dispatch(getConnectedUser(history))
     } 
 }, [])    

    return (
        <div>
            <h1 style={{fontFamily: 'Open Sans' }}> Redirigiendo, espera un segundo por favor. </h1>
        </div>
    )
}

export default withRouter(Redirecting)
