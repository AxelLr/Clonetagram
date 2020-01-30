import React, { useEffect } from 'react'
import Post from '../../components/posts/post/Post'
import CommentsList from '../../components/commentlist/CommentsList'
// REDUX
import { getPost, getPostComments } from '../../redux/actions/DataActions'
import { getConnectedUser } from '../../redux/actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'
import { ON_SINGLE_POST, CLOSE_SINGLE_POST } from '../../redux/reducers/types'
// MUI
import CircularProgress from '@material-ui/core/CircularProgress'

export default function FullPost(props) {
    
    const post_id = props.match.params.id

    const dispatch = useDispatch()
    const selectedPost = useSelector(state => state.data.selectedPost)
    const comments = useSelector(state => state.data.comments)
    const loading = useSelector(state => state.UI.loading)

    useEffect(() => {
        dispatch(getConnectedUser())
    }, [dispatch])

    useEffect(() => { 
    dispatch(getPost(post_id, props.history))
    dispatch(getPostComments(post_id))   
    }, [dispatch, post_id, props.history])

    useEffect(() => {
        dispatch({type: ON_SINGLE_POST})
        return () => {
          dispatch({type: CLOSE_SINGLE_POST})
        };
      }, [dispatch])
    
    useEffect(() => {

        if(selectedPost === '') {
            props.history.push('/Home')
        }
         
    }, [selectedPost, props.history])

    return (
        <div  className='fullPost-container'>

        { loading ? <div style={{display: 'flex', width: '100%'}}> <CircularProgress style={{margin: 'auto'}} size={30} /> </div>
        
        : 
           <div className='fullPost-content-container'>
                <div style={{width: '50%', height: '100%'}}>
                     <Post post={selectedPost} />
                </div>
                  < CommentsList comments={comments} selectedPost={selectedPost} /> 
            </div> }
         
        </div>
    )
}
