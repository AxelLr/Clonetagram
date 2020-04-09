import React,{ useEffect } from 'react'
// COMPONENTS
import Post from '../../../../components/post/Post'
// ACTIONS
import { getUserPosts } from '../../../../redux/actions/PostsActions'
// REDUX
import { useSelector, useDispatch } from 'react-redux'

export default function ProfilePosts({ user_id }) {

    const dispatch = useDispatch()
    const userPosts = useSelector(state => state.data.selectedPosts)

    useEffect(() => {
        dispatch(getUserPosts(user_id))    
    }, [dispatch])

    return (
        <div className='profilePosts-grid'>
         { userPosts.map((post, key) => < Post key={key} post={post} />) } 
         </div>
)}