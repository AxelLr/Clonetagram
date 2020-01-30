import { GET_ALL_POSTS, SET_SELECTED_POSTS, SET_NEW_POST, DELETE_POST, SET_SUBSCRIPTIONS_POSTS,
     SET_USERS, SET_POST_COMMENTS, SET_POST, SET_LIKES, SET_DISLIKE, SET_LOADING,
     SET_LOADED, SET_ERROR, SET_REPLYS, UPLOADING, UPLOADED, DELETING, DELETED } from '../reducers/types'
import axios from 'axios'

export function getAllPosts() {
    return async function(dispatch) {

        try {
            dispatch({type: SET_LOADING})
            const response = await axios.get('/posts')
            dispatch( {type: GET_ALL_POSTS, payload: response.data} )
            dispatch({type: SET_LOADED})
            console.log(response)
            
        } catch (err) {
            console.log(err)            
        }
    }
}

export function getPostsFromPage (page) {
    return async function(dispatch) {
        try {
            dispatch({type: SET_LOADING})
            const response = await axios.get(`/posts/?page=${page}`)
            dispatch( {type: GET_ALL_POSTS, payload: response.data} )
            dispatch({type: SET_LOADED})
            
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

export function newPost(data) {
    return async function(dispatch) {

        try {  
                dispatch({type: UPLOADING })
                const response =  await axios.post('/posts/add', data, { headers: {
                     'content-type': 'multipart/form-data' 
                     }
                })         
                console.log(response.data)
                dispatch({type: UPLOADED})
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

 export function getSubscriptionsPosts() {
     return async function(dispatch) {

         try {
           dispatch({type: SET_LOADING })  
           const response = await axios.get('/posts/user/subscriptions')           
           dispatch({type: SET_SUBSCRIPTIONS_POSTS, payload: response.data})
           dispatch({type: SET_LOADED })  
            
         } catch (err) {
             console.log(err)  
         }
     }
 }

export function getAllUsers (search) {
    return async function(dispatch) {
        try {
           const response =  await axios.get(`/users/?search=${search}`)
           console.log(response.data) 
           dispatch({ type: SET_USERS, payload: response.data })

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

export  const likeAPost = (post_id) => async (dispatch) => {

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
