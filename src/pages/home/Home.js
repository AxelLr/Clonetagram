import React from 'react'
import LoggedUser from '../../components/loggeduser/LoggedUser'
import Posts from '../../components/posts/Posts'
import AddPost from '../../components/posts/addpost/AddPost'

export default function Home(props) {

    return (
        <div className='home-container'>       
             < LoggedUser history={props.history} />
             < Posts />
             < AddPost />
        </div>
    )
}

