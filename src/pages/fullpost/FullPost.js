import React,{ useEffect, useState } from 'react'
import Post from '../../components/post/Post'
import CommentsList from './components/commentlist/CommentsList'
// REDUX
import { getPost } from '../../redux/actions/PostsActions'
import { getPostComments } from '../../redux/actions/CommentsActions' 
import { useDispatch, useSelector } from 'react-redux'
import { ON_SINGLE_POST, CLOSE_SINGLE_POST } from '../../redux/reducers/types'
// MUI
import CircularProgress from '@material-ui/core/CircularProgress'

export default function FullPost(props) {
    
    const post_id = props.match.params.id

    const dispatch = useDispatch()
    
    const selectedPost = useSelector(state => state.data.selectedPost)
    const comments = useSelector(state => state.comments.comments)

    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
      dispatch(getPost(post_id, props.history, setLoading))
      dispatch(getPostComments(post_id))  
      dispatch({ type: ON_SINGLE_POST })  
      return () => {
        dispatch({ type: CLOSE_SINGLE_POST })
      }
    }, [dispatch, post_id, props.history])
 
    if(loading) return <div style={{display: 'flex', width: '100%', height: '100vh'}}> <CircularProgress style={{margin: 'auto'}} size={60} /> </div>

    return (
        <section className='fullPost-container'>       
            <Post post={selectedPost} />
            <CommentsList comments={comments} selectedPost={selectedPost} /> 
        </section>
    )
}
