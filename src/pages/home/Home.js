import React,{ useEffect } from 'react'
// COMPONENTS
import Posts from './components/posts/Posts'
import UserSection from './components/user-section/UserSection'
import AddPost from '../../components/addpost/AddPost'
// REDUX 
import { useDispatch } from 'react-redux'
// TYPES
import { ON_HOME, CLEAR_POSTS, FOCUS_OFF} from '../../redux/reducers/types'

export default function Home() {

const dispatch = useDispatch()

useEffect(() => { 
    dispatch({type: ON_HOME })
    return () => {
        dispatch({type: CLEAR_POSTS })
        dispatch({type: FOCUS_OFF })
    }
}, [dispatch])

    return (
        <div className='home-container'>     
             <AddPost/>  
             <UserSection /> 
             < Posts />
             
        </div>
    )
}

// 568 PX

