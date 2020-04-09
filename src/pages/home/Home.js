import React,{ useState } from 'react'
// COMPONENTS
import HomeNavbar from './components/home-navbar/HomeNavbar'
import Posts from './components/posts/Posts'
import AddPost from '../../components/addpost/AddPost'

export default function Home(props) {

    const [ handlePosts, setHandlePosts ] = useState(true)

    return (
        <div className='home-container'>       
             < HomeNavbar history={props.history} setHandlePosts={setHandlePosts} handlePosts={handlePosts} />
             < Posts setHandlePosts={setHandlePosts} handlePosts={handlePosts} />
             < AddPost />
            { handlePosts &&
              <div style={{ 
                  position: 'fixed', 
                  backgroundColor: 'red',
                  height: '100vh', 
                  width: '40%',
                  justifySelf: 'flex-end',
                  right: 0
                    }}> NANI 
              </div> 
            } 
        </div>
    )
}

