import { SET_POST_COMMENTS, SET_REPLIES, SET_NEW_COMMENT, DELETE_REPLY, DELETE_COMMENT } from '../reducers/types'
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
            dispatch({ type: SET_NEW_COMMENT, payload: response.data })
            setLoading(false)

        } catch (err) {
            console.log(err)
        }
    }
}

export function deleteComment(comment_id, setLoading, setOpen) {
    return async function(dispatch) {
        try {
            setLoading(true)
            await axios.delete(`/comments/${comment_id}/delete`)
            setLoading(false)
            dispatch({ type: DELETE_COMMENT, payload: comment_id })
            setOpen(false)
        } catch (err) {
            console.log(err)  
        }
    }
}

export function addReply(content, comment_id) {
    return async function(dispatch) {
        try {
           const response = await axios.post(`/comments/${comment_id}/reply`, content)
           dispatch({ type: SET_REPLIES, payload: response.data })

        } catch (err) {
            console.log(err)
        }
    }
}

export function removeReply(comment_id, reply_id, setLoading, setOpen) {
    return async function(dispatch) {
        try {
            setLoading(true)
            await axios.delete((`/comments/${comment_id}/reply/${reply_id}/delete`))
            setLoading(false)
            setOpen(false)
            dispatch({type: DELETE_REPLY, payload: { comment_id, reply_id } })

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
}