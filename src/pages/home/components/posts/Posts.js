import React from 'react'
// REDUX
import { useSelector, useDispatch } from 'react-redux'
// COMPONENTS
import AllPosts from './components/all-posts/AllPosts'
import SubscriptionsPosts from './components/subscription-posts/SubscriptionsPosts'

export default function Posts({ handlePosts }) {

    const dispatch = useDispatch()
    const allPosts = useSelector(state => state.data.allPosts)
    
    return (     
        <div className='posts-container'>
          { !handlePosts ? <AllPosts allPosts={allPosts} dispatch={dispatch} /> : <SubscriptionsPosts allPosts={allPosts} dispatch={dispatch} /> }       

        </div>
    )
}
