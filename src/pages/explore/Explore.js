import React,{ useEffect, useState } from 'react'
// COMPONENTS
import Pagination from './components/pagination/Pagination'
import Post from '../../components/post/Post'
// ACTIONS
import { getAllPosts } from '../../redux/actions/PostsActions'
// MUI
import CircularProgress from '@material-ui/core/CircularProgress'
import { useDispatch, useSelector } from 'react-redux'
// TYPES
import { CLEAR_POSTS, ON_EXPLORE, FOCUS_OFF } from '../../redux/reducers/types'

export default function Explore() {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const allPosts = useSelector(state => state.data.allPosts)

    useEffect(() => {
        dispatch(getAllPosts(setLoading))
        dispatch({ type: ON_EXPLORE })
        return () => {
            dispatch({ type: CLEAR_POSTS })
            dispatch({type: FOCUS_OFF })
        }
    }, [dispatch])

    if(loading) return ( 
        <div style={{width: '100%', display: 'flex', justifyContent:'center', alignItems: 'flex-end', height: 200}}> 
            <CircularProgress size={60} color='primary' /> 
        </div>
    ) 

    return (
        <div style={{marginTop: 160}}>
            <Pagination /> 
            <div className='explorePosts-container'>
                { allPosts.map((post, key) => < Post key={key} post={post} />) }
            </div>   
        </div>
    )
}
