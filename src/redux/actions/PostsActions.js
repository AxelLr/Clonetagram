import { GET_ALL_POSTS, SET_SELECTED_POSTS, SET_NEW_POST, DELETE_POST, SET_SUBSCRIPTIONS_POSTS,
       SET_POST, SET_LIKES, SET_DISLIKE, 
     SET_NEW_SUBSCRIPTIONS_POSTS } from '../reducers/types'
import axios from 'axios'

export function getAllPosts(setLoading) {
    return async function(dispatch) {
        try {
            setLoading(true)
            const response = await axios.get('/posts')
            setLoading(false)
            dispatch( {type: GET_ALL_POSTS, payload: response.data} )
            
        } catch (err) {
            console.log(err)            
        }
    }
}

export function getPostsFromPage (page, postsNumber) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`/posts/?page=${page}&?postsNumber=${postsNumber}`)
            dispatch( {type: GET_ALL_POSTS, payload: response.data} )
        } catch (err) {
            console.log(err)            
        }
    }
}

export function getSubscriptionsPosts(page, setPage, setFetching, count) {
    return async function(dispatch) {
        try {
                setFetching(true)
                const response = await axios.get(`/posts/user/subscriptions/?page=${page}`) 

                if(response.data.length > 0) {       
                    page === 1 ? dispatch({type: SET_SUBSCRIPTIONS_POSTS, payload: response.data}) : dispatch({type: SET_NEW_SUBSCRIPTIONS_POSTS, payload: response.data})
                    setFetching(false)
                    setPage(page + 1)
                    count.current = 0

                } else {
                    setFetching(false)
                    count.current = 1
                }

        } catch (err) {
            console.log(err)  
        }
    }
}

export function getUserPosts(id) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`/posts/users/${id}`)
            dispatch( { type: SET_SELECTED_POSTS, payload: response.data })

        } catch (err) {
            console.log(err)
        }
    }
}

export function newPost(data, setOpen, setLoading, setErrors) {
    return async function(dispatch) {
        try {  
               setLoading(true)
                const response =  await axios.post('/posts/add', data, { headers: {
                     'content-type': 'multipart/form-data' 
                     }
                })         
                setOpen(false)
                setLoading(false)
                dispatch({ type: SET_NEW_POST, payload: response.data })

        } catch (err) {
            setLoading(false)
            setErrors(err.response.data)    
            console.log(err.response.data)
        }
    }
}

export function deletePost(postid, setOpen, setLoading) {
    return async function(dispatch) {
        try {
            setLoading(true)
            await axios.delete(`/posts/${postid}/delete`)
            dispatch({ type: DELETE_POST, payload: postid })
            setLoading(false)
            setOpen(false)
        } catch (err) {
            console.log(err)
        }
    }
}

export function getPost(id, history, setLoading) {
    return async function(dispatch) {
        try {
            setLoading(true)
            const response = await axios.get(`/posts/post/${id}`)
            dispatch({type: SET_POST, payload: response.data})
            setLoading(false)
        } catch (err) {
            if (err.response.status === 500) { history.push('/*')}
            console.log(err)            
        }
    }
}

export const likeAPost = (post_id) => async (dispatch) => {
        try {
            const response = await axios.post(`/posts/${post_id}/like`)
            console.log(response.data)
            dispatch({type: SET_LIKES, payload: response.data })

        } catch (err) {
            console.log(err)
        }
    }

export function dislikeAPost(post_id) {
    return async function(dispatch) {
        try {
            const response = await axios.delete(`/posts/${post_id}/dislike`)
            dispatch({ type: SET_DISLIKE, payload: response.data })
       
        } catch (err) {
            console.log(err)    
        }
    }
}
