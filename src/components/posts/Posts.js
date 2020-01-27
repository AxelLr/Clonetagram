import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PostsNavbar from './postsnavbar/PostsNavbar'
import AllPosts from './allposts/AllPosts'

export default function Posts() {

const allPosts = useSelector(state => state.data.allPosts)

const [ handlePosts, setHandlePosts ] = useState(true)

    return (     
        <div className='posts-container'>
            < PostsNavbar setHandlePosts={setHandlePosts} handlePosts={handlePosts} /> 
            < AllPosts allPosts={allPosts} handlePosts={handlePosts} /> 
        </div>
    )
}
