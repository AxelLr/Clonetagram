import React,{ useEffect } from 'react'
import Post from '../post/Post'
import Pagination from '../../../components/pagination/Pagination'
// REDUX
import { getAllPosts, getSubscriptionsPosts } from '../../../redux/actions/DataActions'
import { useDispatch, useSelector } from 'react-redux'
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

 }, [dispatch, handlePosts])

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}} >
         <div> 
         <div> { !handlePosts && <Pagination /> } </div>     
         </div>
        { loading ? 

        <div style={{display: 'flex', width: '100%', height: '100vh'}}> 
            <CircularProgress style={{margin: 'auto'}} size={60} /> 
        </div> : 

        <div className={handlePosts ? 'allPosts-container' : 'allPosts-container-dos'}>
            { allPosts.map((post, key) => < Post key={key} post={post} />) }
        </div> }
       
        </div>
    )
}
