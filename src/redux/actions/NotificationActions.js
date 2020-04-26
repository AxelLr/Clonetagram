import axios from "axios"
import { SET_NOTIFICATIONS, MARK_NOTIFICATIONS_AS_READED } from "../reducers/types"

export const getUserNotifications = () => async (dispatch) => {
try {
    const response = await axios.get('/notifications')
    dispatch({type: SET_NOTIFICATIONS, payload: response.data })
    
} catch (error) {
    console.log(error)
}
}

export const markNotificationsAsReaded = (notifications) => async (dispatch) => {
    try {
         await axios.patch('/notifications/read', notifications)
         dispatch({ type: MARK_NOTIFICATIONS_AS_READED })
    } catch (error) {
        console.log(error)
    }
}