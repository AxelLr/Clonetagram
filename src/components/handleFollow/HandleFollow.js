import React,{ useEffect, useState } from 'react'
// REDUX
import { followUser, unfollowUser } from '../../redux/actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'
// MUI
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

export default function HandleFollow(props) {

   const { userProfile, connectedUser } = props
   const user_id = userProfile._id

   console.log(userProfile.followers)

   const dispatch = useDispatch()
   const [isFollowed, setIsFollowed] = useState()
   const loadingSubscription = useSelector(state => state.UI.loadingSubscription)

   useEffect(() => {

        let subscription = connectedUser.subscriptions && connectedUser.subscriptions.filter(subscript => subscript.user_id === user_id)
        if(subscription && subscription.length >= 1) { setIsFollowed(true) } else { setIsFollowed(false) }

   }, [connectedUser, user_id])

    const handleFollow =  () => {
     dispatch(followUser(user_id))
    }

   const handleUnfollow = () => {
     dispatch(unfollowUser((user_id)))
    }

    return (
        <div>
            { isFollowed ? 
            
            <Button disabled={loadingSubscription} onClick={handleUnfollow} style={{marginLeft: 10}} variant='contained' 
            color='primary' size='small' > Siguiendo { loadingSubscription && <CircularProgress style={{marginLeft: 5}} size={20} /> } 
            </Button> 
            
            : 

            <Button disabled={loadingSubscription} onClick={handleFollow} style={{marginLeft: 10}} variant='contained' 
            size='small' > Seguir { loadingSubscription && <CircularProgress style={{marginLeft: 5}} size={20} /> }  
            </Button> }
        </div>
    )
}
