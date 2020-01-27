import React,{ useEffect } from 'react'
import Post from '../post/Post'
import { getAllPosts, getSubscriptionsPosts } from '../../../redux/actions/DataActions'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAN_POSTS } from '../../../redux/reducers/types'
// MUI 
import CircularProgress from '@material-ui/core/CircularProgress'

export default function AllPosts(props) {

 const { allPosts, handlePosts } = props
 const dispatch = useDispatch()

 const loading = useSelector(state => state.UI.loading)

 useEffect(() => {
    
     if(handlePosts) {
        dispatch(getSubscriptionsPosts())
         
     } else {
        dispatch(getAllPosts())
     }
        
    return () => {
        dispatch({type: CLEAN_POSTS })
    }

 }, [dispatch, handlePosts])

    return (
        <div> 
        { loading ? <div style={{display: 'flex', width: '100%', height: '100vh'}}> <CircularProgress style={{margin: 'auto'}} size={60} /> </div> : <div className={handlePosts ? 'allPosts-container' : 'allPosts-container-dos'}>
            { allPosts.map((post, key) => < Post key={key} post={post} />) } 
            </div> }
        </div>
    )
}
