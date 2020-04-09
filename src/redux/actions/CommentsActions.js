import { SET_POST_COMMENTS, SET_REPLYS } from '../reducers/types'
import axios from 'axios'

export function getPostComments(id) {
    return async function(dispatch) {    
        try {
            const response = await axios.get(`/comments/${id}`)
            dispatch({ type: SET_POST_COMMENTS, payload: response.data})

        } catch (err) {
            console.log(err.response)
        }
    }
}

export function addComment(content, id, setLoading) {
    return async function(dispatch) {
        try {
            const response = await axios.post(`/comments/${id}`, content)
            dispatch({ type: SET_POST_COMMENTS, payload: response.data})
            setLoading(false)

        } catch (err) {
            console.log(err)
        }
    }
}

export function deleteComment(comment_id, post_id) {
    return async function(dispatch) {
        try {
            await axios.delete(`/comments/${comment_id}/delete`)
            dispatch(getPostComments(post_id))
            
        } catch (err) {
            console.log(err)  
        }
    }
}

export function addReply(content, comment_id) {
    return async function(dispatch) {
        try {
           const response = await axios.post(`/comments/${comment_id}/reply`, content)
           dispatch({ type: SET_REPLYS, payload: response.data })

        } catch (err) {
            console.log(err)
        }
    }
}