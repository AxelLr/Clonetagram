import io from 'socket.io-client'
// ACTIONS
import { SET_USER_SOCKET } from '../reducers/types'
const ENDPOINT = 'https://clonetagram.herokuapp.com/'

export function sendUserId(user_id) {
    return async function(dispatch) {
       const socket = io(ENDPOINT)
        dispatch({type: SET_USER_SOCKET, payload: socket })
        socket.emit('SET_USER_ID', user_id)
    }
}


