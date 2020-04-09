import { GET_ALL_POSTS, SET_SELECTED_POSTS, SET_NEW_POST, DELETE_POST, SET_SUBSCRIPTIONS_POSTS,
       SET_POST, SET_LIKES, SET_DISLIKE, SET_LOADING,
     SET_LOADED, SET_ERROR, UPLOADING, UPLOADED, DELETING, DELETED, SET_NEW_SUBSCRIPTIONS_POSTS } from '../reducers/types'
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
            dispatch({type: SET_LOADING})
            const response = await axios.get(`/posts/?page=${page}&?postsNumber=${postsNumber}`)
            dispatch( {type: GET_ALL_POSTS, payload: response.data} )
            dispatch({type: SET_LOADED})
            
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
            dispatch({type: SET_LOADING})
            const response = await axios.get(`/posts/users/${id}`)
            dispatch( { type: SET_SELECTED_POSTS, payload: response.data })
            dispatch({type: SET_LOADED})
            
        } catch (err) {
            console.log(err)
        }
    }
}

export function newPost(data, setOpen) {
    return async function(dispatch) {
        try {  
                dispatch({type: UPLOADING })
                const response =  await axios.post('/posts/add', data, { headers: {
                     'content-type': 'multipart/form-data' 
                     }
                })         
                console.log(response.data)
                dispatch({type: UPLOADED})
                setOpen(false)
                dispatch({ type: SET_NEW_POST, payload: response.data })

        } catch (err) {
            dispatch({type: SET_ERROR, payload: err.response.data}) 
            dispatch({type: UPLOADED})      
        }
    }
}

export function deletePost(postid) {
    return async function(dispatch) {
        try {
            dispatch({type: DELETING })
            await axios.delete(`/posts/${postid}/delete`)
            dispatch({ type: DELETE_POST, payload: postid })
            dispatch({type: DELETED })
            
        } catch (err) {
            console.log(err)
        }
    }
}

export function getPost(id, history) {
    return async function(dispatch) {
        try {
            dispatch({type: SET_LOADING})
            const response = await axios.get(`/posts/post/${id}`)
            dispatch({type: SET_POST, payload: response.data})
            dispatch({type: SET_LOADED})
             
        } catch (err) {
            if (err.response.data === 'El post no existe') { history.push('/*')}
            console.log(err.response.data)            
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
