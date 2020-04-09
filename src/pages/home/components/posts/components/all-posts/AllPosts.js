import React, { useEffect, useState } from 'react'
// COMPONENTS
import Pagination from './pagination/Pagination'
import Post from '../../../../../../components/post/Post'
// ACTIONS
import { getAllPosts } from '../../../../../../redux/actions/PostsActions'
// MUI
import CircularProgress from '@material-ui/core/CircularProgress'

export default function AllPosts({ allPosts, dispatch }) {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(getAllPosts(setLoading))
    }, [dispatch])

    if(loading) return ( 
        <div style={{width: '100%', display: 'flex', justifyContent:'center', alignItems: 'flex-end', height: 200}}> 
            <CircularProgress size={60} color='primary' /> 
        </div>
    ) 

    return (
        <div style={{marginTop: 160}}>
         <Pagination /> 
         <div className='allPosts-container-dos'>
            { allPosts.map((post, key) => < Post key={key} post={post} />) }
         </div>   
        </div>
    )
}
