import React,{ useEffect, useState, useRef } from 'react'
import Post from '../../../../../../components/post/Post'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
// ACTIONS
import { getSubscriptionsPosts } from '../../../../../../redux/actions/PostsActions'
// MUI
import CircularProgress from '@material-ui/core/CircularProgress'

export default function SubscriptionsPosts() {

    let count = useRef(0)
    const allPosts = useSelector(state => state.data.allPosts)
    const dispatch = useDispatch()
    const [trigger, setTrigger] = useState(false)
    const [fetchingSubscriptionPosts, setFetchingSubscriptionPosts] = useState(false)
    const [page, setPage] = useState(1) 

    useEffect(() => {
      dispatch(getSubscriptionsPosts(page, setPage, setFetchingSubscriptionPosts, count))
      window.addEventListener('scroll', bottomListener)        
      return () => {
          window.removeEventListener('scroll', bottomListener)
      }
    }, [dispatch, page])

    useEffect(() => {
        dispatch(getSubscriptionsPosts(page, setPage, setFetchingSubscriptionPosts, count))
    }, [trigger])

    function bottomListener() {
        let div = document.getElementById('scrollHandler')
        if(window.scrollY + window.innerHeight === div.clientHeight + div.offsetTop) {     
           if( count.current === 0 ) {
               count.current = 1
               setTrigger(state => !state)
           }
        }   
    }  

    return (
        <div id='scrollHandler' className='allPosts-container'>
        { allPosts.map((post, key) => < Post key={key} post={post} />) }
        { fetchingSubscriptionPosts && <CircularProgress size={60} color='primary' style={{margin: '0px auto'}} /> }
    </div> 
    )
}
