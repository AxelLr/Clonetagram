import axios from "axios"

export const getUserNotifications = () => async (dispatch) => {
try {
    const response = await axios.get('/notifications')
    
} catch (error) {
    console.log(error)
}
}

export const markNotificationsAsReaded = (notifications) => async (dispatch) => {
    try {
         await axios.patch('/notifications/read', notifications)
    } catch (error) {
        console.log(error)
    }
}