import React from 'react'
import Post from '../post/Post'

export default function ProfilePosts(props) {

 const { posts } = props

    return (
        <div className='profilePosts-container'>
         { posts.map((post, key) => < Post key={key} post={post} />) } 
        </div>
    )
}